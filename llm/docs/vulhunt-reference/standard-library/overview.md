+++
title = "Overview"
weight = 1
+++
The Prelude module provides utility functions and constructors to simplify VulHunt rule development and extends the Lua standard library.
It includes helpers for scope construction, variable and result specification, annotation, CVSS scoring, pattern matching, and various utilities.

### Functions

| Function                                                | Description                                                           |
| :------------------------------------------------------ | :-------------------------------------------------------------------- |
| `scope:project`                                         | Constructs a Project scope                                            |
| `scope:functions`                                       | Constructs a Functions scope                                          |
| `scope:calls`                                           | Constructs a Calls scope                                              |
| `var:named`                                             | Creates a named variable annotation                                   |
| `result:none/info/unspecified/low/medium/high/critical` | Shorthand constructors for vulnerability results with preset severity |
| `result:patch`                                          | Constructs a Result object indicating the presence of a patch         |
| `result:malware`                                        | Constructs a Result object indicating the presence of malware         |
| `annotate:at`                                           | Annotates a specific location with a message                          |
| `annotate:prototype`                                    | Annotates a function prototype                                        |
| `annotate:assignment`                                   | Annotates an assignment to an output variable                         |
| `annotate:global`                                       | Annotates a global variable                                           |
| `annotate:variable`                                     | Annotates a variable with position, index, and declaration            |
| `annotate:range`                                        | Annotates a range of code with a message                              |
| `annotate:operand`                                      | Annotates a specific operand at a call site                           |
| `cvss:v2/v3/v3_1/v4`                                    | Constructs a CVSS score table for the specified version               |
| `container.empty`                                       | Checks if a container is empty                                        |
| `printf`                                                | Formatted print (equivalent to `print(string.format(...))`)           |
| `validate:all/any/not_`                                 | Logical operators for composing validators                            |
| `validate:contains`                                     | Checks for a pattern in the binary (bytes, ASCII, UTF, or regex)      |
| `validate:at/validate:from`                             | Location anchors for `validate:contains`                              |

### Scope functions

Scope functions define the execution context and target for VulHunt rules.

- `scope:project`: Constructs a Project scope that operates on project-level data
- `scope:functions`: Constructs a Functions scope that operates on individual functions
- `scope:calls`: Constructs a Calls scope that operates on function call sites

### Variable and result functions

These functions create variables and construct result objects for vulnerability findings.

- `var:named`: Creates a named variable annotation for tracking values
- `result:none`, `result:info`, `result:unspecified`, `result:low`, `result:medium`, `result:high`, `result:critical`: Construct vulnerability results with specified severity levels. `result:info` and `result:unspecified` are aliases for `result:none`
- `result:patch`: Constructs a result indicating a patch has been identified
- `result:malware`: Constructs a result indicating malware has been detected

### Annotation functions

Annotation functions attach explanatory information to code elements in vulnerability findings.

- `annotate:at`: Annotates a specific address or location with a message
- `annotate:prototype`: Annotates a function's prototype signature
- `annotate:assignment`: Annotates variable assignments with context
- `annotate:global`: Annotates a global variable with its declaration
- `annotate:variable`: Annotates variables with position, index, and type declaration
- `annotate:range`: Annotates a range of addresses with explanatory text
- `annotate:operand`: Annotates a specific operand at a call site with a message

### CVSS functions

CVSS functions construct standardized vulnerability scoring information.

- `cvss:v2`: Constructs a CVSS version 2.0 score table
- `cvss:v3`: Constructs a CVSS version 3.0 score table
- `cvss:v3_1`: Constructs a CVSS version 3.1 score table
- `cvss:v4`: Constructs a CVSS version 4.0 score table

### Container functions

Container functions provide utilities for working with data collections.

- `container.empty`: Checks whether a container has no elements

### Utility functions

General-purpose helpers available in all rules.

- `printf(fmt, ...)`: Formatted print, equivalent to `print(string.format(fmt, ...))`

### Validate functions

Validate functions are used inside the `conditions` field of a rule to perform binary-level checks before the rule runs. See [Rule Fields](/docs/vulhunt-reference/vulhunt-rules/rule-fields) for full usage details.

- `validate:all{...}`: All validators must pass
- `validate:any{...}`: Any validator must pass
- `validate:not_(validator)`: Negates a validator
- `validate:contains{pattern, where, kind}`: Checks for a pattern in the binary. Both `where` and `kind` are optional, defaulting to `validate.anywhere` and `bytes` respectively
- `validate:at(n)`: Anchor the match at byte offset `n`
- `validate:from(n)`: Search from byte offset `n` to the end
