+++
title = "Modules"
weight = 8
+++
VulHunt supports reusable Lua modules that can be shared across multiple rules.
Modules are standard Lua files with the `.vhm` (VulHunt Module) extension, placed in a dedicated modules directory.

### Writing a module

A module is a `.vhm` file that defines a Lua table with helper functions and returns it.
For example, a module providing x86 instruction helpers could be structured as follows:

```lua
-- modules/uefi/primitives/x86.vhm

local x86 = {}

function x86.find_call(pattern)
  for _, insn in ipairs(pattern.insns) do
    if insn.mnemonic == "CALL" then
      return insn.address
    end
  end
  return nil
end

return x86
```

### Using a module in a rule

Import a module with `require` using its path relative to the modules directory, without the `.vhm` extension:

```lua
author = "Binarly"
name = "CVE-2025-7028"
platform = "efi-module"
architecture = "X86:LE:64"
conditions = {
  platform = {volume_guids = {"bc327dbd-b982-4f55-9f79-056ad7e987c5"}}
}

scopes = {scope:project{with = check}}

function check(project)
  local pattern = project:search_code(
    "40534883ec..8b51..488b05........488bd98b49..4c8b0381c1........ff104885c00f98c28853104883c4..5bc34053"
  )
  if pattern == nil then return end

  local x86 = require "uefi/primitives/x86"

  local call = x86.find_call(pattern)
  if call == nil then return end

  -- ...
end
```
