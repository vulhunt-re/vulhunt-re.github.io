+++
title = "Introduction"
weight = 1
+++
VulHunt is a unified platform for vulnerability detection, malware analysis, and more -- working from a single source of truth across multiple representations including disassembly, intermediate representation (IR), and decompiled code.

It allows writing high-level [Lua](https://www.lua.org) rules that match against low-level semantic information extracted from binaries. These rules can detect known and unknown vulnerabilities, patches, malicious code, and other software properties in targets such as POSIX executables and UEFI modules.

VulHunt also exposes its analysis capabilities through an [MCP server](/docs/user-guide/vulhunt-cli/options/mcp), giving LLMs flexible access to the full analysis engine. To guide LLMs through common workflows, VulHunt ships a set of [Claude Skills](https://github.com/vulhunt-re/skills) -- structured instructions that teach an agent how to use VulHunt's MCP tools for specific tasks.

## Quick start

To follow along, install VulHunt:

### Linux and macOS

```bash
curl --proto '=https' --tlsv1.2 -sSfL https://sh.vulhunt.re | sh
```

### Windows

```bash
irm https://ps.vulhunt.re | iex
```

For full installation options consult the [installation guide](/docs/user-guide/vulhunt-cli/installation).

## Quick usage

VulHunt supports two primary usage modes:

### Scan mode

Run VulHunt rules against binaries:

```bash
vulhunt-ce scan --data /path/to/data --rules /path/to/rules --pretty --output output.json <binary>
```

### MCP mode

Use VulHunt as an MCP server:

```bash
vulhunt-ce mcp --data /path/to/data
```

<Note>
  The `--data` flag is only required when VulHunt's data files are not in the
  default location. If you installed via the standard installer, you can omit
  it.
</Note>

## A first look at rules

VulHunt rules are Lua scripts that define rule metadata and detection. Let's see an example rule to detect binaries affected by CVE-2024-6387 (also known as **regreSSHion**). A simplified<sup>1</sup> way to detect this vulnerability in `sshd` binaries is by checking whether `syslogv` is called from `sshsigdie`:

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

The rule above works fine, but VulHunt packs way more power. The rest of this guide presents its key concepts, showing how to hunt down interesting code in binaries.

<br />
<sup>1</sup>&nbsp;
<font size="2">
  This function call is actually fine if the caller is not registered as a
  signal handler, but this example ignores that for the sake of simplicity.
</font>
