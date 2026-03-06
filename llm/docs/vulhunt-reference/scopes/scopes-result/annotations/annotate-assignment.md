+++
title = "AnnotateAssignment"
weight = 2
+++
The `AnnotateAssignment` object is used to create an annotation for a variable assignment at a specific address in the code.

### Fields

| Field         | Description               | Type                                                     |
| :------------ | :------------------------ | :------------------------------------------------------- |
| `location`    | Address of the assignment | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `declaration` | Variable declaration      | `string`                                                 |

### Reference

#### location

The address ([`AddressValue`](/docs/vulhunt-reference/types/address-value)) where the assignment occurs.

#### declaration

The variable declaration as a string.

### Example

```lua
evidence = {
  functions = {
    [context.caller.address] = {
      annotate:assignment{
        location = <AddressValue>,
        declaration = "int result"
      }
    }
  }
}
```
