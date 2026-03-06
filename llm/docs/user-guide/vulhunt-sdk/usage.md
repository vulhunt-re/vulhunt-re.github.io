+++
title = "Usage"
weight = 4
+++
When writing rules, it's helpful to test pieces interactively. For example, remember the rule shown at the introduction:

```lua
author = "Binarly"
name = "CVE-2024-6387"
platform = "posix-binary"
architecture = "*:*:*"
scopes = {
    scope:functions{
        named = "sshsigdie",
        with = function(project, context)
            if context:has_call("sshlogv") then
                print("This binary is vulnerable to CVE-2024-6387 (regreSSHion)!")
            end
        end
    }
}
```

Before writing this rule, an analyst first verifies that the target binary contains a function named `sshsigdie`. A VulHunt client makes that verification and inspection quick and interactive. For example, in a client you can run:

```
%load /path/to/binary/sshd
%functions sshsigdie
```

The client prints a JSON-like map of addresses to function names. For example:

```json
{
  "0x5520c": "sshsigdie"
}
```

Now that you know the binary contains `sshsigdie` and it's recognized by the VulHunt engine, you can inspect the function interactively and check whether it calls `sshlogv`:

```lua
f = project:functions("sshsigdie")
f:has_call("sshlogv")
-- returns true
```

The snippet above is pure Lua; the same API you use inside rules. That means you can prototype rule logic interactively in the client. Once validated interactively, the same code can be adapted into a `.vh` rule.

Now you'd be ready to write the rule, but before going deeper into all features a VulHunt client has, let's first take a look at the rule-writing workflow.

## Rule-writing workflow

In theory, you can write a rule in any text editor, save a `.vh` file, and feed it to the VulHunt CLI tool, but iteratively testing and validating pieces of logic saves time. We recommend using the Jupyter kernel provided with the VulHunt SDK (Enterprise customers only). With this kernel you can use any Jupyter client to verify parts of a rule as you develop them. The following diagram shows how these components relate to each other:

```
    +------------+             +-----------+
    | JupyterLab | ----------> |           |
    +------------+             |           |
                               |           |         +---------+
+--------------------+         |  Jupyter  | ------> | VulHunt |
| Visual Studio Code | ------> |  Kernel   |         | Engine  |
+--------------------+         |           |         +---------+
                               |           |
  +---------------+            |           |
  | VulHunt Shell | ---------> |           |
  +---------------+            +-----------+
```

Next, we'll cover the specific commands available in VulHunt clients.
