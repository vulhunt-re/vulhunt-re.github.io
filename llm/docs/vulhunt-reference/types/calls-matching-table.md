+++
title = "CallsMatchingTable"
weight = 4
+++
The `CallsMatchingTable` object represents the result of matching function call sites in a binary using dataflow analysis.
It is returned by [`ProjectHandle:calls_matching`](/docs/vulhunt-reference/types/project-handle) and provides detailed information about each matched call site, including addresses, caller context, function inputs (arguments passed to the function), and output (the function return value).

### Fields

| Field            | Description                                      | Type                                                           |
| :--------------- | :----------------------------------------------- | :------------------------------------------------------------- |
| `call_address`   | Address of the call site within the function     | [`AddressValue`](/docs/vulhunt-reference/types/address-value)       |
| `name`           | Name of the caller function                      | `string`                                                       |
| `caller_address` | Address of the caller function                   | [`AddressValue`](/docs/vulhunt-reference/types/address-value)       |
| `caller`         | Context of the caller function                   | [`FunctionContext`](/docs/vulhunt-reference/types/function-context) |
| `inputs`         | The parameters passed to the called function     | [`OperandInfo[]`](/docs/vulhunt-reference/types/operand-info)       |
| `output`         | The output (return value) of the called function | [`OperandInfo`](/docs/vulhunt-reference/types/operand-info)         |
| `debug`          | Debug logs for the matching process              | `string`                                                       |

### Reference

#### call_address

The address of the call site.

#### name

The name of the caller function (the function containing the call site).

#### caller_address

The address of the function containing the call site.

#### caller

A [`FunctionContext`](/docs/vulhunt-reference/types/function-context) object representing the function that contains the call site.

#### inputs

An array of [`OperandInfo`](/docs/vulhunt-reference/types/operand-info) objects representing an argument passed to the called function.

#### output

An [`OperandInfo`](/docs/vulhunt-reference/types/operand-info) object representing the return value of the called function.

#### debug

A string containing debug logs generated during the matching process.

### Example

```lua
local results = project:calls_matching({
  to = "memcpy",
  using = {parameters = {var:named "src", var:named "dst"}}
})

for _, entry in ipairs(results) do
  print("Call to:", entry.name, "at address:", entry.call_address)
  print("Caller function:", entry.caller.name)
  print("Source argument annotation:", entry.inputs[1].annotation)
  print("Destination argument annotation:", entry.inputs[2].annotation)
  if entry.output then
    print("Return value annotation:", entry.output.annotation)
  end
  print("Debug log:", entry.debug)
end
```
