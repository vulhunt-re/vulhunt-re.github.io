+++
title = "SearchCodeResult"
weight = 21
+++
The `SearchCodeResult` object represents the result of searching for a code pattern in the binary.
It is returned by the [`ProjectHandle:search_code`](/docs/vulhunt-reference/types/project-handle) method and provides information about the matched code region and its instructions.

### Fields

| Field              | Description                                         | Type                                                     |
| :----------------- | :-------------------------------------------------- | :------------------------------------------------------- |
| `function_address` | Address of the function containing the matched code | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `start_address`    | Start address of the matched code                   | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `end_address`      | End address of the matched code                     | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `insns`            | Table of matched instructions                       | [`Instruction[]`](/docs/vulhunt-reference/types/instruction)  |

### Reference

#### function_address

The address of the function that contains the matched code region.

#### start_address

The start address of the matched code region.

#### end_address

The end address of the matched code region.

#### insns

A table of [`Instruction`](/docs/vulhunt-reference/types/instruction) objects representing the instructions in the matched code region.

### Example

```lua
local result = project:search_code("554889e5................")
if result then
  print("Matched code in function at address:", result.function_address)
  print("Start address:", result.start_address)
  print("End address:", result.end_address)
  for _, insn in ipairs(result.insns) do
    print("Instruction:", insn.mnemonic, "at", insn.address)
  end
end
```
