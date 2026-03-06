+++
title = "Best Practices"
weight = 9
+++
This page covers recommendations for writing efficient and maintainable VulHunt rules.

## Use the right scope

VulHunt provides three scopes with different levels of analysis. Choosing the
lightest scope that still achieves accurate detection reduces execution time:

| Scope                                                                 | Analysis level                                  | When to use                                                               |
| :-------------------------------------------------------------------- | :---------------------------------------------- | :------------------------------------------------------------------------ |
| [`scope:project`](/docs/user-guide/vulhunt-rules/scopes/project-scope)     | Binary-level searches, function enumeration     | Stripped binaries, byte pattern matching, project-level queries           |
| [`scope:functions`](/docs/user-guide/vulhunt-rules/scopes/functions-scope) | Function-level call graph, pattern matching     | Rules that target specific functions and inspect their calls or structure |
| [`scope:calls`](/docs/user-guide/vulhunt-rules/scopes/calls-scope)         | Call site analysis with dataflow/taint tracking | Rules that need to trace how data flows through function arguments        |

The calls scope involves dataflow and taint analysis, which is more expensive than
`scope:functions`. Use `scope:calls` when you need to verify that a specific value
reaches a specific argument, not just that a call exists.

For example, if you only need to check whether `read_argument` calls `strcpy`,
`scope:functions` with `has_call` is sufficient:

```lua
scopes = scope:functions{target = "read_argument", with = check}

function check(project, context)
    if context:has_call("strcpy") then
        ...
    end
end
```

Use `scope:calls` when you need to verify that a particular argument of the caller
flows into a particular parameter of the callee:

```lua
scopes = scope:calls{
    to = "strcpy",
    where = caller:named "read_argument",
    using = {parameters = {var:named "input"}},
    with = check
}

function check(project, context)
    local var = context.inputs[2]
    if var and var.annotation == "input" then
        -- the first argument of read_argument reaches strcpy's second parameter
    end
end
```

## Set narrow conditions

The [`conditions`](/docs/vulhunt-reference/vulhunt-rules/rule-fields#conditions) field
filters which binaries a rule runs against _before_ any analysis begins. Always set
it to the narrowest match possible. This avoids loading and analyzing binaries that
the rule cannot produce results for.

```lua
-- Bad: rule runs against every binary in the scan
conditions = {}
```

```lua
-- Good: rule only runs against matching binaries
conditions = {
    name_with_prefix = {"libssl.so", "libssl.so."}
}
```

For additional filtering, use `validate` predicates to check for specific byte
patterns or strings before the rule executes:

```lua
conditions = {
    name_with_prefix = {"libssl.so"},
    validate = validate:all{
        validate:contains{pattern = "OpenSSL", kind = "ascii"},
        validate:contains{pattern = "1.1.1", kind = "ascii"}
    }
}
```

Validators run before any scope is evaluated, so they are a cheap way to skip
binaries that are not relevant to the rule.

## Use `local` variables

In Lua, accessing `local` variables is faster than accessing global variables.
Always declare variables and functions with `local`.

```lua
-- Bad: `check` is a global variable, looked up by name on every call
function check(context)
    calls = context:calls("imp.memcpy")  -- `calls` is also global
    return next(calls)
end
```

```lua
-- Good: both `check` and `calls` are local
local function check(context)
    local calls = context:calls("imp.memcpy")
    return next(calls)
end
```

Beyond performance, `local` prevents scoping issues. Any variable not declared
`local` is implicitly global and lives in a shared global table. If two files
define the same global name, whichever loads second silently overwrites the first.
This is especially important in [modules](/docs/user-guide/vulhunt-rules/modules).
Because modules are `require`d by multiple rules, a non-`local` variable inside
a `.vhm` file pollutes the global table for every rule that imports it.

## Prefer `has_call` over `calls` when possible

The method [`context:has_call(name)`](/docs/vulhunt-reference/types/function-context#has_call) is a
boolean check that returns as soon as a single call is found.
In contrast, [`context:calls(name)`](/docs/vulhunt-reference/types/function-context#calls) enumerates
_all_ call sites and builds a table with their addresses.

When you only need to know whether a function is called (e.g., for patch detection),
use `has_call`:

```lua
-- Good: stops at the first match
if context:has_call("strcspn") then
    return  -- patched
end
```

Note that `calls` always returns a table, and in Lua
[an empty table evaluates to `true`](/docs/user-guide/appendices/troubleshooting-guide#table-emptiness).
This means `if context:calls("foo") then` is always true, even when there are no
matches. Use `next()` to check whether the table has any elements:

```lua
local getenv_calls = context:calls("imp.getenv")

-- Bad: always true, an empty table is truthy in Lua
if getenv_calls then ... end

-- Good: `next()` returns nil when the table is empty
if next(getenv_calls) then ... end
```

Use `calls` when you need the actual addresses, for instance to annotate them
in the result or to check ordering with
[`context:precedes`](/docs/vulhunt-reference/types/function-context#precedes).

## Use decompilation wisely

Calling `project:decompile()` triggers full decompilation of a function and is one of the
most expensive operations available. Prefer lighter alternatives when they are
sufficient:

- Use `has_call` / `calls` to check for the presence or location of function calls.
- Use `context:precedes` to verify call ordering.
- Use `context:find` or `context:matches` for byte-level pattern matching.

Reserve decompilation and
[syntax queries](/docs/user-guide/vulhunt-rules/decompiler-extension) for cases where
you need to reason about the structure of the decompiled pseudocode, for example
verifying that a bounds check precedes a vulnerable call within the same `if` block:

```lua
local decomp = project:decompile(context.caller.address)

local matches = decomp:query{
    query = [[
        $var = strlen($param);
        if ($var < _) {
            strcpy(_, $param);
        }
    ]]
}
```

When using decompilation, structure your `check` function so that cheaper checks
run first and `project:decompile()` is only reached when necessary.

## Return early

Structure `check` functions so that negative cases bail out as soon as possible.
Every VulHunt API call has a cost, especially `project:decompile()`. Avoid
performing expensive work whose results will be discarded.

```lua
function check(project, context)
    -- Cheap boolean check: bail out if the target call is missing
    if not context:has_call("strcpy") then return end

    -- Expensive: only decompile if the cheaper check passed
    local decomp = project:decompile(context.address)
    ...
end
```

## Extract reusable logic into modules

When multiple rules share the same helper functions, move them into a
[module](/docs/user-guide/vulhunt-rules/modules) (`.vhm` file) instead of
duplicating code across rules. This reduces maintenance burden and keeps
individual rules focused on detection logic.

```lua
-- modules/helpers/functions.vhm
local functions = {}

function functions.find_by_name(project, names)
    for _, name in ipairs(names) do
        local f = project:functions(name)
        if f then return f end
    end
    return nil
end

return functions
```

```lua
-- In your rule
local helpers = require "helpers/functions"

function check(project, context)
    local target = helpers.find_by_name(project, {"memcmp", "bcmp"})
    if not target then return end
    -- ...
end
```
