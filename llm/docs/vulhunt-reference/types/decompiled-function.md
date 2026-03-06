+++
title = "DecompiledFunction"
weight = 8
+++
The `DecompiledFunction` object represents the result of decompiling a function from the binary.
It provides methods for printing the decompiled code and running syntax (Weggli-compatible) queries on the decompiled code.

### Methods

| Method  | Description                                               | Parameters               | Return Type                                                         |
| :------ | :-------------------------------------------------------- | :----------------------- | :------------------------------------------------------------------ |
| `query` | Queries the decompiled code using a string or query table | `string` or `QueryTable` | [`SyntaxMatchResult`](/docs/vulhunt-reference/types/syntax-match-result) |

### QueryTable

| Field     | Description                                                                                                                       | Type       |
| :-------- | :-------------------------------------------------------------------------------------------------------------------------------- | :--------- |
| `engine`  | Defines the engine to use (currently only "syntax" is available)                                                                  | `string`   |
| `raw`     | If true, the query will be used as-is; otherwise, it will be wrapped in `{{}}`                                                    | `boolean`  |
| `unique`  | Enforces that captured variables must refer to different nodes, ensuring no two placeholders match the same code element          | `boolean`  |
| `regexes` | A table of regular expressions to match (or exclude) variable names or values, enabling flexible constraints on captured elements | `string[]` |
| `query`   | The query to execute                                                                                                              | `string`   |

### Reference

#### query

Queries the decompiled code using either a string or a QueryTable.

- If a string is provided, it is interpreted as a syntax query.
- If a QueryTable is provided, it must contain the fields described in the QueryTable above. The `engine` field is optional; omitting it defaults to the syntax engine.

Only the syntax engine is currently supported; specifying any other value results in a runtime error.

Returns a [`SyntaxMatchResult`](/docs/vulhunt-reference/types/syntax-match-result) object containing the query results.

### Example

```lua
-- Match calls to free
decomp = project:decompile("target_function")
local matches = decomp:query("free($ptr)")

-- Match calls to memcpy-like functions
-- where the size argument is NOT a constant
decomp = project:decompile("vulnerable_function")
local matches = decomp:query{
    engine = 'syntax',
    raw = true,
    query = [[ $FN($DST, $SRC, $SIZE); ]],
    regexes = {
        "$FN=memcpy|memmove|strncpy",   -- function name must match one of these
        "$SIZE!=^[0-9]+$",              -- size must NOT be a plain numeric constant
    }
}

-- Print the matches
for _, m in ipairs(matches) do
    print(m)
end
```
