+++
title = "IRTermKind"
weight = 14
+++
The `IRTermKind` type identifies the specific IR operation that an [`IRTerm`](/docs/vulhunt-reference/types/ir-term) represents. Every [`IRTerm`](/docs/vulhunt-reference/types/ir-term) has a `kind` field of this type, which you can compare against the constants below or test with the corresponding `is_*` methods.

The constants are organized into several categories:

- **Structural**: `BLOCK`, `INSN`, `PHI`
- **Statements**: `ASSIGN`, `STORE`, `BRANCH`, `CBRANCH`, `CALL`, `RETURN`, `SKIP`, `INTRINSIC`
- **Operand expressions**: `OFFSET`, `LOCATION`, `VAR`, `VAL`, `LOAD`, `CAST`, `EXTRACT`, `CONCAT`, `IFELSE`, `CHOICE`, `INTRINSIC`, `NAN`
- **Unary operations**: `NOT`, `NEG`, `ABS`, `SQRT`, `CEILING`, `FLOOR`, `ROUND`, `POPCOUNT`
- **Binary arithmetic**: `ADD`, `SUB`, `MUL`, `DIV`, `SDIV`, `REM`, `SREM`
- **Bitwise and shift**: `AND`, `OR`, `XOR`, `SHL`, `SHR`, `SAR`
- **Comparison**: `EQ`, `NEQ`, `LT`, `LE`, `SLT`, `SLE`
- **Carry/borrow**: `CARRY`, `SCARRY`, `SBORROW`
- **Type-related**: `TYPE`, `STRUCT_FIELD`, `FUNC_ARG`, `ENUM_VARIANT`, `UNION_VARIANT`

### Fields

