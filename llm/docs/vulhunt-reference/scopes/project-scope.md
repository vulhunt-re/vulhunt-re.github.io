+++
title = "Project Scope"
weight = 1
+++
The _scope:project_ allows to develop VulHunt rules that operate at the project level, rather than targeting individual functions or calls. This scope is also useful when debugging symbols are not present, to search for specific code and pattern.

| Parameter | Description             | Type                          | Required |
| :-------- | :---------------------- | :---------------------------- | :------: |
| `with`    | Lua function to execute | `fun(project: ProjectHandle)` |   Yes    |

### Syntax

```lua
scope:project{
    with = <function>
}
```

### Reference

#### with

The _with_ argument specifies the Lua function to execute.

#### Example

```lua
scopes = scope:project{
  with = function(project)
    -- Project-level analysis logic goes here
  end
}
```
