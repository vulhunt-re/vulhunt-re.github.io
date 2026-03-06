+++
title = "AnnotateRange"
weight = 7
+++
The `AnnotateRange` object is used to create an annotation spanning a range of addresses in the decompiled code.

### Fields

| Field     | Description                      | Type                                                     |
| :-------- | :------------------------------- | :------------------------------------------------------- |
| `from`    | Start address of the range       | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `to`      | End address of the range         | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `message` | Annotation message for the range | `string`                                                 |

### Reference

#### from

The starting address ([`AddressValue`](/docs/vulhunt-reference/types/address-value)) of the range to annotate.

#### to

The ending address ([`AddressValue`](/docs/vulhunt-reference/types/address-value)) of the range to annotate.

#### message

The annotation message to display for the specified range.

### Example

```lua
evidence = {
  functions = {
    [context.address] = {
      annotate:range{
        from = <AddressValue>,
        to = <AddressValue>,
        message = "annotate:range example"
      }
    }
  }
}
```
