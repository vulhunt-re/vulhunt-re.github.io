+++
title = "AddressValue"
weight = 1
+++
The `AddressValue` object represents a memory address in the binary. It is used throughout VulHunt rules to reference specific locations in the binary, such as function addresses, call site addresses, and instruction addresses.

`AddressValue` supports arithmetic (`+`, `-`), comparison (`==`, `<`, `<=`), and conversion to string and [`BitVec`](/docs/vulhunt-reference/types/bitvec).

### Functions

| Function       | Description                                                                                                                     | Parameters                                                                                                                   | Return Type                                              |
| :------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------- |
| `new`          | Constructs a new `AddressValue` from an integer, string, [`BitVec`](/docs/vulhunt-reference/types/bitvec), or another `AddressValue` | `integer`, `string`, [`BitVec`](/docs/vulhunt-reference/types/bitvec) or [`AddressValue`](/docs/vulhunt-reference/types/address-value) | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `from_integer` | Creates an `AddressValue` from an unsigned 64-bit integer                                                                       | `number`                                                                                                                     | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `from_string`  | Parses an `AddressValue` from a hexadecimal string                                                                              | `string`                                                                                                                     | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `from_bitvec`  | Converts a [`BitVec`](/docs/vulhunt-reference/types/bitvec) to an `AddressValue`                                                     | [`BitVec`](/docs/vulhunt-reference/types/bitvec)                                                                                  | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |

### Methods

| Method      | Description                                                                                   | Parameters | Return Type                                 |
| :---------- | :-------------------------------------------------------------------------------------------- | :--------- | :------------------------------------------ |
| `to_bitvec` | Converts the address to a [`BitVec`](/docs/vulhunt-reference/types/bitvec) with specified bit size | `number`   | [`BitVec`](/docs/vulhunt-reference/types/bitvec) |

### Reference

#### new

Constructs a new `AddressValue` from an integer, string, [`BitVec`](/docs/vulhunt-reference/types/bitvec), or another `AddressValue`.

#### from_integer

Creates an `AddressValue` from an unsigned 64-bit integer.

#### from_string

Parses an `AddressValue` from a hexadecimal string.

#### from_bitvec

Converts a [`BitVec`](/docs/vulhunt-reference/types/bitvec) to an `AddressValue`.

#### to_bitvec

Converts the address to a [`BitVec`](/docs/vulhunt-reference/types/bitvec) with specified bit size.

### Example

```lua
-- Constructing addresses
local addr1 = AddressValue.new(0x401000)
local addr2 = AddressValue.from_string("0x401000")
local addr3 = AddressValue.from_integer(0x401000)

-- Arithmetic
local next_addr = addr1 + 0x10
local prev_addr = addr1 - 0x10

-- Comparison
if addr1 == addr2 then
  print("Addresses are equal")
end
if addr1 < next_addr then
  print("addr1 comes before next_addr")
end

-- Convert to BitVec for bitwise operations
local bv = addr1:to_bitvec(64)

-- Use with project:decompile
local decompiled = project:decompile(AddressValue.new(0x401000))
```
