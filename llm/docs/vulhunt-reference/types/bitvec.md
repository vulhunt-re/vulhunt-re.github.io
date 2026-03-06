+++
title = "BitVec"
weight = 2
+++
The `BitVec` object represents a fixed-width bit-vector used for precise arithmetic and bitwise operations on binary values. It is commonly used in VulHunt rules for manipulating addresses, operand values, and instruction data at the bit level.

`BitVec` supports Lua operators for arithmetic (`+`, `-`, `*`, `/`, `%`), comparison (`==`, `<`, `<=`), unary negation (`-`), concatenation (`..`), indexing (`[]` for bit access), and length (`#` for bit count).

### Functions

| Function              | Description                                                                                                 | Parameters                                                                                            | Return Type |
| :-------------------- | :---------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------- | :---------- |
| `new`                 | Constructs a new `BitVec` from an integer, string, address, or another `BitVec`                             | (`integer`, `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value) or `BitVec`, `number`) | `BitVec`    |
| `from_integer`        | Creates a `BitVec` from an unsigned integer with specified bit size                                         | (`number`, `number`)                                                                                  | `BitVec`    |
| `from_signed_integer` | Creates a `BitVec` from a signed integer with specified bit size                                            | (`number`, `number`)                                                                                  | `BitVec`    |
| `from_address`        | Creates a `BitVec` from an [`AddressValue`](/docs/vulhunt-reference/types/address-value) with specified bit size | ([`AddressValue`](/docs/vulhunt-reference/types/address-value), `number`)                                  | `BitVec`    |
| `from_string`         | Parses a `BitVec` from a string representation                                                              | `string`                                                                                              | `BitVec`    |
| `from_be_bytes`       | Creates a `BitVec` from a big-endian byte array                                                             | `number[]`                                                                                            | `BitVec`    |
| `from_le_bytes`       | Creates a `BitVec` from a little-endian byte array                                                          | `number[]`                                                                                            | `BitVec`    |
| `zero`                | Creates a zero `BitVec` with specified bit size                                                             | `number`                                                                                              | `BitVec`    |
| `one`                 | Creates a `BitVec` with value 1 and specified bit size                                                      | `number`                                                                                              | `BitVec`    |

### Methods

| Method             | Description                                                             | Parameters           | Return Type                                              |
| :----------------- | :---------------------------------------------------------------------- | :------------------- | :------------------------------------------------------- |
| `add`              | Unsigned addition                                                       | `BitVec`             | `BitVec`                                                 |
| `signed_add`       | Signed addition                                                         | `BitVec`             | `BitVec`                                                 |
| `sub`              | Unsigned subtraction                                                    | `BitVec`             | `BitVec`                                                 |
| `signed_sub`       | Signed subtraction                                                      | `BitVec`             | `BitVec`                                                 |
| `mul`              | Unsigned multiplication                                                 | `BitVec`             | `BitVec`                                                 |
| `signed_mul`       | Signed multiplication                                                   | `BitVec`             | `BitVec`                                                 |
| `div`              | Unsigned division                                                       | `BitVec`             | `BitVec`                                                 |
| `signed_div`       | Signed division                                                         | `BitVec`             | `BitVec`                                                 |
| `mod`              | Unsigned modulo                                                         | `BitVec`             | `BitVec`                                                 |
| `signed_mod`       | Signed modulo                                                           | `BitVec`             | `BitVec`                                                 |
| `carry`            | Returns 1 if unsigned addition would carry, 0 otherwise                 | `BitVec`             | `BitVec`                                                 |
| `signed_carry`     | Returns 1 if signed addition would carry, 0 otherwise                   | `BitVec`             | `BitVec`                                                 |
| `signed_borrow`    | Returns 1 if signed subtraction would borrow, 0 otherwise               | `BitVec`             | `BitVec`                                                 |
| `signed`           | Marks the `BitVec` as signed                                            | —                    | `BitVec`                                                 |
| `unsigned`         | Marks the `BitVec` as unsigned                                          | —                    | `BitVec`                                                 |
| `cast`             | Casts the `BitVec` to a different bit size                              | `number`             | `BitVec`                                                 |
| `unsigned_cast`    | Casts the `BitVec` to a different bit size as unsigned                  | `number`             | `BitVec`                                                 |
| `signed_cast`      | Casts the `BitVec` to a different bit size as signed (sign-extends)     | `number`             | `BitVec`                                                 |
| `is_one`           | Returns true if the value is 1                                          | —                    | `boolean`                                                |
| `is_zero`          | Returns true if the value is 0                                          | —                    | `boolean`                                                |
| `msb`              | Returns the most significant bit                                        | —                    | `number`                                                 |
| `lsb`              | Returns the least significant bit                                       | —                    | `number`                                                 |
| `is_signed`        | Returns true if marked as signed                                        | —                    | `boolean`                                                |
| `is_unsigned`      | Returns true if marked as unsigned                                      | —                    | `boolean`                                                |
| `bits`             | Returns the number of bits                                              | —                    | `number`                                                 |
| `abs`              | Returns the absolute value                                              | —                    | `BitVec`                                                 |
| `neg`              | Returns the negation                                                    | —                    | `BitVec`                                                 |
| `bnot`             | Bitwise NOT                                                             | —                    | `BitVec`                                                 |
| `band`             | Bitwise AND                                                             | `BitVec`             | `BitVec`                                                 |
| `bor`              | Bitwise OR                                                              | `BitVec`             | `BitVec`                                                 |
| `bxor`             | Bitwise XOR                                                             | `BitVec`             | `BitVec`                                                 |
| `shl`              | Shift left                                                              | `BitVec`             | `BitVec`                                                 |
| `shr`              | Shift right                                                             | `BitVec`             | `BitVec`                                                 |
| `signed_shr`       | Shift right (sign-extending)                                            | `BitVec`             | `BitVec`                                                 |
| `count_ones`       | Returns the number of 1 bits                                            | —                    | `number`                                                 |
| `count_zeros`      | Returns the number of 0 bits                                            | —                    | `number`                                                 |
| `leading_ones`     | Returns the number of leading 1 bits                                    | —                    | `number`                                                 |
| `leading_zeros`    | Returns the number of leading 0 bits                                    | —                    | `number`                                                 |
| `succ`             | Returns the successor (adds 1)                                          | —                    | `BitVec`                                                 |
| `incr_by`          | Increments by specified amount                                          | `number`             | `BitVec`                                                 |
| `pred`             | Returns the predecessor (subtracts 1)                                   | —                    | `BitVec`                                                 |
| `decr_by`          | Decrements by specified amount                                          | `number`             | `BitVec`                                                 |
| `extract`          | Extracts bits from lsb offset to msb offset (exclusive)                 | (`number`, `number`) | `BitVec`                                                 |
| `concat`           | Concatenates two bit-vectors                                            | `BitVec`             | `BitVec`                                                 |
| `is_exactly_equal` | Returns true if both value and bit size are equal                       | `BitVec`             | `boolean`                                                |
| `to_address`       | Converts to an [`AddressValue`](/docs/vulhunt-reference/types/address-value) | —                    | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `to_u64`           | Converts to unsigned 64-bit integer                                     | —                    | `number`                                                 |
| `to_i64`           | Converts to signed 64-bit integer                                       | —                    | `number`                                                 |
| `to_u32`           | Converts to unsigned 32-bit integer                                     | —                    | `number`                                                 |
| `to_i32`           | Converts to signed 32-bit integer                                       | —                    | `number`                                                 |
| `to_be_bytes`      | Converts to big-endian byte array                                       | —                    | `number[]`                                               |
| `to_le_bytes`      | Converts to little-endian byte array                                    | —                    | `number[]`                                               |
| `to_bytes`         | Converts to native-endian byte array                                    | —                    | `number[]`                                               |
| `to_string`        | Converts to string representation                                       | —                    | `string`                                                 |
| `to_hex_string`    | Converts to hexadecimal string representation                           | —                    | `string`                                                 |
| `to_binary_string` | Converts to binary string representation                                | —                    | `string`                                                 |

### Reference

#### new

Constructs a new `BitVec` from an integer, string, address, or another `BitVec`. The bit size parameter is required when constructing from an integer or [`AddressValue`](/docs/vulhunt-reference/types/address-value), and optional when constructing from another `BitVec` (casts to the given size if provided). When constructing from a string, the bit size is inferred from the string representation.

#### from_integer

Creates a `BitVec` from an unsigned integer with specified bit size.

#### from_signed_integer

Creates a `BitVec` from a signed integer with specified bit size. The resulting `BitVec` is marked as signed.

#### from_address

Creates a `BitVec` from an [`AddressValue`](/docs/vulhunt-reference/types/address-value) with specified bit size.

#### from_string

Parses a `BitVec` from a string representation.

#### from_be_bytes

Creates a `BitVec` from a big-endian byte array.

#### from_le_bytes

Creates a `BitVec` from a little-endian byte array.

#### zero

Creates a zero `BitVec` with specified bit size.

#### one

Creates a `BitVec` with value 1 and specified bit size.

#### add / signed_add

Unsigned and signed addition. Operands with different bit widths are automatically cast to the larger width before the operation.

#### sub / signed_sub

Unsigned and signed subtraction.

#### mul / signed_mul

Unsigned and signed multiplication.

#### div / signed_div

Unsigned and signed division. Raises a runtime error on division by zero.

#### mod / signed_mod

Unsigned and signed modulo. Raises a runtime error on modulo by zero.

#### carry / signed_carry / signed_borrow

Carry and borrow detection for arithmetic operations. Returns a `BitVec` with value 1 (8-bit) if the operation would carry or borrow, 0 otherwise.

#### signed / unsigned

Marks the `BitVec` as signed or unsigned. This affects how comparison and arithmetic operations behave.

#### cast / unsigned_cast / signed_cast

Casts the `BitVec` to a different bit size. `signed_cast` sign-extends the value when widening.

#### is_one / is_zero

Returns true if the value is 1 or 0 respectively.

#### msb / lsb

Returns the value of the most or least significant bit as a number.

#### is_signed / is_unsigned

Returns true if the `BitVec` is marked as signed or unsigned.

#### bits

Returns the number of bits in the `BitVec`.

#### abs / neg

Returns the absolute value or negation of the `BitVec`.

#### bnot / band / bor / bxor

Bitwise NOT, AND, OR, and XOR operations.

#### shl / shr / signed_shr

Shift left, logical shift right, and arithmetic (sign-extending) shift right.

#### count_ones / count_zeros / leading_ones / leading_zeros

Bit counting operations.

#### succ / pred / incr_by / decr_by

Increment and decrement operations. `succ` and `pred` add or subtract 1, while `incr_by` and `decr_by` take a specified amount.

#### extract

Extracts bits from lsb offset to msb offset (exclusive). The result is an unsigned `BitVec` with `(msb_offset - lsb_offset)` bits. Raises a runtime error if `msb_offset <= lsb_offset` or if `msb_offset` exceeds the bit-vector size.

#### concat

Concatenates two bit-vectors. The receiver becomes the high bits and the argument becomes the low bits of the result.

#### is_exactly_equal

Returns true if both the value and the bit size are equal. Unlike `==`, which normalizes widths before comparing, this requires an exact match.

#### to_address

Converts to an [`AddressValue`](/docs/vulhunt-reference/types/address-value). Raises a runtime error if the value does not fit into a 64-bit address.

#### to_u64 / to_i64 / to_u32 / to_i32

Converts to a Lua number (unsigned or signed, 64-bit or 32-bit). Raises a runtime error if the value does not fit.

#### to_be_bytes / to_le_bytes / to_bytes

Converts to a byte array in big-endian, little-endian, or native-endian order.

#### to_string / to_hex_string / to_binary_string

Converts to a string representation in decimal, hexadecimal (with `0x` prefix), or binary (with `0b` prefix).

### Example

```lua
-- Constructing BitVec values
local a = BitVec.from_integer(0xFF, 8)
local b = BitVec.new(42, 32)
local z = BitVec.zero(64)

-- Arithmetic
local sum = a:add(b)
local diff = a:sub(b)

-- Bitwise operations
local masked = b:band(BitVec.from_integer(0x0F, 32))
local shifted = b:shl(BitVec.from_integer(4, 32))

-- Bit extraction
local nibble = b:extract(0, 4)  -- extract bits [0, 4)

-- Concatenation
local wide = a:concat(b)  -- a becomes high bits, b becomes low bits

-- Sign handling
local signed_val = BitVec.from_signed_integer(-1, 32)
print(signed_val:is_signed())  -- true
print(signed_val:to_i32())     -- -1

-- Convert to/from AddressValue
local addr = BitVec.from_integer(0x401000, 64):to_address()
local bv = addr:to_bitvec(64)

-- Byte array conversion
local bytes = b:to_le_bytes()
local restored = BitVec.from_le_bytes(bytes)
```