| Field           | Description                              | Type                                                  |
| :-------------- | :--------------------------------------- | :---------------------------------------------------- |
| `BLOCK`         | Block operation type                     | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `INSN`          | Instruction operation type               | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `PHI`           | PHI operation type                       | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `ASSIGN`        | Assignment operation type                | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `STORE`         | Store operation type                     | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `BRANCH`        | Branch operation type                    | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `CBRANCH`       | Conditional branch operation type        | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `CALL`          | Call operation type                      | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `RETURN`        | Return operation type                    | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SKIP`          | Skip operation type                      | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `INTRINSIC`     | Intrinsic operation type                 | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `OFFSET`        | Offset operation type                    | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `LOCATION`      | Location operation type                  | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `VAR`           | Variable operation type                  | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `VAL`           | Value operation type                     | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `LOAD`          | Load operation type                      | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `CAST`          | Cast operation type                      | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `IFELSE`        | If-else operation type                   | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `EXTRACT`       | Extract operation type                   | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `CONCAT`        | Concatenation operation type             | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `CHOICE`        | Choice operation type                    | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `NAN`           | NaN operation type                       | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `NOT`           | NOT operation type                       | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `NEG`           | Negation operation type                  | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `ABS`           | Absolute value operation type            | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SQRT`          | Square root operation type               | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `CEILING`       | Ceiling operation type                   | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `FLOOR`         | Floor operation type                     | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `ROUND`         | Round operation type                     | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `POPCOUNT`      | Population count operation type          | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `AND`           | AND operation type                       | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `OR`            | OR operation type                        | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `XOR`           | XOR operation type                       | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `ADD`           | Addition operation type                  | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SUB`           | Subtraction operation type               | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `DIV`           | Division operation type                  | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SDIV`          | Signed division operation type           | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `MUL`           | Multiplication operation type            | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `REM`           | Remainder operation type                 | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SREM`          | Signed remainder operation type          | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SHL`           | Shift left operation type                | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SAR`           | Arithmetic right shift operation type    | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SHR`           | Logical right shift operation type       | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `EQ`            | Equality operation type                  | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `NEQ`           | Inequality operation type                | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `LT`            | Less than operation type                 | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `LE`            | Less than or equal operation type        | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SLT`           | Signed less than operation type          | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SLE`           | Signed less than or equal operation type | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SBORROW`       | Signed borrow operation type             | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `CARRY`         | Carry operation type                     | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `SCARRY`        | Signed carry operation type              | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `TYPE`          | Type operation type                      | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `STRUCT_FIELD`  | Struct field operation type              | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `FUNC_ARG`      | Function argument operation type         | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `ENUM_VARIANT`  | Enum variant operation type              | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |
| `UNION_VARIANT` | Union variant operation type             | [`IRTermKind`](/docs/vulhunt-reference/types/ir-term-kind) |

### Methods

Each constant has a corresponding `is_*` method that returns `true` when the kind matches. For example, `kind:is_call()` is equivalent to `kind == IRTermKind.CALL`.

| Method                 | Description                             | Parameters | Return Type |
| :--------------------- | :-------------------------------------- | :--------- | :---------- |
| `is_block`             | Returns true if kind is `BLOCK`         | —          | `boolean`   |
| `is_insn`              | Returns true if kind is `INSN`          | —          | `boolean`   |
| `is_phi`               | Returns true if kind is `PHI`           | —          | `boolean`   |
| `is_assign`            | Returns true if kind is `ASSIGN`        | —          | `boolean`   |
| `is_store`             | Returns true if kind is `STORE`         | —          | `boolean`   |
| `is_branch`            | Returns true if kind is `BRANCH`        | —          | `boolean`   |
| `is_cbranch`           | Returns true if kind is `CBRANCH`       | —          | `boolean`   |
| `is_call`              | Returns true if kind is `CALL`          | —          | `boolean`   |
| `is_return`            | Returns true if kind is `RETURN`        | —          | `boolean`   |
| `is_skip`              | Returns true if kind is `SKIP`          | —          | `boolean`   |
| `is_intrinsic`         | Returns true if kind is `INTRINSIC`     | —          | `boolean`   |
| `is_offset`            | Returns true if kind is `OFFSET`        | —          | `boolean`   |
| `is_location`          | Returns true if kind is `LOCATION`      | —          | `boolean`   |
| `is_var`               | Returns true if kind is `VAR`           | —          | `boolean`   |
| `is_val`               | Returns true if kind is `VAL`           | —          | `boolean`   |
| `is_load`              | Returns true if kind is `LOAD`          | —          | `boolean`   |
| `is_cast`              | Returns true if kind is `CAST`          | —          | `boolean`   |
| `is_ifelse`            | Returns true if kind is `IFELSE`        | —          | `boolean`   |
| `is_extract`           | Returns true if kind is `EXTRACT`       | —          | `boolean`   |
| `is_concat`            | Returns true if kind is `CONCAT`        | —          | `boolean`   |
| `is_choice`            | Returns true if kind is `CHOICE`        | —          | `boolean`   |
| `is_nan`               | Returns true if kind is `NAN`           | —          | `boolean`   |
| `is_not`               | Returns true if kind is `NOT`           | —          | `boolean`   |
| `is_neg`               | Returns true if kind is `NEG`           | —          | `boolean`   |
| `is_abs`               | Returns true if kind is `ABS`           | —          | `boolean`   |
| `is_sqrt`              | Returns true if kind is `SQRT`          | —          | `boolean`   |
| `is_ceiling`           | Returns true if kind is `CEILING`       | —          | `boolean`   |
| `is_floor`             | Returns true if kind is `FLOOR`         | —          | `boolean`   |
| `is_round`             | Returns true if kind is `ROUND`         | —          | `boolean`   |
| `is_popcount`          | Returns true if kind is `POPCOUNT`      | —          | `boolean`   |
| `is_and`               | Returns true if kind is `AND`           | —          | `boolean`   |
| `is_or`                | Returns true if kind is `OR`            | —          | `boolean`   |
| `is_xor`               | Returns true if kind is `XOR`           | —          | `boolean`   |
| `is_add`               | Returns true if kind is `ADD`           | —          | `boolean`   |
| `is_sub`               | Returns true if kind is `SUB`           | —          | `boolean`   |
| `is_div`               | Returns true if kind is `DIV`           | —          | `boolean`   |
| `is_signed_div`        | Returns true if kind is `SDIV`          | —          | `boolean`   |
| `is_mul`               | Returns true if kind is `MUL`           | —          | `boolean`   |
| `is_rem`               | Returns true if kind is `REM`           | —          | `boolean`   |
| `is_signed_rem`        | Returns true if kind is `SREM`          | —          | `boolean`   |
| `is_shl`               | Returns true if kind is `SHL`           | —          | `boolean`   |
| `is_signed_shr`        | Returns true if kind is `SAR`           | —          | `boolean`   |
| `is_shr`               | Returns true if kind is `SHR`           | —          | `boolean`   |
| `is_eq`                | Returns true if kind is `EQ`            | —          | `boolean`   |
| `is_neq`               | Returns true if kind is `NEQ`           | —          | `boolean`   |
| `is_lt`                | Returns true if kind is `LT`            | —          | `boolean`   |
| `is_le`                | Returns true if kind is `LE`            | —          | `boolean`   |
| `is_signed_lt`         | Returns true if kind is `SLT`           | —          | `boolean`   |
| `is_signed_le`         | Returns true if kind is `SLE`           | —          | `boolean`   |
| `is_signed_borrow`     | Returns true if kind is `SBORROW`       | —          | `boolean`   |
| `is_carry`             | Returns true if kind is `CARRY`         | —          | `boolean`   |
| `is_signed_carry`      | Returns true if kind is `SCARRY`        | —          | `boolean`   |
| `is_type`              | Returns true if kind is `TYPE`          | —          | `boolean`   |
| `is_struct_field`      | Returns true if kind is `STRUCT_FIELD`  | —          | `boolean`   |
| `is_function_argument` | Returns true if kind is `FUNC_ARG`      | —          | `boolean`   |
| `is_enum_variant`      | Returns true if kind is `ENUM_VARIANT`  | —          | `boolean`   |
| `is_union_variant`     | Returns true if kind is `UNION_VARIANT` | —          | `boolean`   |

### Reference

#### Structural kinds

- `BLOCK`: a basic block containing a sequence of instructions.
- `INSN`: a single instruction containing one or more statements.
- `PHI`: an SSA phi node merging values from different control flow paths.

#### Statement kinds

- `ASSIGN`: an assignment of a value to a variable.
- `STORE`: a memory store operation.
- `BRANCH`: an unconditional branch (jump) to a target address.
- `CBRANCH`: a conditional branch that jumps based on a boolean condition.
- `CALL`: a function call.
- `RETURN`: a return from the current function.
- `SKIP`: a no-op placeholder instruction.
- `INTRINSIC`: a built-in operation with no direct IR equivalent. `INTRINSIC` can also appear as an expression when it produces a value.

#### Expression kinds

- `VAR`: a variable reference. Access the underlying variable via the `variable` field.
- `VAL`: a constant value. Access it via the `value` field or `to_bitvec()`.
- `LOAD`: a memory load operation.
- `OFFSET`: an address offset computation.
- `LOCATION`: a reference to a specific memory location.
- `CAST`: a type cast operation.
- `EXTRACT`: extracts a range of bits from a value (see `lsb`, `msb`).
- `CONCAT`: concatenates two values.
- `IFELSE`: a conditional (ternary) expression.
- `CHOICE`: a choice between multiple alternative values.
- `INTRINSIC`: a built-in operation with no direct IR equivalent. Can also appear as a statement (see above).
- `NAN`: a Not-a-Number value.

#### Unary operations

`NOT`, `NEG`, `ABS`, `SQRT`, `CEILING`, `FLOOR`, `ROUND`, `POPCOUNT` are standard unary operations on a single operand.

#### Binary arithmetic

`ADD`, `SUB`, `MUL`, `DIV`, `SDIV`, `REM`, `SREM` are arithmetic operations. The `S`-prefixed variants operate on signed values.

#### Bitwise, shift, and comparison

- `AND`, `OR`, `XOR` are bitwise operations.
- `SHL` is shift left, `SHR` is logical (unsigned) shift right, `SAR` is arithmetic (signed) shift right.
- `EQ`, `NEQ` test equality/inequality. `LT`, `LE` are unsigned comparisons. `SLT`, `SLE` are signed comparisons.
- `CARRY`, `SCARRY`, `SBORROW` detect carry and borrow for arithmetic operations.

#### Type-related kinds

- `TYPE`: a type descriptor term. Use [`sub_kind`](/docs/vulhunt-reference/types/ir-term-sub-kind) to determine the specific type category.
- `STRUCT_FIELD`: a field within a struct type.
- `FUNC_ARG`: an argument of a function type.
- `ENUM_VARIANT`: a variant of an enum type.
- `UNION_VARIANT`: a variant of a union type.

### Example

```lua
-- Check the kind of an IR term
if stmt.kind == IRTermKind.CALL then
  print("Found a call at", stmt.address)
end

-- Using the is_* convenience methods
if stmt.kind:is_assign() then
  print("Found an assignment")
end

-- Filter for all STORE operations in a block
for _, insn in ipairs(block.insns) do
  for _, stmt in ipairs(insn.stmts) do
    if stmt.kind:is_store() then
      print("Store at", stmt.address)
    end
  end
end
```
