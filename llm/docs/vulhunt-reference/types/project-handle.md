+++
title = "ProjectHandle"
weight = 19
+++
The `ProjectHandle` object provides access to several project-level methods in VulHunt rules.
It allows to enumerate functions, search for patterns, decompile code, and more.

### Fields

| Field          | Type     | Description                         |
| :------------- | :------- | :---------------------------------- |
| `architecture` | `string` | Architecture of the analyzed binary |

### Methods

| Method             | Description                                                                                      | Parameters                                                                                                                              | Return Type                                                                                                                                    |
| :----------------- | :----------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `size_of`          | Returns the size of the given type                                                               | `string`                                                                                                                                | `number`                                                                                                                                       |
| `lookup_prototype` | Returns the function prototype for the given name                                                | `string`                                                                                                                                | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                                                                                                   |
| `lookup_type`      | Returns the type definition for the given name                                                   | `string`                                                                                                                                | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                                                                                                   |
| `register_name`    | Returns the register name for a variable term                                                    | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                                                                                            | `string`                                                                                                                                       |
| `resolve_type`     | Expands a type term, resolving aliases                                                           | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                                                                                            | [`IRTerm`](/docs/vulhunt-reference/types/ir-term)                                                                                                   |
| `decompile`        | Decompiles one or more functions                                                                 | `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value), or [`FunctionQuery`](/docs/vulhunt-reference/types/function-query)       | [`DecompiledFunction`](/docs/vulhunt-reference/types/decompiled-function) or [`DecompiledFunction[]`](/docs/vulhunt-reference/types/decompiled-function) |
| `functions`        | Returns one or more functions                                                                    | `string`, [`AddressValue`](/docs/vulhunt-reference/types/address-value), [`FunctionQuery`](/docs/vulhunt-reference/types/function-query), or none | [`FunctionContext`](/docs/vulhunt-reference/types/function-context) or [`FunctionContext[]`](/docs/vulhunt-reference/types/function-context)             |
| `functions_where`  | Returns a table of functions matching the given predicate function                               | `fun(context: FunctionContext)`                                                                                                         | [`FunctionContext[]`](/docs/vulhunt-reference/types/function-context)                                                                               |
| `calls_matching`   | Returns the table of calls matching the predicates                                               | [`CallsMatchingParam`](/docs/vulhunt-reference/types/calls-matching-param)                                                                   | [`CallsMatchingTable[]`](/docs/vulhunt-reference/types/calls-matching-table)                                                                        |
| `search_bytes`     | Returns true if the set of bytes is found in the binary, false otherwise                         | `string`                                                                                                                                | `boolean`                                                                                                                                      |
| `search_string`    | Returns true if the string is found in the binary, false otherwise                               | [`string`, `string` (Kind)]                                                                                                             | `boolean`                                                                                                                                      |
| `search_code`      | Returns a [`SearchCodeResult`](/docs/vulhunt-reference/types/search-code-result) if the code is found | [`string`, `string` (Location)]                                                                                                         | [`SearchCodeResult`](/docs/vulhunt-reference/types/search-code-result)                                                                              |
| `search_guid`      | Returns true if the GUID is found, false otherwise                                               | [`string` (UUID), `string` (Name)]                                                                                                      | `boolean`                                                                                                                                      |
| `search_nvram`     | Returns true if the NVRAM variable is found, false otherwise                                     | [`string` (Service), `string` (Name), `string` (UUID)]                                                                                  | `boolean`                                                                                                                                      |
| `search_ppi`       | Returns true if the PPI is found, false otherwise                                                | [`string` (Service), `string` (Name), `string` (UUID)]                                                                                  | `boolean`                                                                                                                                      |
| `search_protocol`  | Returns true if the Protocol is found, false otherwise                                           | [`string` (Service), `string` (Name), `string` (UUID)]                                                                                  | `boolean`                                                                                                                                      |

### Reference

#### architecture

The _architecture_ field contains the architecture of the analyzed binary in the triplet format (e.g., `"AARCH64:LE:64"`, `"X86:LE:64"`).

#### size_of

Returns the size in bytes of the given type name.

#### lookup_prototype

Looks up a function prototype by name in the type database.

#### lookup_type

Looks up a type by name in the type database.

#### register_name

Returns the architecture register name for a variable that refers to a register. Accepts an [`IRTerm`](/docs/vulhunt-reference/types/ir-term) with kind `VAR`. Returns `nil` if the variable is not a register.

#### resolve_type

Expands a type term by resolving aliases and typedefs.

#### decompile

Decompiles one or more functions based on a string (function name), [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), or [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) object.
Returns [`DecompiledFunction`](/docs/vulhunt-reference/types/decompiled-function) or [`DecompiledFunction[]`](/docs/vulhunt-reference/types/decompiled-function) when using [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) with `all=true`.

<Note>
  `decompile` requires enabling the decompiler feature via the extension API.
</Note>

#### functions

Returns one or more functions based on a string (function name), [`AddressValue`](/docs/vulhunt-reference/types/address-value) (function address), [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) object, or no input to return all functions.
Returns [`FunctionContext`](/docs/vulhunt-reference/types/function-context) or [`FunctionContext[]`](/docs/vulhunt-reference/types/function-context) when using [`FunctionQuery`](/docs/vulhunt-reference/types/function-query) with `all=true`.

#### functions_where

Returns [`FunctionContext[]`](/docs/vulhunt-reference/types/function-context) based on the Lua function given as predicate.

#### calls_matching

Returns a table of calls matching the provided predicates.

#### search_bytes

Returns `true` if the specified byte sequence is found in the binary, `false` otherwise. Takes a hex pattern string as argument.

#### search_string

Returns `true` if the specified string is found in the binary, `false` otherwise. Takes a string value and an optional encoding kind as arguments.
The `kind` parameter specifies the string encoding, valid values are:

- `ascii`
- `utf8`
- `utf16`
- `utf16-le`
- `utf16le`
- `utf16-be`
- `utf16be`

#### search_code

Returns a [`SearchCodeResult`](/docs/vulhunt-reference/types/search-code-result) if the specified code is found in the binary. Takes a hex pattern string and an optional location string as arguments. The `loc` parameter is only available on UEFI platforms; valid values are:

- `sw_smi_handlers`
- `child_sw_smi_handlers`

#### search_guid

Returns `true` if the binary references the specified GUID, `false` otherwise. Takes the GUID and its symbolic name as arguments. (UEFI only)

#### search_nvram

Returns `true` if the binary accesses the specified NVRAM variable, `false` otherwise. Takes the runtime service used to access it (e.g., `GetVariable`, `SetVariable`), the variable name, and the vendor GUID as arguments. (UEFI only)

#### search_ppi

Returns `true` if the binary uses the specified PPI (PEIM-to-PEIM Interface), `false` otherwise. Takes the PEI service used to locate it (e.g., `LocatePpi`), the PPI name, and its GUID as arguments. (UEFI only)

#### search_protocol

Returns `true` if the binary uses the specified UEFI protocol, `false` otherwise. Takes the boot service used to locate it (e.g., `LocateProtocol`, `HandleProtocol`), the protocol name, and its GUID as arguments. (UEFI only)

### Example

```lua
scopes = scope:project{
  with = function(project)
    -- Get a single function by name
    local func = project:functions("main")
    if func then
      print("Function:", func.name, "at address", func.address)
    end

    -- Get all functions matching a pattern
    local ssh_funcs = project:functions({matching = "^ssh_", kind = "symbol", all = true})
    for _, func in ipairs(ssh_funcs) do
      print("Function:", func.name)
    end

    -- Search for a specific string in the binary
    if project:search_string("vulnerable", "ascii") then
      print("The string 'vulnerable' was found in the binary.")
    end

    -- Decompile a function by name (requires decompiler extension)
    local decompiled = project:decompile("main")
    if decompiled then
      print("Decompiled pseudocode for 'main':\n", decompiled)
    end

    -- Decompile by address
    local decompiled = project:decompile(AddressValue.new(0x401000))

    -- Decompile all functions matching a byte pattern
    local decompiled = project:decompile({
      matching = "415455534881EC2004000064488B04",
      kind = "bytes",
      all = true
    })

    -- Filter functions with a predicate
    local function has_malloc_call(f)
      return f:has_call("malloc")
    end
    local filtered = project:functions_where(has_malloc_call)
  end
}
```

The following example shows UEFI-specific search methods available on the `ProjectHandle`:

```lua
scopes = scope:project{
  with = function(project)
    -- Search for a protocol GUID
    if project:search_guid("5B1B31A1-9562-11D2-8E3F-00A0C969723B", "EFI_LOADED_IMAGE_PROTOCOL_GUID") then
      print("EFI_LOADED_IMAGE_PROTOCOL_GUID found")
    end

    -- Search for an NVRAM variable
    if project:search_nvram("GetVariable", "PlatformLang", "8BE4DF61-93CA-11D2-AA0D-00E098032B8C") then
      print("PlatformLang NVRAM variable found")
    end

    -- Search for a protocol
    if project:search_protocol("LocateProtocol", "PCD_PROTOCOL_GUID", "11B34006-D85B-4D0A-A290-D5A571310EF7") then
      print("PCD_PROTOCOL_GUID found")
    end
  end
}
```
