+++
title = "CallsToQuery"
weight = 5
+++
The `CallsToQuery` object provides flexible options for querying function calls in VulHunt rules. It supports querying by address, function name, or pattern matching.

### Fields

| Field            | Type                                                     | Description                                                                             |
| :--------------- | :------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `address`        | [`AddressValue`](/docs/vulhunt-reference/types/address-value) | Address of the target function to find calls to                                         |
| `named`          | `string`                                                 | Name of the target function to find calls to                                            |
| `kind`           | `string`                                                 | Pattern type: `"symbol"` for regex on function names, or `"bytes"` for hex byte pattern |
| `matching`       | `string`                                                 | Pattern to match (required when using pattern matching)                                 |
| `jumps_as_calls` | `boolean`                                                | When true, treats jump instructions as function calls                                   |

### Reference

#### address

The _address_ field specifies the address of the target function to find calls to. Cannot be used together with `named` or pattern matching fields.

#### named

The _named_ field specifies the name of the target function to find calls to. Cannot be used together with `address` or pattern matching fields. Names may be specified with an optional `imp.` prefix, which is used internally to disambiguate symbols with the same name referring to an imported and local function. The imported function will have the `imp.` prefix, while the local function will not. The matching engine will take care to follow a user's intent and find all viable matches of either variant.

#### kind

The _kind_ field specifies the type of pattern matching:

- `"symbol"`: Matches function names using regular expressions. This is the default value.
- `"bytes"`: Matches functions containing the specified byte sequence.

#### matching

The _matching_ field specifies the pattern to match. The interpretation depends on the `kind` field:

- For `kind = "symbol"`: A regular expression pattern to match against function names.
- For `kind = "bytes"`: A hexadecimal byte sequence to find in function code.

#### jumps_as_calls

The _jumps_as_calls_ field is a boolean flag that treats jump instructions as function calls. This is useful for analyzing tail calls and indirect jumps.

### Example

```lua
-- Find calls by function name (simple string)
scopes = scope:functions{
  target = "process",
  with = function(project, context)
    -- Query with pattern matching
    local alloc_calls = context:calls({
      matching = ".*alloc.*",
      kind = "symbol"
    })

    -- Include jumps as calls
    local all_calls = context:calls({
      matching = "target_",
      kind = "symbol",
      jumps_as_calls = true
    })
  end
}

-- Use in scope:calls
scopes = scope:calls{
  to = {
    matching = "ssh_scp_",
    kind = "symbol",
    jumps_as_calls = true
  },
  where = ...,
  using = {...},
  with = function(project, context)
    -- Analyze calls to functions matching pattern
  end
}

-- Check for calls with byte pattern
scopes = scope:functions{
  target = "main",
  with = function(project, context)
    if context:has_call({
      matching = "FF252A9E0700",
      kind = "bytes",
      jumps_as_calls = true
    }) then
      -- Found call to function with specific byte pattern
    end
  end
}
```
