+++
title = "CVSS"
weight = 3
+++
Common Vulnerability Scoring System (CVSS) captures severity metrics for a finding.
VulHunt supports CVSS versions 2, 3, 3.1, and 4.
A CVSS object is created using one of the methods provided by VulHunt listed below:

| Method      | Description                      | Parameters | Return Type   |
| :---------- | :------------------------------- | :--------- | :------------ |
| `cvss:v2`   | Creates a CVSS v2.0 score object | `Table`    | `CVSS` object |
| `cvss:v3`   | Creates a CVSS v3.0 score object | `Table`    | `CVSS` object |
| `cvss:v3_1` | Creates a CVSS v3.1 score object | `Table`    | `CVSS` object |
| `cvss:v4`   | Creates a CVSS v4.0 score object | `Table`    | `CVSS` object |

Each method accepts a table with the following fields:

| Field            | Description                                         | Type     |
| :--------------- | :-------------------------------------------------- | :------- |
| `base`           | Base score                                          | `string` |
| `exploitability` | Exploitability score                                | `string` |
| `impact`         | Impact score                                        | `string` |
| `vector`         | Vector (e.g. "AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H") | `string` |

### Reference

#### base

The base CVSS score as a string.

#### exploitability

The exploitability sub-score as a string.

#### impact

The impact sub-score as a string.

#### vector

The CVSS vector string describing the vulnerability metrics.

### Example

```lua
-- CVSS v3.1
local score = cvss:v3_1{
  base = "6.5",
  exploitability = "3.9",
  impact = "2.5",
  vector = "AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N",
}

-- Attach to a result
return result:medium{
  name = "Example",
  description = "...",
  cvss = score,
}
```
