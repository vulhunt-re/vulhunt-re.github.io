+++
title = "CallSiteTable"
weight = 7
+++
The `CallSiteTable` object provides access to information about a specific function call site, including the caller context, function parameters, and output.
It is commonly used in VulHunt rules to analyze call site properties and dataflow.

### Fields

| Field    | Description                                      | Type                                                           |
| :------- | :----------------------------------------------- | :------------------------------------------------------------- |
| `caller` | The context of the caller function               | [`CallSiteContext`](/docs/vulhunt-reference/types/callsite-context) |
| `inputs` | The parameters passed to the called function     | [`OperandInfo[]`](/docs/vulhunt-reference/types/operand-info)       |
| `output` | The output (return value) of the called function | [`OperandInfo`](/docs/vulhunt-reference/types/operand-info)         |

### Reference

#### caller

Provides access to the context of the caller function.

#### inputs

A table of [`OperandInfo`](/docs/vulhunt-reference/types/operand-info) objects representing the parameters passed to the called function.

#### output

An [`OperandInfo`](/docs/vulhunt-reference/types/operand-info) object representing the output (return value) of the called function.

### Example

```lua
scopes = scope:calls{
  to = "strcpy",
  where = caller:named "target_function",
  using = {parameters = {var:named "input", _, _}},
  with = function(project, context)
    local caller = context.caller
    print("Call to strcpy from:", caller.name, "at address", caller.call_address)

    local src = context.inputs[2]
    if src and src.annotation == "input" then
      print("The source parameter is tainted with 'input'")
    end

    local ret = context.output
    -- Do something with the return value if needed
  end
}
```
