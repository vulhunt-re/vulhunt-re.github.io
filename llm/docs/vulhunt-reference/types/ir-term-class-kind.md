+++
title = "IRTermClassKind"
weight = 13
+++
The `IRTermClassKind` type classifies an [`IRTerm`](/docs/vulhunt-reference/types/ir-term) as either a statement or an expression. Not all terms carry a class kind: structural terms (`BLOCK`, `INSN`, `PHI`), type-related terms (`TYPE`, `STRUCT_FIELD`, `FUNC_ARG`, `ENUM_VARIANT`, `UNION_VARIANT`), `LOCATION` terms, and unwrapped `VAR`/`VAL` operands return `nil` for `class_kind`.

- **Statements** (`STMT`) are IR operations that perform an action but do not produce a value: assignments, stores, branches, calls, and returns.
- **Expressions** (`EXPR`) are IR operations that compute and produce a value: variables, constants, loads, arithmetic, bitwise operations, and comparisons.

### Fields

| Field  | Description      | Type                                                             |
| :----- | :--------------- | :--------------------------------------------------------------- |
| `STMT` | Statement class  | [`IRTermClassKind`](/docs/vulhunt-reference/types/ir-term-class-kind) |
| `EXPR` | Expression class | [`IRTermClassKind`](/docs/vulhunt-reference/types/ir-term-class-kind) |

### Example

```lua
for _, insn in ipairs(block.insns) do
  for _, stmt in ipairs(insn.stmts) do
    if stmt.class_kind == IRTermClassKind.STMT then
      -- Process statements (assignments, stores, calls, etc.)
    end
  end
end
```
