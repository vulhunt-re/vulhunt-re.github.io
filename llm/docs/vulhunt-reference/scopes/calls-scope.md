+++
title = "Calls Scope"
weight = 3
+++
The _scope:calls_ allows to match and analyze specific function calls in the binary, including tracking dataflow between parameters and return values.

| Parameter | Description                                                             | Type                                                                                                                             | Required |
| :-------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :------: |
| `to`      | Called function(s) to identify in the binary                            | `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value), or [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) |   Yes    |
| `where`   | Lua expression used to filter function calls                            | Lua expression                                                                                                                   |    No    |
| `using`   | Lua expression specifying parameter annotations for the dataflow engine | Lua expression                                                                                                                   |   Yes    |
| `with`    | Lua function to execute for each matching call site                     | `fun(project: ProjectHandle, context: CallSiteTable)`                                                                            |   Yes    |

### Syntax

```lua
scope:calls{
    to = <target>,
    where = <conditions>,
    using = <annotations>,
    with = <function>
}
```

### Reference

#### to

The _to_ argument specifies the called function(s) to identify in the binary. It can be a string (function name), an [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), or a [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) with pattern matching options.

#### where

The _where_ argument specifies a Lua expression that is used to filter function calls.
The only allowed variable in the expression is `caller`, which exposes the following methods:

- `caller:named "name"`: returns true if the caller function name matches the provided name.
- `caller:has_call "name"`: returns true if the caller contains a call to the specified function.
- `caller:has_calls {"name1", "name2"}`: returns true if the caller contains calls to all the specified functions.
- `caller:calls "name"`: returns the table of call-site addresses for the specified function.

#### using

The _using_ argument accepts a Lua expression that specifies how parameters should be annotated for the dataflow engine.

- `callees`: allows annotations to be assigned to parameters and the returned value for arbitrary function calls
- `parameters`: allows annotations to be assigned to the analysed function parameters

The `parameters` attribute is used to annotate the parameters of the function being analyzed, while the `callees` attribute is used to annotate the parameters and outputs of functions that are called within the function being analyzed.

<Warning> Do not use the same annotation several times. </Warning>

_Note:_ The function `var:named "Name"` creates a named annotation for tracking a specific variable in the dataflow.

#### with

The _with_ argument specifies the Lua function to execute for each matching call site in the binary file.

#### Example

Let's consider the following function:

```c
int FunctionA(int v1, char v2, int *v3) {
  int val = 3;
  long r = FunctionB(val, "hello");

  FunctionC(v1, val, r);
  return r;
}
```

The following rule will be able to identify the function call to `FunctionC`:

```lua
scopes = scope:calls{
  to = "FunctionC",
  where = caller:named "FunctionA" and caller:has_call "FunctionB",
  using = {
    callees = {
      FunctionB = {output = var:named "Out", inputs = {var:named "VarC1", _}}
    },
    -- `parameters` indicates the parameters of FunctionA
    parameters = {var:named "VarB1", _, _}, -- `_` is a placeholder
  },
  with = function(project, context)

    local arg1 = context.inputs[1]
    if arg1 ~= nil and arg1.annotation == "VarB1" then
      -- The first parameter of `FunctionA` is propagated to the first parameter of `FunctionC`
    end

    local arg2 = context.inputs[2]
    if arg2 ~= nil and arg2.annotation == "VarC1" then
      -- The first parameter of `FunctionB` is propagated to the second parameter of `FunctionC`
    end

    local arg3 = context.inputs[3]
    if arg3 ~= nil and arg3.annotation == "Out" then
      -- The return value of `FunctionB` is propagated to the third parameter of `FunctionC`
    end
  end
}
```

In this example, we track three different values in `FunctionA`:

1. The first parameter of `FunctionA` (annotated as "VarB1") is passed as the first parameter to `FunctionC`.
2. The first parameter of `FunctionB` (annotated as "VarC1") is passed as the second parameter to `FunctionC`.
3. The return value of `FunctionB` (annotated as "Out") is passed as the third parameter to `FunctionC`.

The `_` placeholders in the annotations indicate parameters we don't need to track.
