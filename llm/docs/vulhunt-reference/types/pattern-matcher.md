+++
title = "PatternMatcher"
weight = 18
+++
The `PatternMatcher` object is used to define and match patterns in binary code, typically for identifying instruction sequences.

### Functions

| Function | Description                                                                                                                                                                | Parameters | Return Type                                                  |
| :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------- | :----------------------------------------------------------- |
| `new`    | Constructs a new pattern matcher. The pattern consists of instruction bytes separated by spaces. A dot (`.`) may be used as a wildcard representing any nibble (half-byte) | `string`   | [`PatternMatcher`](/docs/vulhunt-reference/types/pattern-matcher) |

### Reference

#### new

Constructs a new pattern matcher from a pattern string.
Patterns are whitespace-separated tokens where each token is either:

- Two hexadecimal characters (`AA`, `A.`, `.A`, `..`). `.` wildcards a nibble,
  so `..` matches any byte, `.F` matches any low nibble ending in `F`, etc.
- An 8-bit binary literal (`0101.1..`). `.` wildcards a single bit, allowing
  sub-byte precision.

Hex and binary tokens can be mixed inside the same pattern.

### Example

```lua
local pattern = PatternMatcher.new("41 88 1. 0100.1..")
local matches = context:matches(pattern)
```
