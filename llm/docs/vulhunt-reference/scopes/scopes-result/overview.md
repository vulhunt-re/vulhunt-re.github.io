+++
title = "Overview"
weight = 1
+++
Each scope can return a finding with details about a vulnerability.
A finding improves explainability by attaching comprehensive information such as CVSS scores, advisories, evidence (including decompiled code and annotations), and other metadata.

Findings are created using one of the methods provided by VulHunt listed below:

| Method               | Description                                                                | Parameters | Return Type     |
| :------------------- | :------------------------------------------------------------------------- | :--------- | :-------------- |
| `result:none`        | Creates a vulnerability finding with no severity                           | `Table`    | `Result` object |
| `result:info`        | Creates a vulnerability finding with no severity (alias for `result:none`) | `Table`    | `Result` object |
| `result:unspecified` | Creates a vulnerability finding with unspecified severity                  | `Table`    | `Result` object |
| `result:low`         | Creates a vulnerability finding with low severity                          | `Table`    | `Result` object |
| `result:medium`      | Creates a vulnerability finding with medium severity                       | `Table`    | `Result` object |
| `result:high`        | Creates a vulnerability finding with high severity                         | `Table`    | `Result` object |
| `result:critical`    | Creates a vulnerability finding with critical severity                     | `Table`    | `Result` object |
| `result:patch`       | Creates a finding indicating that a patch has been identified              | `Table`    | `Result` object |
| `result:malware`     | Creates a finding indicating that malware has been identified              | `Table`    | `Result` object |

Each method accepts a table with the following fields:

| Field         | Description                                   | Type                                                                                   | Required | BTP Only |
| :------------ | :-------------------------------------------- | :------------------------------------------------------------------------------------- | :------: | :------: |
| `name`        | CVE ID or unique identifier                   | `string`                                                                               |   Yes    |    No    |
| `description` | CVE description or finding summary            | `string`                                                                               |   Yes    |    No    |
| `provenance`  | Provenance details                            | [`ProvenanceTable`](/docs/vulhunt-reference/scopes/scopes-result/provenance-table)          |    No    |   Yes    |
| `cwes`        | Table of CWE identifiers                      | `string[]`                                                                             |    No    |   Yes    |
| `mbcs`        | Table of MBC identifiers                      | `string[]`                                                                             |    No    |   Yes    |
| `cvss`        | CVSS score                                    | [`CVSS`](/docs/vulhunt-reference/scopes/scopes-result/cvss)                                 |    No    |   Yes    |
| `advisory`    | URL to the advisory                           | `string`                                                                               |    No    |   Yes    |
| `identifiers` | Table of identifiers (e.g. CVE, GHSA, OSV...) | `string[]`                                                                             |    No    |   Yes    |
| `variants`    | Table of variants of this finding             | `{[string]:`[`VariantTable`](/docs/vulhunt-reference/scopes/scopes-result/variant-table)`}` |    No    |   Yes    |
| `patch`       | URL to the patch                              | `string`                                                                               |    No    |   Yes    |
| `source`      | URL to the source file or repository          | `string`                                                                               |    No    |   Yes    |
| `evidence`    | Evidence details                              | [`Evidence`](/docs/vulhunt-reference/scopes/scopes-result/evidence)                         |   Yes    |    No    |
| `notes`       | Notes related to the finding                  | `{[string]: string}`                                                                   |    No    |   Yes    |
| `references`  | Additional references                         | `{[string]: string}`                                                                   |    No    |   Yes    |

<Note>
  The "BTP Only" column indicates fields that are only relevant when a VulHunt
  rule is executed on the Binarly Transparency Platform.
</Note>

### Reference

#### name

CVE ID or unique identifier for the vulnerability finding.

#### description

A short summary or description of the vulnerability or finding.

#### provenance

A [`ProvenanceTable`](/docs/vulhunt-reference/scopes/scopes-result/provenance-table) describing the origin and context of a component related to the finding.

#### cwes

A table of CWE identifiers associated with the finding.

#### mbcs

A table of MBC (Malware Behavior Catalog) identifiers associated with the finding.

#### cvss

The CVSS information for the finding.

#### advisory

URL to the official advisory related to the vulnerability.

#### identifiers

A table of identifiers for the finding (e.g., CVE, GHSA, OSV, etc.).

#### variants

A list or map of variant objects describing related vulnerabilities or variations.

#### patch

URL to the patch that addresses the vulnerability.

#### source

URL to the source file or repository where the vulnerability was found.

#### evidence

Evidence details supporting the finding, such as code snippets or annotations.

#### notes

Notes related to the vulnerability or the finding, provided as a table of title/text pairs.

#### references

Additional references related to the vulnerability, provided as a table of title/URL pairs.

### Example

```lua
return result:critical{
  name = "CVE-2024-5535",
  description = "Buffer over-read in the `SSL_select_next_proto` function of OpenSSL",
  provenance = {
    kind = "posix.ELF",
    linkage = "project",
    vendor = "openssl",
    product = "openssl",
    license = "Apache-2.0",
    affected_versions = {
      "<1.0.2zk", "<1.1.1za", "<3.0.15", "<3.1.7", "<3.2.3", "<3.3.2"
    }
  },
  cwes = {"CWE-200"},
  mbcs = {"OC0006", "B0011"},
  cvss = cvss:v3_1{
    base = "9.1",
    exploitability = "3.9",
    impact = "5.2",
    vector = "AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:H"
  },
  advisory = "https://openssl-library.org/news/secadv/20240627.txt",
  identifiers = {"CVE-2024-5535", "GHSA-4fc7-mvrr-wv2c"},
  variants = {
    ["OpenSSL"] = {
      severity = "low",
      references = {
        ["OpenSSL Advisory"] = "https://openssl-library.org/news/secadv/20240627.txt"
      },
      notes = {
        ["Note"] = "OpenSSL calculated severity differs from CISA-ADP calculations"
      }
    }
  },
  patch = "https://github.com/openssl/openssl/commit/e86ac436f0bd54d4517745483e2315650fae7b2c.patch",
  source = "https://github.com/openssl/openssl/blob/openssl-3.0.12/ssl/ssl_lib.c",
  evidence = {
    functions = {
      [context.address] = {
        annotate:prototype(prototype),
        annotate:at{
          location = context.address,
          message = "The `SSL_select_next_proto` function does not properly validate the client buffer (5th parameter)."
        },
        annotate:at{
          location = address,
          message = "Passing an empty buffer can result in a crash or memory leak due to the return of an invalid memory pointer."
        }
      }
    }
  }
}
```
