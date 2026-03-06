+++
title = "Rule Fields"
weight = 1
+++
| Field          | Description                                                                                        | Required |
| :------------- | :------------------------------------------------------------------------------------------------- | :------: |
| `author`       | The author of the rule                                                                             |   Yes    |
| `name`         | The name of the rule                                                                               |   Yes    |
| `platform`     | Defines the target platform, i.e., posix or uefi                                                   |   Yes    |
| `architecture` | The architectures supported by the rule. This will only be executed on the supported architectures |   Yes    |
| `conditions`   | Defines the conditions under which the rule is executed or not                                     |    No    |
| `types`        | Defines the type library used to apply the types                                                   |    No    |
| `signatures`   | Defines the file containing the signatures to identify function without symbols                    |    No    |
| `extensions`   | Allows to specify the extensions, such as the use of the decompiler                                |    No    |
| `scopes`       | Defines the list of scopes                                                                         |   Yes    |

### Reference

#### Author

The _author_ field specifies the creator of the rule.

#### Name

The _name_ field contains a user-defined name for the rule.

#### Platform

The _platform_ field specifies which platform should be used to evaluate the rule.

Valid values are:

- `posix-binary`
- `efi-module`
- `efi-standalone`

Use `efi-module` when the target is an EFI module extracted from a firmware image (e.g., DXE or PEI drivers), and `efi-standalone` when analyzing a standalone EFI binary individually (such as `.efi` binaries).

#### Architecture

The _architecture_ field contains the `processor:endian:bits` triplet defining the architecture where the rule should be evaluated.
It accepts either a single string or a table of strings to target multiple architectures.

Valid values are:

- For _processor_: `X86`, `ARM`, `AARCH64`, or `*` for all
- For _endian_: `LE`, `BE`, or `*` for all
- For _bits_: `32`, `64`, or `*` for all

For example:

```lua
-- Single architecture
architecture = "X86:LE:64"

-- Multiple architectures
architecture = {"X86:LE:64", "AARCH64:LE:64"}
```

#### Conditions

The _conditions_ field specifies the circumstances under which the rule is executed.
It is represented as a table that may include a `name` or `name_with_prefix` filter, `platform`-specific constraints (such as `volume_guids`), and optional `validate` predicates.

For example:

```lua
conditions = {
  name_with_prefix = {"libssl.so", "libssl.so."},
  validate = validate:all{
    -- Confirm expected library and a target version string
    validate:contains{pattern = "OpenSSL", kind = "ascii"},
    validate:contains{pattern = "1.1.1", kind = "ascii"},
    -- Exclude debug builds
    validate:not_( validate:contains{pattern = "DEBUG", kind = "ascii"} )
  }
}
```

When `platform = "posix-binary"`, the _conditions_ field contains the name of the binaries that should be tested.
The `name_with_prefix` field accepts either a single prefix or a table of prefixes:

```lua
conditions = {
  name_with_prefix = {"libcurl.so", "libcurl-gnutls"}
}
```

When `platform = "efi-module"`, the _conditions_ field can also contain the GUID of the EFI volume that should be tested:

```lua
conditions = {
  platform = {volume_guids = {"FDFF263D-5F68-4591-87BA-B768F445A9AF"}}
}
```

The _conditions_ can also be used to match by an exact `name`.
The `name` field accepts either a single name or a table of names.
On POSIX, `name` is compared against the component name and its linked path; on UEFI, it is compared against the module name.

```lua
-- POSIX example (single name)
conditions = { name = "libssl.so.1.1" }

-- POSIX example (list of names)
conditions = { name = {"libssl.so.1.1", "libssl.so.3"} }

-- UEFI example
conditions = { name = "Tcg2Dxe" }
```

Validators are included in the _conditions_ using the `validate` field and are used to perform binary-level checks before the rule runs.
Validators support logical composition and byte/text/regex checks over the analyzed binary file.

- Supported logical operators: `validate:all{...}`, `validate:any{...}`, `validate:not_(...)`
- Supported predicate: `validate:contains{...}` with fields:
  - `pattern` (required). The string or byte pattern to search for.
  - `where`. Valid values:
    - `validate.anywhere` (default)
    - `validate:at(n)`
    - `validate:from(n)`
  - `kind`. Valid values:
    - `bytes` or `raw` (default)
    - `ascii`
    - `utf-8` or `utf8`
    - `utf16-le`, `utf16le`, or `utf16`
    - `utf16-be` or `utf16be`
    - `regex`

How `where` works:

- `validate.anywhere` (default): searches the entire binary for the pattern.
- `validate:at(n)`: anchors the match at byte offset `n`.
- `validate:from(n)`: searches from byte offset `n` to the end.

Examples:

```lua
-- Simple string search anywhere in the binary
validate = validate:contains{pattern = "OpenSSL 1.1.1", kind = "ascii"}

-- Binary pattern with wildcards (".." matches any byte)
validate = validate:contains("e8 .. .. .. .. 48 8b 3d")

-- ASCII string match anchored at a specific offset
validate = validate:contains{pattern = "MZ", where = validate:at(0), kind = "ascii"}

-- Regex match only after the first 0x1000 bytes
validate = validate:contains{pattern = "libcurl\\.so\\.[0-9]+", where = validate:from(0x1000), kind = "regex"}

-- Require all predicates to be true
validate = validate:all{
  validate:contains{pattern = "HTTP/1.1", kind = "ascii"},
  validate:contains{pattern = "curl", kind = "ascii"}
}

-- Any predicate is sufficient
validate = validate:any{
  validate:contains{pattern = "wolfSSL", kind = "ascii"},
  validate:contains{pattern = "OpenSSL", kind = "ascii"}
}

-- Negation
validate = validate:not_( validate:contains{pattern = "DEBUG", kind = "ascii"} )
```

#### Types

The _types_ field specifies the location of the type library that should be loaded by the analysis engine.
For example:

```lua
types="project/v1.2.3/library"
```

#### Signatures

The _signatures_ field specifies the signatures library that can be used by the analysis engine to match functions in stripped binaries.
The field contains one or more signature entries. Each entry can be a _version_, a _range_, or a _file location_.

Valid examples of _version_ entries:

```lua
signatures = {project = "project"}
signatures = {project = "project", version = "1.2.3"}
```

Valid examples of _range_ entries:

```lua
signatures = {project = "project", to = "2.0.0"}
signatures = {project = "project", from = "1.2.3"}
signatures = {project = "project", from = "1.2.3", to = "2.0.0"}
```

Valid examples of _file location_ entries:

```lua
signatures = {"project/v1.5.0/project-AARCH64-LE-64"}
```

For maximum flexibility, entries can also be combined:

```lua
signatures = {
    {project = "project", version = "1.5.0"},
    {"project/v1.5.0/project-AARCH64-LE-64"}
}
```

#### Extensions

The _extensions_ field contains any extensions required by this rule and that should be enabled by the engine.
It accepts either a single string or a table of strings.
For now, the only valid value is `decompiler`, which should be used when writing scopes that run syntax (Weggli-style) queries.

#### Scopes

The _scopes_ field contains a list of scopes that are matched and executed by the engine. Currently, VulHunt supports three scopes: `scope:project`, `scope:functions`, and `scope:calls` which are introduced in more detail in their respective sections.
