+++
title = "Type Conventions"
weight = 1
+++
This reference uses type annotations based on the [LuaLS](https://luals.github.io/) (Lua Language Server) convention to describe function signatures, fields, and return values throughout the documentation.

### Primitive types

Lua primitive types are always lowercase, matching the values returned by Lua's built-in `type()` function.

| Notation  | Description   | Example value   |
| :-------- | :------------ | :-------------- |
| `string`  | A Lua string  | `"hello"`       |
| `number`  | A Lua number  | `42`, `3.14`    |
| `boolean` | A Lua boolean | `true`, `false` |

### Compound types

Compound types describe Lua tables and functions. The notation follows LuaLS conventions for arrays, dictionaries, records, and callable types.

| Notation             | Description                                                          | Example                                                   | Lua value                                       |
| :------------------- | :------------------------------------------------------------------- | :-------------------------------------------------------- | :---------------------------------------------- |
| `T[]`                | An array-like table whose elements are of type `T`                   | `string[]` — an array of strings                          | `{"foo", "bar"}`                                |
| `{[K]: V}`           | A dictionary-like table with keys of type `K` and values of type `V` | `{[string]: string}` — a table mapping strings to strings | `{["name"] = "binarly", ["team"] = "research"}` |
| `{field: T, ...}`    | A record-like table with known, named fields                         | `{var: string, result: number}`                           | `{var = "x", result = 32}`                      |
| `fun(param: T, ...)` | A function type with named, typed parameters                         | `fun(project: ProjectHandle, context: FunctionContext)`   | `function(project, context) ... end`            |

### Custom types

VulHunt exposes several custom types as Lua `userdata` objects. These are always written in PascalCase (e.g., [`ProjectHandle`](/docs/vulhunt-reference/types/project-handle), [`FunctionContext`](/docs/vulhunt-reference/types/function-context), [`AddressValue`](/docs/vulhunt-reference/types/address-value)). When a custom type appears in an array or dictionary, the same compound rules apply:

| Notation                                                   | Meaning                                        |
| :--------------------------------------------------------- | :--------------------------------------------- |
| [`AddressValue`](/docs/vulhunt-reference/types/address-value)   | A single address value                         |
| [`AddressValue[]`](/docs/vulhunt-reference/types/address-value) | An array of address values                     |
| `{[string]: VariantTable}`                                 | A dictionary mapping strings to variant tables |

### Combined notation

Parameters and return types may accept multiple forms, separated by `or`:

```
`string`, `AddressValue`, or `CallsToQuery`
```

This means the parameter accepts a `string`, an [`AddressValue`](/docs/vulhunt-reference/types/address-value), or a [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) table.
