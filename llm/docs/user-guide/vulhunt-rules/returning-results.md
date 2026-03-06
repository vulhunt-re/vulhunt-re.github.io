+++
title = "Returning Results"
weight = 4
+++
When a check function identifies a vulnerability, a patch, or a malware indicator, it reports the finding by returning a `Result` object.
A result attaches structured information to the finding, including a name, description, severity, and optionally evidence with annotated decompiled code. This improves explainability and enables faster triage.

## Creating a finding

The simplest way to return a finding is to call one of the `result` methods with a table containing a `name` and a `description`:

```lua
function check(project, context)
    return result:high{
        name = "CVE-2023-34342",
        description = "Path traversal vulnerability in AMI BMC"
    }
end
```

The severity is determined by the method you call (in this case, `result:high`).
The `name` field typically contains a vulnerability identifier (e.g., a CVE ID), and `description` provides a short summary of the finding.

## Severity levels

VulHunt provides a method for each severity level:

| Method               | Description                                                                |
| :------------------- | :------------------------------------------------------------------------- |
| `result:none`        | Creates a vulnerability finding with no severity                           |
| `result:info`        | Creates a vulnerability finding with no severity (alias for `result:none`) |
| `result:unspecified` | Creates a vulnerability finding with unspecified severity                  |
| `result:low`         | Creates a vulnerability finding with low severity                          |
| `result:medium`      | Creates a vulnerability finding with medium severity                       |
| `result:high`        | Creates a vulnerability finding with high severity                         |
| `result:critical`    | Creates a vulnerability finding with critical severity                     |
| `result:patch`       | Creates a finding indicating that a patch has been identified              |
| `result:malware`     | Creates a finding indicating that malware has been identified              |

## Adding evidence

To help analysts understand _where_ and _why_ a vulnerability exists, you can attach evidence to the result.
Evidence points to specific locations in the decompiled code and annotates them with explanatory messages.

The `evidence` field contains a `functions` table that maps function addresses to arrays of annotations.
The most common annotation is `annotate:at`, which marks a single address with a message:

```lua
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

In this example, `context.caller.address` selects the function to decompile and display, while `annotate:at` places the annotation at the call site address (`context.caller.call_address`).

## Multiple annotations

You can attach multiple annotations to a single function to trace the flow of a vulnerability across different locations:

```lua
return result:high{
    name = "CVE-2023-34336",
    description = "Pre-auth buffer overflow vulnerability in AMI BMC",
    evidence = {
        functions = {
            [context.caller.address] = {
                annotate:at{
                    location = source.origin.source_address,
                    message = "Suppose the return value of this call to strlen is called SourceLen..."
                },
                annotate:at{
                    location = context.caller.call_address,
                    message = "...SourceLen reaches this call to strncpy as argument 3 without a bounds check, leading to a buffer overflow."
                }
            }
        }
    }
}
```

Beyond `annotate:at`, VulHunt supports several other annotation types to provide richer context, such as `annotate:prototype` for function signatures, `annotate:range` for code ranges, and `annotate:variable` for variable declarations.
A complete list is available in the [Annotations Reference](/docs/vulhunt-reference/scopes/scopes-result/annotations/overview).

## Reporting patches

When a rule detects that a vulnerability has been patched, use `result:patch` instead of a severity method:

```lua
return result:patch{
    name = "Buffer overflow in program",
    description = "The program has a patched stack-based buffer overflow in read_argument",
    evidence = {
        functions = {
            [context.caller.address] = {
                annotate:at{
                    location = addr_check,
                    message = "The length of the input is checked against the buffer size..."
                },
                annotate:at{
                    location = addr_strcpy,
                    message = "...which effectively prevents the buffer overflow in this call to strcpy."
                }
            }
        }
    }
}
```

Patch findings always have severity "none" since they indicate that the issue has been resolved.

## Reporting malware

Similarly, use `result:malware` to report malware indicators:

```lua
return result:malware{
    name = "Backdoor in firmware",
    description = "Hardcoded credentials found in authentication routine",
    evidence = {
        functions = {
            [context.address] = {
                annotate:at{
                    location = cmp_address,
                    message = "Hardcoded password comparison found at this location."
                }
            }
        }
    }
}
```

Malware findings always have severity "high".

## Additional fields

When running on the Binarly Transparency Platform (BTP), results can include additional metadata such as CVSS scores, CWE and MBC classifications, provenance information, advisories, and more.
See the [Result Reference](/docs/vulhunt-reference/scopes/scopes-result/overview) for the full list of available fields.

> Fields marked as "BTP Only" in the reference are only relevant when executing
> rules on the Binarly Transparency Platform. They are ignored when running
> rules with the VulHunt CLI.
