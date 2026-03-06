+++
title = "FunctionQuery"
weight = 10
+++
The `FunctionQuery` object provides advanced pattern matching capabilities for querying functions in VulHunt rules. It enables regex-based symbol matching and byte pattern matching.

### Fields

| Field      | Type      | Description                                                                                     |
| :--------- | :-------- | :---------------------------------------------------------------------------------------------- |
| `kind`     | `string`  | Pattern type: `"symbol"` for regex on function names, or `"bytes"` for hex byte pattern         |
| `matching` | `string`  | Pattern to match                                                                                |
| `all`      | `boolean` | Optional field. When true, returns all matches; when false or omitted, returns first match only |

### Reference

#### kind

The _kind_ field specifies the type of pattern matching:

- `"symbol"`: Matches function names using regular expressions. This is the default value.
- `"bytes"`: Matches functions containing the specified byte sequence.

#### matching

The _matching_ field specifies the pattern to match. The interpretation depends on the `kind` field:

- For `kind = "symbol"`: A regular expression pattern to match against function names.
- For `kind = "bytes"`: A hexadecimal byte sequence to find in function code.

#### all

The _all_ field is a boolean flag that controls result quantity:

- `false`: Returns only the first match. This is the default value.
- `true`: Returns all matching functions.

### Example

```lua
-- Pattern matching with symbol regex
scopes = scope:project{
  with = function(project)
    -- Find all SSH functions using FunctionQuery
    local ssh_funcs = project:functions({
      matching = "^ssh_",
      kind = "symbol",
      all = true
    })

    for _, f in ipairs(ssh_funcs) do
      print("Found function:", f.name)
    end

    -- Find functions by byte pattern
    local funcs = project:functions({
      matching = "415455534881EC2004000064488B04",
      kind = "bytes",
      all = true
    })

    -- Decompile with pattern matching
    local decomp = project:decompile({
      matching = "process_.*",
      kind = "symbol"
    })
  end
}

-- Use FunctionQuery in scope:functions
scopes = scope:functions{
  target = {matching = "vulnerable_.*", kind = "symbol"},
  with = function(project, context)
    -- Analyze all functions matching the pattern
    print("Analyzing:", context.name)
  end
}

-- Query by byte pattern in scope:functions
scopes = scope:functions{
  target = {
    matching = "415455534881EC2004000064488B04",
    kind = "bytes"
  },
  with = function(project, context)
    -- Analyze functions containing this byte sequence
  end
}
```
