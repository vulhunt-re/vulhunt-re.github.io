+++
title = "AnnotateGlobal"
weight = 4
+++
The `AnnotateGlobal` object is used to annotate a global variable at a specific address.

### Fields

| Field         | Description             | Type                                                     |
| :------------ | :---------------------- | :------------------------------------------------------- |
| `location`    | Address of the variable | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `declaration` | Variable declaration    | `string`                                                 |

### Reference

#### location

The address ([`AddressValue`](/docs/vulhunt-reference/types/address-value)) where the global variable is defined.

#### declaration

The global variable declaration as a string.

### Example

```lua
evidence = {
  functions = {
    [context.address] = {
      annotate:global{
        location = <AddressValue>,
        declaration = "int g_var"
      }
    }
  }
}
```
