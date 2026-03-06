+++
title = "Functions Scope"
weight = 2
+++
The _scope:functions_ allows to write VulHunt rules targeting specific functions in the binary.

| Parameter | Description                                        | Type                                                                                                                              | Required |
| :-------- | :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :------: |
| `target`  | Function(s) to identify in the binary              | `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value), or [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) |   Yes    |
| `with`    | Lua function to execute for each matching function | `fun(project: ProjectHandle, context: FunctionContext)`                                                                           |   Yes    |

### Syntax

```lua
scope:functions{
    target = <target>,
    with = <function>
}
```

### Reference

#### target

The _target_ argument specifies the function(s) to identify in the binary. It accepts a `string` (function name), an [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), or a [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) for pattern matching (note: the `all` field is not allowed in this context).

<Note>
  `named` can also be used as an alias for `target` when a `string` is passed
</Note>

#### with

The _with_ argument specifies the Lua function to execute for each matching function.

#### Example

```lua
scopes = scope:functions{
  target = "target_function",
  with = function(project, context)
    -- Function-level analysis logic goes here
  end
}

-- Target by symbol pattern (regex)
scopes = scope:functions{
  target = {matching = "ssh_scp_", kind = "symbol"},
  with = function(project, context)
    -- Matches all functions with names matching the regex
  end
}

-- Target by byte pattern
scopes = scope:functions{
  target = {matching = "415455534881EC2004000064488B04", kind = "bytes"},
  with = function(project, context)
    -- Matches functions containing the byte sequence
  end
}
```
