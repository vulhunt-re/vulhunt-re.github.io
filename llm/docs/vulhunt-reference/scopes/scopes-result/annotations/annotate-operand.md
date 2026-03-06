+++
title = "AnnotateOperand"
weight = 5
+++
The `AnnotateOperand` object is used to create an annotation tied to a specific operand at an address.

### Fields

| Field     | Description         | Type                                                     |
| :-------- | :------------------ | :------------------------------------------------------- |
| `at`      | Address to annotate | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `operand` | Operand             | [`OperandInfo`](/docs/vulhunt-reference/types/operand-info)   |
| `message` | Annotation message  | `string`                                                 |

### Reference

#### at

The address ([`AddressValue`](/docs/vulhunt-reference/types/address-value)) where the operand resides.

#### operand

An [`OperandInfo`](/docs/vulhunt-reference/types/operand-info) instance describing the operand.

#### message

A message describing the operand at the specified location.

### Example

```lua
evidence = {
  functions = {
    [context.address] = {
      annotate:operand{
        at = <AddressValue>,
        operand = <OperandInfo>,
        message = "operand annotation example"
      }
    }
  }
}
```
