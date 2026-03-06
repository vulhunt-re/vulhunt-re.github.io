+++
title = "VariantTable"
weight = 6
+++
The `VariantTable` object describes a variant of a vulnerability finding, capturing alternative severity, metrics, classifications, predicates, compliance, and supporting information.

### Fields

| Field         | Description                  | Type                                                   | Required |
| :------------ | :--------------------------- | :----------------------------------------------------- | :------: |
| `severity`    | CVE severity                 | `string`                                               |    No    |
| `description` | Description of the variant   | `string`                                               |    No    |
| `cvss`        | CVSS score                   | [`CVSS`](/docs/vulhunt-reference/scopes/scopes-result/cvss) |    No    |
| `identifiers` | Table of identifiers         | `string[]`                                             |    No    |
| `notes`       | Notes related to the finding | `{[string]: string}`                                   |    No    |
| `references`  | Additional references        | `{[string]: string}`                                   |    No    |
| `source`      | Source of the variant data   | `string`                                               |    No    |

### Reference

#### severity

The severity level for this variant (e.g., `"high"`, `"medium"`).

#### description

A description of this variant.

#### cvss

The CVSS score for this variant.

#### identifiers

A table of identifiers for this variant (e.g., CVE, GHSA).

#### notes

A table of notes related to the finding. Each note is a table with a title and a URL or description.

#### references

A table of references for the finding. Each reference is a table with a title and a URL.

#### source

The source of the variant data (e.g., vendor name).

### Example

```lua
variants = {
    ["NIST"] = {
        severity = "critical",
        identifiers = {"CVE-2023-35861"},
        cvss = cvss:v3_1{
            base = "9.8",
            exploitability = "3.9",
            impact = "5.9",
            vector = "AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H"
        },
        references = {
            ["NVD"] = "https://nvd.nist.gov/vuln/detail/CVE-2023-35861"
        },
        notes = {
            ["Note"] = "NIST calculated CVSS differs from Supermicro PSIRT calculations"
        }
    }
}
```
