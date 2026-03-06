+++
title = "FunctionContext"
weight = 9
+++
The `FunctionContext` object provides access to information and utilities related to a specific function in the binary.
It is used in VulHunt rules to inspect function properties, search for patterns, and analyze function calls.

### Fields

| Field         | Description                                                                         | Type                                                     |
| :------------ | :---------------------------------------------------------------------------------- | :------------------------------------------------------- |
| `name`        | Function name                                                                       | `string`                                                 |
| `address`     | Function address                                                                    | [`AddressValue`](/docs/vulhunt-reference/types/address-value) |
| `total_bytes` | Function length in bytes, calculated as the sum of the sizes of all its code blocks | `number`                                                 |

### Methods

| Method         | Description                                                                                            | Parameters                                                                                                                       | Return Type                                                |
| :------------- | :----------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- |
| `calls`        | Returns a table of addresses for calls to the specified function(s)                                    | `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value), or [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) | [`AddressValue[]`](/docs/vulhunt-reference/types/address-value) |
| `has_call`     | Returns true if the function contains a call to the specified function(s)                              | `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value), or [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) | `boolean`                                                  |
| `named`        | Returns true if the function name matches the provided name                                            | `string`                                                                                                                         | `boolean`                                                  |
| `find`         | Searches for a pattern in the function's code                                                          | [`PatternMatcher`](/docs/vulhunt-reference/types/pattern-matcher)                                                                     | [`AddressValue`](/docs/vulhunt-reference/types/address-value)   |
| `matches`      | Returns true if the function's code matches the given pattern                                          | [`PatternMatcher`](/docs/vulhunt-reference/types/pattern-matcher)                                                                     | `boolean`                                                  |
| `blocks`       | Returns every basic block in the function as IR terms                                                  | —                                                                                                                                | [`IRTerm[]`](/docs/vulhunt-reference/types/ir-term)             |
| `prototype`    | Returns the inferred prototype for the function entry when available                                   | —                                                                                                                                | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)               |
| `is_reachable` | Returns true if execution can flow from the first address to the second address                        | ([`AddressValue`](/docs/vulhunt-reference/types/address-value), [`AddressValue`](/docs/vulhunt-reference/types/address-value))             | `boolean`                                                  |
| `dominates`    | Returns true if the first address is in a block that dominates the block containing the second address | ([`AddressValue`](/docs/vulhunt-reference/types/address-value), [`AddressValue`](/docs/vulhunt-reference/types/address-value))             | `boolean`                                                  |
| `precedes`     | Returns true if the first address can reach the second and the second does not dominate the first      | ([`AddressValue`](/docs/vulhunt-reference/types/address-value), [`AddressValue`](/docs/vulhunt-reference/types/address-value))             | `boolean`                                                  |

### Reference

#### name

The _name_ field contains the name of the function.

#### address

The _address_ field contains the address of the function in the binary.

#### total_bytes

The _total_bytes_ field returns the function length in bytes, calculated as the sum of the sizes of all its code blocks.

#### calls

The _calls_ method returns a table of addresses where the current function calls the specified function(s). Accepts a string (function name), [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), or [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) for pattern matching.

<Note>Returns an empty table when the specified function is not found.</Note>

#### has_call

The _has_call_ method returns true if the function contains a call to the specified function(s). Accepts a string (function name), [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), or [`CallsToQuery`](/docs/vulhunt-reference/types/calls-to-query) for pattern matching.

#### named

The _named_ method returns true if the function name matches the provided name.

#### find

The _find_ method searches for a pattern in the function's code and returns the address of the match, if found.

#### matches

The _matches_ method returns true if the function's code matches the given pattern.

#### blocks

The _blocks_ method returns every basic block in the function as [`IRTerm`](/docs/vulhunt-reference/types/ir-term) objects. Each item can be traversed to inspect instructions, operands, or metadata.

#### prototype

The _prototype_ method returns the inferred prototype as an [`IRTerm`](/docs/vulhunt-reference/types/ir-term) for the function entry if one is available, otherwise `nil`.

#### is_reachable

The _is_reachable_ method takes two [`AddressValue`](/docs/vulhunt-reference/types/address-value) objects and reports whether execution can flow from the first address to the second inside the current function.

#### dominates

The _dominates_ method returns true when the basic block that contains the first [`AddressValue`](/docs/vulhunt-reference/types/address-value) dominates the block that contains the second address.

#### precedes

The _precedes_ method returns true when the first address can reach the second and the second does not dominate the first, allowing you to assert ordering without full dominance math.

### Example

```lua
-- Detect a missing bounds check: target_function calls memcpy
-- but the length argument may not be validated by a prior strlen call.

scopes = scope:functions{
  named = "target_function",
  with = function(project, context)
    -- Only proceed if the function calls memcpy
    if not context:has_call("memcpy") then return end

    local memcpy_calls = context:calls("memcpy")
    local strlen_calls = context:calls("strlen")

    -- For each memcpy call site, check whether a strlen call
    -- precedes it. If not, the length may be unchecked.
    for _, memcpy_addr in ipairs(memcpy_calls) do
      local has_prior_check = false

      for _, strlen_addr in ipairs(strlen_calls) do
        if context:precedes(strlen_addr, memcpy_addr) then
          has_prior_check = true
          break
        end
      end

      if not has_prior_check then
        -- Return a finding
        return result:high{...}
      end
    end

    -- Search for a known byte pattern in the function body
    local pattern = PatternMatcher.new("55 .. 89 E5 48")
    if context:matches(pattern) then
      local match_addr = context:find(pattern)
    end

    -- Walk the basic blocks of the function
    for _, block in ipairs(context:blocks()) do
      -- Each block is an IRTerm that can be inspected further
    end
  end
}
```
