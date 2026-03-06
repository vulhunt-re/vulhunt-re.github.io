+++
title = "IRTerm"
weight = 12
+++
The `IRTerm` object represents a node in VulHunt's intermediate representation (IR) of the binary. IR terms form a tree structure that models the lifted code: blocks contain instructions, instructions contain statements, and statements contain expressions. Every element in this tree, from a basic block down to an individual constant, is an `IRTerm`.

Each term carries a [`kind`](/docs/vulhunt-reference/types/ir-term-kind) that identifies the operation it represents (e.g., `ASSIGN`, `CALL`, `ADD`). Some terms also have a [`class_kind`](/docs/vulhunt-reference/types/ir-term-class-kind) that classifies them as `STMT` or `EXPR`, and `TYPE` terms have a [`sub_kind`](/docs/vulhunt-reference/types/ir-term-sub-kind) that provides type information (e.g., `INT`, `POINTER`, `STRUCT`).

Not all fields are present on every term. For example, `insns` is only meaningful on `BLOCK` terms and `lsb`/`msb` only on `EXTRACT` terms. Accessing an inapplicable field returns `nil`.

### Fields

| Field                  | Description                              | Type                                                             |
| :--------------------- | :--------------------------------------- | :--------------------------------------------------------------- |
| `address`              | Address associated with this term        | [`AddressValue`](/docs/vulhunt-reference/types/address-value)         |
| `next_address`         | Next address after this term             | [`AddressValue`](/docs/vulhunt-reference/types/address-value)         |
| `name`                 | Name associated with this term           | `string`                                                         |
| `num_bits`             | Number of bits for this term             | `number`                                                         |
| `num_bytes`            | Number of bytes for this term            | `number`                                                         |
| `type`                 | Type information for this term           | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                     |
| `type_name`            | Name of the type                         | `string`                                                         |
| `terms`                | Operands of this term                    | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |
| `variable`             | Variable associated with this term       | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                     |
| `value`                | Value of the term                        | [`BitVec`](/docs/vulhunt-reference/types/bitvec) or `number`          |
| `lsb`                  | Least significant bit                    | `number`                                                         |
| `msb`                  | Most significant bit                     | `number`                                                         |
| `kind`                 | The type of IR operation                 | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind)            |
| `sub_kind`             | The subtype of the IR operation          | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind)     |
| `class_kind`           | The class of the IR operation            | [`IRTermClassKind`](/docs/vulhunt-reference/types/ir-term-class-kind) |
| `insns`                | Instructions contained in this block     | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |
| `stmts`                | Statements contained in this instruction | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |
| `operands`             | Operands for expressions and statements  | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |
| `struct_fields`        | Fields of a struct type                  | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |
| `function_arguments`   | Arguments of a function type             | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |
| `function_return_type` | Return type of a function                | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                     |
| `enum_variants`        | Variants of an enum type                 | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |
| `union_variants`       | Variants of a union type                 | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)                   |

### Methods

| Method             | Description                                                        | Parameters | Return Type                                 |
| :----------------- | :----------------------------------------------------------------- | :--------- | :------------------------------------------ |
| `is_address`       | Returns true if this term represents an address                    | —          | `boolean`                                   |
| `has_next_address` | Returns true if this term has a next address                       | —          | `boolean`                                   |
| `is_variable`      | Returns true if this term is a variable                            | —          | `boolean`                                   |
| `is_value`         | Returns true if this term is a value                               | —          | `boolean`                                   |
| `to_bitvec`        | Converts the term to a [`BitVec`](/docs/vulhunt-reference/types/bitvec) | —          | [`BitVec`](/docs/vulhunt-reference/types/bitvec) |
| `is_offset`        | Returns true if this term is an offset                             | —          | `boolean`                                   |
| `is_shift_offset`  | Returns true if this term is a shift offset                        | —          | `boolean`                                   |

### Reference

#### address / next_address

The `address` field returns the address in the binary associated with this term. The `next_address` field returns the address immediately following the term. Use `has_next_address()` to check whether `next_address` is available before accessing it.

#### name

The name associated with this term. Returns a value for `INTRINSIC` terms (the intrinsic's name), `TYPE` terms (the type's display name), and type sub-terms such as `STRUCT_FIELD`, `FUNC_ARG`, `ENUM_VARIANT`, and `UNION_VARIANT`. Returns `nil` for other terms.

#### num_bits / num_bytes

The bit width and byte width of the term. For expressions, this reflects the size of the result. For type terms, it reflects the size of the described type.

#### type / type_name

For terms that carry type information (such as variables or typed expressions), `type` returns the type as an `IRTerm` with kind `TYPE`, and `type_name` returns the type's name as a string.

#### terms

The direct sub-terms (operands) of this term. This is a generic accessor; for more specific traversal, use `insns`, `stmts`, or `operands` depending on the term's kind.

#### variable

Returns the [`IRTerm`](/docs/vulhunt-reference/types/ir-term) associated with this term.

#### value

Returns the value of the term as a [`BitVec`](/docs/vulhunt-reference/types/bitvec).

#### lsb / msb

The least and most significant bit positions, only relevant for `EXTRACT` terms.

#### kind / sub_kind / class_kind

These fields classify the term:

- `kind` is the [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) identifying the specific IR operation (e.g., `ADD`, `CALL`, `STORE`).
- `class_kind` is the [`IRTermClassKind`](/docs/vulhunt-reference/types/ir-term-class-kind) classifying the term as a statement (`STMT`) or expression (`EXPR`).
- `sub_kind` is the [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) providing type classification for `TYPE` terms (e.g., `INT`, `POINTER`, `STRUCT`).

#### insns / stmts / operands

Hierarchical accessors for navigating the IR tree:

- `insns` returns the instructions inside a `BLOCK` term.
- `stmts` returns the statements inside an `INSN` or `PHI` term.
- `operands` returns the operand expressions of a statement or expression.

#### struct_fields / function_arguments / function_return_type / enum_variants / union_variants

Type-specific accessors available on `TYPE` terms:

- `struct_fields` contains the fields of a struct type.
- `function_arguments` contains the arguments of a function type.
- `function_return_type` contains the return type of a function type.
- `enum_variants` contains the variants of an enum type.
- `union_variants` contains the variants of a union type.

#### is_address / is_variable / is_value / is_offset / is_shift_offset

Convenience methods for checking what a term represents without comparing `kind` directly.

#### to_bitvec

Converts the term's value to a [`BitVec`](/docs/vulhunt-reference/types/bitvec). Useful for extracting constant values from `VAL` terms for further arithmetic or comparison.

### Example

```lua
-- Walk the basic blocks of a function and inspect its IR structure
local f = project:functions("target_function")

for _, block in ipairs(f:blocks()) do
  -- Each block is an IRTerm with kind BLOCK
  for _, insn in ipairs(block.insns) do
    for _, stmt in ipairs(insn.stmts) do
      -- Check for CALL statements
      if stmt.kind == IRTermKind.CALL then
        print("Call at", insn.address)
      end

      -- Check for assignments to detect stores of constant values
      if stmt.kind == IRTermKind.ASSIGN then
        local operands = stmt.operands
        if #operands >= 2 and operands[2].kind == IRTermKind.VAL then
          local val = operands[2]:to_bitvec()
          print("Assigns constant:", val:to_hex_string())
        end
      end
    end
  end
end
```
