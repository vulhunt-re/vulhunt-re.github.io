+++
title = "Commands"
weight = 5
+++
The VulHunt clients expose a set of commands to interact with projects, components, functions, and run rules. Below is a list of available commands, their descriptions, and usage examples.

### Basic

| Command   | Description                                                                                          | Usage Example         |
| :-------- | :--------------------------------------------------------------------------------------------------- | :-------------------- |
| `%help`   | Display a help message with available commands                                                       | `%help`, `%help load` |
| `%output` | Redirect output to the specified file. If no file is provided, output is restored to standard output | `%output log.txt`     |
| `%clear`  | Clear the screen                                                                                     | `%clear`              |
| `%quit`   | Quit                                                                                                 | `%quit`               |

> The `%clear` and `%quit` commands apply only to the VulHunt Shell.

### Loading

| Command           | Description                                                 | Usage Example                                                                           |
| :---------------- | :---------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `%load`           | Load a BA2 archive or binary file for analysis              | `%load /path/to/file.ba2`                                                               |
| `%load_project`   | Load a project from the currently loaded BA2 archive        | `%load_project sha256=d627cf233957d5cd9201069202b7687f19c1af19430c8a0d1349247479714e73` |
| `%components`     | List all components in the loaded BA2 archive               | `%components`                                                                           |
| `%unload_project` | Unload the currently loaded project                         | `%unload_project`                                                                       |
| `%unload_ba2`     | Unload the currently loaded BA2 archive and associated data | `%unload_ba2`                                                                           |

### Analysis

| Command      | Description                                                                               | Usage Example                                         |
| :----------- | :---------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `%info`      | Display information about the loaded component                                            | `%info`                                               |
| `%functions` | List functions in the loaded component                                                    | `%functions`                                          |
| `%finfo`     | Display information about a specific function                                             | `%finfo function_name`                                |
| `%binfo`     | Display information about a code block, including its instructions and control-flow edges | `%binfo 0xe8e0`                                       |
| `%decompile` | Decompile a function to pseudocode by name or address                                     | `%decompile function_name` or `%decompile 0x1A2B3C4D` |

### Signatures

| Command              | Description                                             | Usage Example                             |
| :------------------- | :------------------------------------------------------ | :---------------------------------------- |
| `%list_signatures`   | List available signature files for the loaded component | `%list_signatures`                        |
| `%load_signatures`   | Load a FLIRT signature file to identify functions       | `%load_signatures /path/to/signature.sig` |
| `%unload_signatures` | Unload the currently loaded signature file              | `%unload_signatures`                      |

### Type libraries

| Command         | Description                                            | Usage Example                    |
| :-------------- | :----------------------------------------------------- | :------------------------------- |
| `%list_types`   | List available type libraries for the loaded component | `%list_types`                    |
| `%load_types`   | Load a type library to provide type information        | `%load_types /path/to/types.lib` |
| `%unload_types` | Unload the currently loaded type library               | `%unload_types`                  |

### Scanning

| Command     | Description                                           | Usage Example          |
| :---------- | :---------------------------------------------------- | :--------------------- |
| `%lint`     | Check rule(s) syntax and style                        | `%lint /path/to/rules` |
| `%triggers` | Display all components that trigger the rule          | `%triggers`            |
| `%scan`     | Run rule(s) against the loaded project or BA2 archive | `%scan /path/to/rules` |

### Vulnerability Database (VDB)

| Command         | Description                                               | Usage Example                        |
| :-------------- | :-------------------------------------------------------- | :----------------------------------- |
| `%vdb_lookup`   | Retrieve and display information about a specified CVE ID | `%vdb_lookup CVE-2025-12345`         |
| `%vdb_search`   | Search for known CVEs related to a specific product       | `%vdb_search product="libssh"`       |
| `%vdb_licenses` | Search for licenses associated with a specific product    | `%vdb_licenses product_name`         |
| `%vdb_template` | Generate a finding template based on a CVE                | `%vdb_template cve="CVE-2025-12345"` |
