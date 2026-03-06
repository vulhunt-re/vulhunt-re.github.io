+++
title = "Decompiler Extension"
weight = 5
+++
The decompiler extension allows VulHunt rules to decompile functions from the binary and run syntax queries on the resulting pseudocode. This is useful for verifying code patterns that are difficult to express with other capabilities of VulHunt, such as matching specific sequences of statements or conditional structures in the decompiled code.

## Enabling the extension

To use the decompiler, add `extensions = "decompiler"` to your rule:

```lua
author = "Binarly"
name = "Example rule with decompiler"
platform = "posix-binary"
architecture = "*:*:*"
extensions = "decompiler"

scopes = scope:functions{target = "target_function", with = check}

function check(project, context)
    local decomp = project:decompile(context.address)
    -- ...
end
```

## Decompiling functions

The `project:decompile()` method accepts a function name, an address, or a pattern query and returns a [`DecompiledFunction`](/docs/vulhunt-reference/types/decompiled-function) object:

```lua
-- By function name
local decomp = project:decompile("main")

-- By address (e.g., from a scope context)
local decomp = project:decompile(context.address)
local decomp = project:decompile(context.caller.address)

-- By pattern matching (using a FunctionQuery)
local decomp = project:decompile({matching = "ssh_scp_", kind = "symbol"})
local decomp = project:decompile({matching = "415455534881EC20", kind = "bytes"})
```

The returned object can be printed to inspect the decompiled pseudocode:

```lua
local decomp = project:decompile("target_function")
print(decomp)
```

If no matching function is found, `project:decompile()` returns `nil`. When using a [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) with `all = true`, it returns a table of [`DecompiledFunction`](/docs/vulhunt-reference/types/decompiled-function) objects instead.

## Running queries

Once you have a [`DecompiledFunction`](/docs/vulhunt-reference/types/decompiled-function), you can search its pseudocode using Weggli-compatible syntax queries via the `query` method.

The simplest form takes a query string. Use `$var` to capture named variables and `_` as a wildcard:

```lua
local decomp = project:decompile("target_function")

-- Find calls to free
local matches = decomp:query("free($ptr)")

-- Find assignments followed by a conditional check
local matches = decomp:query([[
    $var = strlen($param);
    if ($var < _) {
        strcpy(_, $param);
    }
]])
```

Query strings are automatically wrapped in `{}` before execution. For more control, pass a table with additional options:

```lua
local matches = decomp:query{
    query = [[ $FN($DST, $SRC, $SIZE); ]],
    raw = true,                       -- do not auto-wrap in {}
    unique = true,                    -- captured variables must refer to different nodes
    regexes = {
        "$FN=memcpy|memmove|strncpy", -- function name must match one of these
        "$SIZE!=^[0-9]+$",            -- size must NOT be a plain numeric constant
    }
}
```

The `regexes` field allows filtering matches: use `$VAR=pattern` to require a match, or `$VAR!=pattern` to exclude it.

## Extracting match results

The `query` method returns a [`SyntaxMatchResult`](/docs/vulhunt-reference/types/syntax-match-result) object. Use its methods to extract addresses and captured variable bindings from the matches:

- `address_of_match(n)` returns the address of the n-th matched element (1-indexed)
- `binding_of_match("$var")` returns the code string captured by `$var`

Both methods return `nil` if the requested match or variable is not found.

```lua
local decomp = project:decompile(context.caller.address)
local matches = decomp:query("$ret = strlen($buf); not: if (_($ret)) {} ;")

local addr = matches:address_of_match(1)       -- address of the matched statement
local buf_name = matches:binding_of_match("$buf") -- the captured buffer variable name

if addr then
    return result:high{
        name = "CVE-XXXX-YYYY",
        description = "Unchecked return value of strlen",
        evidence = {
            functions = {
                [context.caller.address] = {
                    annotate:at{
                        location = addr,
                        message = "The return value of strlen(" .. buf_name .. ") is not validated before use."
                    }
                }
            }
        }
    }
end
```

When a query produces multiple results, you can select a specific result using the table form:

```lua
-- Address of the 2nd matched element in the 3rd result
local addr = matches:address_of_match({match = 2, result = 3})

-- Variable binding from the 2nd result
local val = matches:binding_of_match({var = "$buf", result = 2})
```

## Example: verifying a patch

The following example decompiles a function and uses a syntax query to verify that a buffer length check precedes a call to `strcpy`. If the pattern is found, the rule reports the vulnerability as patched; otherwise, it reports it as a high-severity finding.

```lua
extensions = "decompiler"

scopes = scope:calls{
    to = "strcpy",
    where = caller:named "read_argument",
    using = {parameters = {var:named "input"}},
    with = check
}

function check(project, context)
    local decomp = project:decompile(context.caller.address)

    local matches = decomp:query{
        query = [[
            $var = strlen($param);
            if ($var < _) {
                strcpy(_, $param);
            }
        ]]
    }

    local addr_check = matches:address_of_match(2)
    local addr_strcpy = matches:address_of_match(3)

    if addr_check and addr_strcpy then
        return result:patch{
            name = "Buffer overflow in program",
            description = "The buffer overflow in read_argument has been patched",
            evidence = {
                functions = {
                    [context.caller.address] = {
                        annotate:at{
                            location = addr_check,
                            message = "The length of the input is checked against the buffer size..."
                        },
                        annotate:at{
                            location = addr_strcpy,
                            message = "...which prevents the buffer overflow in this call to strcpy."
                        }
                    }
                }
            }
        }
    end

    -- Patch not found: report the vulnerability
    local var = context.inputs[2]
    if var and var.annotation == "input" then
        return result:high{
            name = "Buffer overflow in program",
            description = "A stack-based buffer overflow in read_argument",
            evidence = {
                functions = {
                    [context.caller.address] = {
                        annotate:at{
                            location = context.caller.call_address,
                            message = "The first argument of read_argument is passed to strcpy without a bounds check."
                        }
                    }
                }
            }
        }
    end
end
```

For the full walkthrough of this example, see the [Buffer Overflow Use Case](/docs/user-guide/vulhunt-rules/use-cases/simple-buffer-overflow).
