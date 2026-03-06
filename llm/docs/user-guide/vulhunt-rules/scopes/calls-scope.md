+++
title = "Calls Scope"
weight = 3
+++
The `scope:calls` object allows you to inspect function calls, including properties computed by the taint engine implemented in VulHunt.
This scope is used to write rules that analyze [call sites](/docs/user-guide/appendices/glossary-of-terms#call-site) in the binary.

The `scope:calls` expects four arguments:

- `to`: the function to identify in the input binary. Can be a `string` (function name), an [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), or a [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) object.
- `where`: a Lua expression to filter function calls. The expression can use `caller:named`, `caller:has_call`, `caller:has_calls`, and `caller:calls`.
- `using`: specifies parameter annotations for the dataflow engine.
- `with`: the check function, which takes a [`ProjectHandle`](/docs/vulhunt-reference/types/project-handle) and a [`CallSiteTable`](/docs/vulhunt-reference/types/callsite-table).

The [`CallSiteTable`](/docs/vulhunt-reference/types/callsite-table) provides access to the caller’s information via [`CallSiteContext`](/docs/vulhunt-reference/types/callsite-context), as well as to function inputs and outputs through [`OperandInfo`](/docs/vulhunt-reference/types/operand-info).

- [`CallSiteContext`](/docs/vulhunt-reference/types/callsite-context) exposes details such as the name and address of the caller function and the address of the call site.
- [`OperandInfo`](/docs/vulhunt-reference/types/operand-info) describes the properties of the function's arguments and return value, including taint annotations, operand origin, and, when available, its value.

### Example

```lua
scopes = scope:calls{
    to = "strcpy",
    where = caller:named "target_function",
    using = {parameters = {_, _, var:named "input"}},
    with = check
}

function check(project, context)
    -- Accessing the caller's information (CallSiteContext)
    local caller = context.caller

    -- Accessing the name and address of the caller and address of the call site
    local name = caller.name
    local addr = caller.address
    local call_addr = caller.call_address

    -- Accessing the function input and output (both are OperandInfo)
    local param = context.inputs[1]
    local output = context.output

    -- OperandInfo exposes fields and methods related to a given operand.
    if param.annotation == "input" then
        print("The first argument of strcpy is tainted by the third argument of target_function")
    end

    param = context.inputs[2]
    local is_const = param:is_const()
    local value = param.pre_call_string
    local bytes = param:bytes(32)
end
```

This example demonstrates how to search for calls to `strcpy` within a function named `target_function`, and how labels can be propagated by the dataflow engine.
The `using` argument specifies that the third parameter of `target_function` should be annotated with the label `input`.

The `check` function receives a [`CallSiteTable`](/docs/vulhunt-reference/types/callsite-table) as its context, which provides access to the caller's information via [`CallSiteContext`](/docs/vulhunt-reference/types/callsite-context), and to the function's arguments and return value via [`OperandInfo`](/docs/vulhunt-reference/types/operand-info).
By accessing the `annotation` field of an [`OperandInfo`](/docs/vulhunt-reference/types/operand-info), you can verify whether the taint engine propagated the label specified in the `using` argument of `scope:calls`.
Other methods of [`OperandInfo`](/docs/vulhunt-reference/types/operand-info) allow retrieving the constant value of an operand, either as a string or as bytes, when available.
