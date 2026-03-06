+++
title = "RegexMatcher"
weight = 20
+++
The `RegexMatcher` object is used to define and match regular expressions against text strings, typically for identifying patterns in decompiled code or function names.

### Functions

| Function | Description                                                             | Parameters | Return Type                                              |
| :------- | :---------------------------------------------------------------------- | :--------- | :------------------------------------------------------- |
| `new`    | Constructs a new regex matcher from a regular expression pattern string | `string`   | [`RegexMatcher`](/docs/vulhunt-reference/types/regex-matcher) |

### Methods

| Method     | Description                                                                                          | Parameters         | Return Type |
| :--------- | :--------------------------------------------------------------------------------------------------- | :----------------- | :---------- |
| `is_match` | Returns true if the regex matches the given text. Optional second parameter specifies start position | `string`, `number` | `boolean`   |

### Reference

#### new

Constructs a new regex matcher from a regular expression string.

The regex syntax follows Rust's regex crate, which supports standard Perl-style regular expressions.

#### is_match

Returns `true` if the regex matches the given text string, `false` otherwise.

Optionally takes a second parameter specifying the starting position to begin matching from. If not provided, matching starts from the beginning of the string.

### Example

```lua
local regex = RegexMatcher.new("strcpy|strcat|sprintf")
if regex:is_match(function_name) then
  -- Function name matches the pattern
end

-- Check if text matches starting from position 5
if regex:is_match(text, 5) then
  -- Pattern matches from position 5 onwards
end
```
