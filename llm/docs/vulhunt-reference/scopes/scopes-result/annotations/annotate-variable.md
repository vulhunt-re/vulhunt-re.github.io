+++
title = "AnnotateVariable"
weight = 8
+++
The `AnnotateVariable` object is used to create an annotation for a variable at a specific location in the decompiled code.

### Fields

| Field         | Description               | Type                                                     |
| :------------ | :------------------------ | :------------------------------------------------------- |
| `position`    | Variable position         | `string`                                                 |
| `index`       | Variable index            | `number`                                                 |
| `declaration` | Variable declaration      | `string`                                                 |
| `location`    | Address of the assignment | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |

### Reference

#### position

The position of the variable. Only `"global"`, `"input"`, or `"output"` is currently valid.

#### index

The index of the variable. Only `0` is currently valid.

#### declaration

The variable declaration as a string.

#### location

The address ([`AddressValue`](/docs/vulhunt-reference/types/address-value)) of the assignment.

### Example

```lua
evidence = {
  functions = {
    [context.caller.address] = {
      annotate:variable{
        position = "output",
        index = 0,
        declaration = "int result",
        location = <AddressValue>
      }
    }
  }
}
```
