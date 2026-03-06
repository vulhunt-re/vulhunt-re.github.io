+++
title = "SyntaxMatchResult"
weight = 22
+++
The `SyntaxMatchResult` object represents the result of running a syntax (Weggli-compatible) query on a decompiled function.
It provides methods to inspect and extract information from the matched code.

### Methods

| Method             | Description                                             | Parameters                                    | Return Type                                              |
| :----------------- | :------------------------------------------------------ | :-------------------------------------------- | :------------------------------------------------------- |
| `dump`             | Returns a table of matched code snippets                | —                                             | `string[]`                                               |
| `dump_ranges`      | Returns a table of matched code snippets for each range | —                                             | `string[]`                                               |
| `binding_of_match` | Returns the binding of a matched variable               | `string` or `{var: string, result: number}`   | `string`                                                 |
| `address_of_match` | Returns the address of a match                          | `number` or `{match: number, result: number}` | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |

### Reference

#### dump

Returns the matched code as a table of strings, one per query result.

#### dump_ranges

Returns a table of strings, each representing a matched code snippet for a specific range.

#### binding_of_match

Returns the binding (variable mapping) of a matched variable as a string.
Accepts either a variable name (e.g., `"$var"`), which returns the binding from the first result,
or a table `{var = "$var", result = n}` to specify both the variable name and the result index.

<Note>The `result` index is 1-based.</Note>

#### address_of_match

Returns the address of a match as an [`AddressValue`](/docs/vulhunt-reference/types/address-value).
Accepts either a match index, which returns the address from the first result,
or a table `{match = n, result = m}` to specify both the match index and the result index.

<Note>Both `match` and `result` indices are 1-based.</Note>

### Example

```lua
-- Decompile by function name
decomp = project:decompile("target_function")

-- Decompile by address
decomp = project:decompile(context.address)

local result = decomp:query("if ( $var > _ ) { }")

-- Using the short form (queries the first result)
print("First match binding:", result:binding_of_match("$var"))
print("First match address:", result:address_of_match(1))

-- Using the table form (specifying a particular result)
print("Second result binding:", result:binding_of_match({var = "$var", result = 2}))
print("Second result address:", result:address_of_match({match = 1, result = 2}))
```
