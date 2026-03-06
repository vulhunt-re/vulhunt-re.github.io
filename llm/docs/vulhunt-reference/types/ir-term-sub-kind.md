+++
title = "IRTermSubKind"
weight = 15
+++
The `IRTermSubKind` type classifies the data type of an [`IRTerm`](/docs/vulhunt-reference/types/ir-term) that has kind `TYPE`. When you access the `sub_kind` field on a type term, it returns one of these constants indicating whether the type is an integer, pointer, struct, and so on.

### Fields

| Field              | Description                  | Type                                                         |
| :----------------- | :--------------------------- | :----------------------------------------------------------- |
| `VOID`             | Void type                    | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `BOOL`             | Boolean type                 | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `CHAR`             | Character type               | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `UNSIGNED_CHAR`    | Unsigned character type      | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `CHAR16`           | 16-bit character type        | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `CHAR32`           | 32-bit character type        | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `WCHAR`            | Wide character type          | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `UNSIGNED_WCHAR`   | Unsigned wide character type | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `INT`              | Integer type                 | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `UNSIGNED_INT`     | Unsigned integer type        | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `FLOAT`            | Floating point type          | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `POINTER`          | Pointer type                 | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `SHIFTED_POINTER`  | Shifted pointer type         | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `STRUCT`           | Structure type               | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `FUNC`             | Function type                | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `ENUM`             | Enumeration type             | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `UNION`            | Union type                   | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `ARRAY`            | Array type                   | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `INCOMPLETE_ARRAY` | Incomplete array type        | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |
| `TYPEDEF`          | Typedef type                 | [`IRTermSubKind`](/docs/vulhunt-reference/types/ir-term-sub-kind) |

### Reference

#### Primitive types

- `VOID`: the void type, representing the absence of a value.
- `BOOL`: a boolean type.
- `INT`: a signed integer type. The bit width is given by the term's `num_bits` field.
- `UNSIGNED_INT`: an unsigned integer type.
- `FLOAT`: a floating-point type.

#### Character types

- `CHAR`: a signed character type (typically 8-bit).
- `UNSIGNED_CHAR`: an unsigned character type.
- `CHAR16`: a 16-bit character type (e.g., `char16_t`).
- `CHAR32`: a 32-bit character type (e.g., `char32_t`).
- `WCHAR`: a wide character type (`wchar_t`).
- `UNSIGNED_WCHAR`: an unsigned wide character type.

#### Pointer types

- `POINTER`: a standard pointer type.
- `SHIFTED_POINTER`: a pointer with an applied offset, commonly seen in structure member access patterns.

#### Composite types

- `STRUCT`: a structure type. Access its fields via the parent term's `struct_fields`.
- `UNION`: a union type. Access its variants via `union_variants`.
- `ENUM`: an enumeration type. Access its variants via `enum_variants`.

#### Function and array types

- `FUNC`: a function type. Access its arguments via `function_arguments` and return type via `function_return_type`.
- `ARRAY`: a fixed-size array type.
- `INCOMPLETE_ARRAY`: an array type without a known size (e.g., a flexible array member).

#### Other

- `TYPEDEF`: a typedef alias. The aliased type name is available via the term's `name` field.

### Example

```lua
-- Inspect the prototype's return type
local proto = context:prototype()
if proto ~= nil then
  local ret = proto.function_return_type
  if ret.sub_kind == IRTermSubKind.POINTER then
    print("Function returns a pointer")
  elseif ret.sub_kind == IRTermSubKind.VOID then
    print("Function returns void")
  end
end
```
