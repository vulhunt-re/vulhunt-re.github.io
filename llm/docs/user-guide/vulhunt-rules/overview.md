+++
title = "Overview"
weight = 1
+++
VulHunt rules are written in Lua; however, you don't need to be proficient in Lua to write rules. Lua is used primarily as a container format, and the language is extended with functions that simplify rule creation.

VulHunt rules are collections of fields, as defined in the following table:

| Field          | Description                                                            | Category  | Required |
| :------------- | :--------------------------------------------------------------------- | :-------- | :------: |
| `author`       | Author of the rule                                                     | Metadata  |   Yes    |
| `name`         | Name of the rule                                                       | Metadata  |   Yes    |
| `platform`     | Target platform                                                        | Filtering |   Yes    |
| `architecture` | Triplet defining the architecture where the rule should be executed    | Filtering |   Yes    |
| `conditions`   | Conditions under which the rule should be executed                     | Filtering |    No    |
| `types`        | Type library used by the engine for matching and decompilation         | Detection |    No    |
| `signatures`   | Signature files used to identify functions in binaries without symbols | Detection |    No    |
| `extensions`   | Specifies any extension needed by this rule                            | Detection |    No    |
| `scopes`       | Defines the list of scopes used to identify a vulnerability            | Detection |   Yes    |

These rule fields can be roughly divided into three categories:

1. **Metadata**: Includes information such as the _author_ and rule _name_, providing context about the rule itself.
2. **Filtering**: Defines the conditions under which the rule should be executed, such as the target _platform_ or _architecture_.
3. **Detection**: Specifies the core logic of the rule, including _signatures_, _types_, and _scopes_ used to identify a vulnerability in a binary file.

### Example

The following example shows a sample value for each of the rule fields.

A comprehensive overview and the valid values for the fields can be found in the [VulHunt Reference](/docs/vulhunt-reference/vulhunt-rules/rule-fields/).

```lua
author = "Your Name"
name = "CVE-2025-0001"
platform = "posix-binary"
architecture = "x86:*:*"
conditions = {name_with_prefix = {"library-name.so"}}
types = "path/to/type-library"
signatures = "path/to/signature-library"
extensions = "decompiler"
scopes = {scope:functions{...}}
```
