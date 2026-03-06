+++
title = "OperandOrigin"
weight = 17
+++
The `OperandOrigin` object provides information about where an operand (function argument or return value) originates in the binary, including its source and definition addresses and positions.

### Fields

| Field                 | Description                                                  | Type                                                     |
| :-------------------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| `source_address`      | Address where the operand's value was sourced                | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `source_position`     | Position of the source IR instruction                        | `number`                                                 |
| `definition_address`  | Address where the operand was defined                        | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `definition_position` | Position of the IR instruction where the operand was defined | `number`                                                 |
| `index`               | Index of the operand in the context                          | `number`                                                 |

### Reference

#### source_address

The address where the operand's value was sourced.

#### source_position

The position of the source IR instruction.

#### definition_address

The address where the operand was defined.

#### definition_position

The position of the IR instruction where the operand was defined.

#### index

The index of the operand in the context.

### Example

```lua
-- Access the operand (OperandInfo) of the second argument
local src = context.inputs[2]

-- Access the origin information for the operand
local origin = src.origin

print("Source address:", origin.source_address)
print("Source position:", origin.source_position)
print("Definition address:", origin.definition_address)
print("Definition position:", origin.definition_position)
print("Operand index in context:", origin.index)
```
