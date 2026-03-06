+++
title = "CallsMatchingParam"
weight = 3
+++
The `CallsMatchingParam` object defines the parameters used to search for and annotate function calls in a binary.
It is used with methods like [`ProjectHandle:calls_matching`](/docs/vulhunt-reference/types/project-handle) to filter and analyze call sites based on function names, predicates, and dataflow annotations.

### Fields

| Field   | Description                                                             | Type                                                                                                                             |
| :------ | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `to`    | Function(s) to identify in the binary                                   | `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value), or [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) |
| `where` | Predicate function to filter function calls                             | `fun(caller: FunctionContext)`                                                                                                   |
| `using` | Lua expression specifying parameter annotations for the dataflow engine | Lua expression                                                                                                                   |
| `debug` | Enables debug logs for the matching process                             | `boolean`                                                                                                                        |

### Reference

#### to

The function(s) to identify in the binary. It can be a string (function name), an [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), or a [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) with pattern matching options.

#### where

A Lua function used to filter function calls. Receives a [`FunctionContext`](/docs/vulhunt-reference/types/function-context) object and should return `true` for calls to include.

#### using

A Lua expression specifying how to annotate parameters and callees for dataflow analysis.

- `parameters` assigns annotations to the parameters of the function being analyzed. . For example: `parameters = {var:named "src", var:named "dst"}`
- `callees` assigns annotations to parameters and return values of functions called within the analyzed function. For example `callees = { FunctionName = {output = ..., inputs = {...}} }`

<Note>Do not use the same annotation name multiple times.</Note>

#### debug

If set to `true`, enables debug logging for the matching process.

### Example

The following example finds all calls to `memcpy` in functions named `target` that also call `malloc`.
It annotates parameters and callees for dataflow tracking.

```lua
local call_sites = project:calls_matching({
  to = "memcpy",
  where = function(caller)
    return caller:named "target" and caller:has_call "malloc"
  end,
  using = {
    parameters = {var:named "name", var:named "value"},
    callees = {
      ["malloc"] = {output = var:named "env", inputs = {_}},
      ["strlen"] = {output = var:named "len", inputs = {_}}
    }
  }
})
```
