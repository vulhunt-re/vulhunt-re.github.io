+++
title = "Functions Scope"
weight = 2
+++
The `scope:functions` scope is used to target specific functions within the binary under analysis.
It enables writing rules that match individual functions and access their semantic information.

The first parameter of `scope:functions` is `target`, which allows specifying the target function(s) using a `string` (function name), an [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address) or a [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) object for pattern matching (note: the `all` field is not allowed in this context, as each match is processed individually).
The `with` argument accepts a _check_ function that takes a [`ProjectHandle`](/docs/vulhunt-reference/types/project-handle) as its first parameter and a [`FunctionContext`](/docs/vulhunt-reference/types/function-context) as its second.
The [`FunctionContext`](/docs/vulhunt-reference/types/function-context) provides access to details of the matched function, including its name, address, called functions, and pattern matching utilities.

### Example

```lua
-- Target function by name
scopes = scope:functions{
    target = "target_function",
    with = check
}

-- Target function by pattern matching (symbol regex)
scopes = scope:functions{
    target = {matching = "ssh_scp_", kind = "symbol"},
    with = check
}

-- Target function by byte pattern
scopes = scope:functions{
    target = {matching = "415455534881EC2004000064488B04", kind = "bytes"},
    with = check
}

function check(project, context)
    -- Access the function name and address
    local name = context.name
    local addr = context.address

    -- Check if function calls "strlen"
    local found = context:has_call("strlen")

    -- List of addresses calling "strlen"
    local calls = context:calls("strlen")

    -- Check calls with jumps_as_calls option
    local imp_calls = context:calls({matching = "ssh_scp_", kind = "symbol", jumps_as_calls = true})

    -- Check if the function matches the provided pattern
    local pattern = PatternMatcher.new("55 .. 89 E5 48")
    local matches = context:matches(pattern)

    -- Return the address where the pattern starts
    local pattern = PatternMatcher.new("55 .. 89 E5 48")
    local found_addr = context:find(pattern)
end
```
