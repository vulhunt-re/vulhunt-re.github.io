+++
title = "Instruction"
weight = 11
+++
The `Instruction` object represents a single disassembled instruction in the binary, including its address, size, mnemonic, and operands.

### Fields

| Field      | Description          | Type                                                         |
| :--------- | :------------------- | :----------------------------------------------------------- |
| `address`  | Instruction address  | [`AddressValue`](/docs/vulhunt-reference/types/address-value)     |
| `size`     | Instruction size     | `number`                                                     |
| `mnemonic` | Instruction mnemonic | `string`                                                     |
| `operands` | Instruction operands | `{address: AddressValue, register: string, value: number}[]` |

### Reference

#### address

The address of the instruction in the binary.

#### size

The size of the instruction in bytes.

#### mnemonic

The mnemonic (operation code) of the instruction, e.g., `mov`, `add`, `jmp`.

#### operands

An array of tables, each representing an operand of the instruction.  
Each operand table may contain the keys: `address`, `register`, or `value`, depending on the operand type.

### Example

```lua
function check(project, context)
    -- Search for a code pattern and print the mnemonics of matching instructions
    local search_code_table = project:search_code("554889e5................")
    for _, insn in ipairs(search_code_table.insns) do
        print("Address:", insn.address, "Mnemonic:", insn.mnemonic)
        -- Print detailed information about each operand
        for _, op in ipairs(insn.operands) do
            local register = op["register"]
            local address = op["address"]
            local value = op["value"]

            if register ~= nil then
                print("  Operand register:", register)
            end
            if address ~= nil then
                print("  Operand address:", address)
            end
            if value ~= nil then
                print("  Operand value:", value)
            end
        end
    end
end
```
