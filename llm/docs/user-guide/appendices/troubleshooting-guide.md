+++
title = "Troubleshooting Guide"
weight = 2
+++
## Function names

In some binaries, it is possible that the name of a library function used in the source code result in a different symbol name being added to the binary. This depends on many factors such as aliasing and weak symbols, but it's important to consider it when writing rules because you might find a binary that uses `memcmp`, while another sample of the same software component, even matching the same version, uses `bcmp`, which is an alias for `memcmp` in glibc. Also, decompilers might add a prefix or suffix to the symbol name when applying their own logic to identify functions. For example, an `imp.` prefix means the function is external to the binary and it is therefore imported.

To illustrate such situation, suppose you have three different samples of the same software component, where:

1. Sample A uses `memcmp`.
2. Sample B uses `bcmp`.
3. Sample C uses `bcmp`, but the decompiler shows `imp.bcmp` instead (a prefix was added).

Assume you're using `scope:project`. You could, of course, try this:

```lua
scopes = {scope:project{with = check}}

function check(project)
    local memcmp = project:functions("memcmp")

    if not memcmp then
        memcmp = project:functions("bcmp")
        if not memcmp then
            memcmp = project:functions("imp.bcmp")
            if not memcmp then
                print("memcmp not found")
                return
            end
        end
    end
end
```

The above code works, but it's a bit hard to read. Here's a smarter approach:

```lua
scopes = {scope:project{with = check}}

function check(project)
    local memcmp = project:functions({matching = "^(imp\\.)?(memcmp|bcmp)$"})

    if not memcmp then
        print("memcmp not found")
        return
    end
    print(memcmp.name)
end
```

This would match `memcmp` or `bcmp`, with or without the `imp.` prefix.

## Inlined functions

Functions are often inlined by the compiler, meaning the function call is replaced by its code. For example, consider the following code:

```c
#include <stdio.h>

void small_work() {
    puts("small work is being done");
}

void worker() {
    puts("worker is working");
    small_work();
}

int main(void) {
    worker();
}
```

Without any special compiler options or optimization, the decompiled `worker` function should be similar to this:

```c
void worker() {
  puts("worker is working");
  small_work();
  return;
}
```

If a rule contains code like the following, it will work (assuming the binary has symbols or [signatures](/docs/user-guide/vulhunt-rules/signatures) applied):

```lua
local worker = project:functions("worker")
if worker and worker:has_call("small_work") then
    print("found it!")
end
```

However, the developer or the compiler might decide to inline one or more function calls. For example, `small_work`'s code might replace its call within `worker`. If `small_work` is the function of interest, the above rule would break, as `small_work` would no longer be available:

```c
void worker(void) {
   puts("worker is working");
   puts("small work is being done");
   return;
}
```

Function inlining, when done correctly, does not change the program's semantics. It is an optimization technique commonly used by compilers to eliminate function call overhead and potentially reduce stack frame usage. You can easily detect whether a function has been inlined by using rules with logic like the following:

```lua
local f = project:functions("small_work")
if not f then
    f = project:functions("worker")
    if not f then
        return
    end
end
-- keep working with `f`
```

> One might feel tempted to use `project:functions({matching = "small_work|worker"})`, but this would introduce a bug in the rule, since the matching order is not guaranteed. This method could return the `worker` function even when `small_work` has not been inlined, which would be a bug in the rule logic.

## Arrays indexing convention

In Lua, arrays are a particular use of tables. By convention, they are 1-based.

```lua
t = {"one", "two", "three"} -- create an array (technically, a table) with three strings
print(t[1]) --> "one"
```

However, any type (except `nil`) can be used as keys, effectively creating associative arrays:

```lua
t = {}
t[-1] = "vulhunt"
t[0] = "binarly"
t["version"] = 3.0

print(t[-1])        --> "vulhunt"
print(t[0])         --> "binarly"
print(t[1])         --> nil
print(t["version"]) --> 3
```

## Table emptiness

A reference to an empty table evaluates to `true`:

```lua
t = {} -- create an empty table and store a reference to it at `t`
if t then -- `t` is a valid reference, thus evaluated as `true`
    -- code here runs
end
```

To check whether a table is empty, use the `next()` function:

```lua
t = {}
 -- `t` is a valid reference; `next(t)` returns the index of
 -- the next element, which is `nil` in this case
if next(t) then
    -- code here does NOT run
end
```

The length operator (#) is only reliable for proper sequences (1-based arrays without holes). See:

```lua
t = {"one", "two", [5]="five"} -- there's a hole between indexes 2 and 5
print(#t) --> 2

-- with associative arrays, `#` may not work as expected
t = {
    ["name"] = "binarly",
    ["product"] = "vulhunt"
}

print(#t) --> 0
```
