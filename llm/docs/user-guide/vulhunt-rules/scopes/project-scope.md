+++
title = "Project Scope"
weight = 1
+++
The `scope:project` gives visibility over the entire binary under analysis.
This scope is used to write rules that are not tied to a specific function, but rather to the entire binary.
It is also useful when debugging symbols are not present, enabling searches for specific code and data patterns in stripped binaries.

The `scope:project` expects in its `with` argument a _check_ function that takes a [`ProjectHandle`](/docs/vulhunt-reference/types/project-handle) as its parameter.
The [`ProjectHandle`](/docs/vulhunt-reference/types/project-handle) provides access to various project-level capabilities, such as enumerating recovered functions, searching for byte or string patterns, and decompiling functions by name or address.

### Example

```lua
scopes = scope:project{with = check}

function check(project)
    -- Returns the decompiled pseudocode of "target_function"
    local str = project:decompile("target_function")

    -- Decompile function at specific address
    local str2 = project:decompile(AddressValue.new(0x401000))

    -- Search for functions by pattern (bytes or symbol regex)
    local func = project:functions({matching = "ssh_scp_", kind = "symbol"})
    local func2 = project:functions({matching = "415455534881EC2004000064488B04", kind = "bytes"})

    -- Get all matching functions with all=true flag
    local funcs = project:functions({matching = "ssh_scp_", kind = "symbol", all = true})

    -- Various search functions
    local found_bytes = project:search_bytes("AABBCCDD")
    local found_string = project:search_string("string")

    -- Filter functions with a predicate
    local function has_vulnerable_call(f)
        return f:has_call("vulnerable_func")
    end
    local filtered = project:functions_where(has_vulnerable_call)
end
```
