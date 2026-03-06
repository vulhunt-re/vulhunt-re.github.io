+++
title = "Use Case: Buffer Overflow"
weight = 1
+++
This example showcases more advanced capabilities of VulHunt.

Suppose we want to find a vulnerability where the first argument of `read_argument` is passed to `strcpy`:

```c
#define BUFFER_SIZE 256

void read_argument(char *input) {
  char buffer[BUFFER_SIZE];

  strcpy(buffer, input);
  printf("You entered: %s\n", buffer);
}
```

This rule uses VulHunt's dataflow capabilities to check for this condition:

```lua
author = "Binarly"
name = "Tracking dataflow from read_argument to strcpy"
platform = "posix-binary"
architecture = "*:*:*"
conditions = {name_with_prefix = "program"}

scopes = scope:calls{
    to = "strcpy",
    where = caller:named "read_argument",
    using = {parameters = {var:named "input"}},
    with = check
}

function check(project, context)
    local var = context.inputs[2]

    if var and var.annotation == "input" then
        return result:high{
            name = "BoF in program",
            description = "A buffer overflow in read_argument",
            evidence = {
                functions = {
                    [context.caller.address] = {
                        annotate:at{
                            location = context.caller.call_address,
                            message = "The first argument of read_argument is passed to strcpy, leading to a buffer overflow!"
                        }
                    }
                }
            }
        }
    end
end
```

Here, `scope:calls` searches for calls to `strcpy` within the function `read_argument` and associates the annotation `input` with the first argument of `read_argument`.

When the call site to `strcpy` within `read_argument` is found, the `check` function is executed with a context representing this call site.

The `check` function then verifies whether the annotation of the second argument passed to `strcpy` is `input`, confirming the presence of the vulnerability.

We then use the `result:high` method to build a `Result` object out of a table and return it. The table the following required fields:

- `name` usually contains a vulnerability identifier
- `description`
- `evidence`, which is another table.

The `evidence` table contains a single field called `functions`, which is a map (technically it's also a table in Lua) containing addresses of functions to annotate.

To annotate within the `read_argument` function, we use `context.caller.address` as a key and a single annotation at `context.caller.call_address`, meaning at the call to `strcpy`.

### Detecting the patch

Now, let's assume this vulnerability was patched and we want to verify if the patch was correctly applied:

```c
#define BUFFER_SIZE 256

void read_argument(char *input) {
  char buffer[BUFFER_SIZE];

  if (strlen(input) > BUFFER_SIZE) {
    printf("Input is too long\n");
    exit(1);
  }

  strcpy(buffer, input);
  printf("You entered: %s\n", buffer);
}
```

We can check for the patch by adding a condition to the scope definition to filter out functions that call `strlen`:

```lua
...
scopes = scope:calls{
    to = "strcpy",
    where = caller:named "read_argument" and not caller:has_call "strlen",
    using = {parameters = {var:named "input"}},
    with = check
}
...
```

Alternatively, we can use `scope:functions` to find the `read_argument` function and check whether it calls `strlen`:

```lua
...
scopes = scope:functions{target = "read_argument", with = check}

function check(project, context)
    if context:has_call("strlen") then
        print("Patch correctly applied: read_argument calls strlen")
    end
end
```

### Increasing patch detection accuracy

The rule above is useful to understand the capabilities of the dataflow engine, but to more accurate, we have to make sure the value returned from `strlen` is actually being checked by the `if` statement and that the call to `strcpy` is within this `if` block. We can achieve this by using the decompiler extension with the following rule:

```lua
author = "Binarly"
name = "Tracking dataflow from read_argument to strcpy"
platform = "posix-binary"
architecture = "*:*:*"
conditions = {name_with_prefix = "program"}
extensions = "decompiler"

scopes = scope:calls{
    to = "strcpy",
    where = caller:named "read_argument",
    using = {parameters = {var:named "input"}},
    with = check
}

function check(project, context)
    local decomp = project:decompile(context.caller.address) -- decompile read_argument

    -- use weggli to find the buffer length check followed by the call to `strcpy`
    local matches = decomp:query{
        query = [[
            $var = strlen($param);
            if ($var < _) {
                strcpy(_, $param);
            }
        ]]
    }

    local addr_check = matches:address_of_match(2) -- `if ($var < _) {`
    local addr_strcpy = matches:address_of_match(3) -- `strcpy(_, $param);`

    if addr_check and addr_strcpy then
        return result:patch{
            name = "Buffer overflow in program",
            description = "The program has a patched stack-based buffer overflow in `read_argument` function",
            evidence = {
                functions = {
                    [context.caller.address] = {
                        annotate:at{
                            location = addr_check,
                            message = "The length of the first argument of read_argument is checked against the buffer size..."
                        }, annotate:at{
                            location = addr_strcpy,
                            message = "...which effectively prevents the buffer overflow in this call to strcpy"
                        }
                    }
                }
            }
        }
    end

    local var = context.inputs[2]

    if var and var.annotation == "input" then
        return result:high{
            name = "Buffer overflow in program",
            description = "The program contains a stack-based buffer overflow in `read_argument` function",
            evidence = {
                functions = {
                    [context.caller.address] = {
                        annotate:at{
                            location = context.caller.call_address,
                            message = "The first argument of read_argument is passed to strcpy, leading to a buffer overflow!"
                        }
                    }
                }
            }
        }
    end
end
```
