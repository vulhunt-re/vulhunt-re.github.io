+++
title = "ProvenanceTable"
weight = 5
+++
The `ProvenanceTable` object describes the provenance (origin and context) of a component related to a vulnerability finding.
It provides additional context about where a component comes from, how it is linked, and its vendor/product details.

### Fields

| Field               | Description                                                       | Type       | Required |
| :------------------ | :---------------------------------------------------------------- | :--------- | :------: |
| `kind`              | Kind of the component found (e.g., `posix.ELF`, `posix.lib`, ...) | `string`   |    No    |
| `linkage`           | Linkage details                                                   | `string`   |   Yes    |
| `vendor`            | The vendor producing this component                               | `string`   |   Yes    |
| `product`           | The product this component is a part of                           | `string`   |   Yes    |
| `version`           | If applicable, the version of the component                       | `string`   |    No    |
| `license`           | The license of the component                                      | `string`   |    No    |
| `affected_versions` | Table of affected versions for this component                     | `string[]` |    No    |
| `cpe`               | Common Platform Enumeration (CPE) identifier for the component    | `string`   |    No    |
| `purl`              | Package URL (PURL) identifier for the component                   | `string`   |    No    |

### Reference

#### kind

Kind of the component found (e.g., `posix.ELF`, `posix.lib`, library, binary, key).

#### linkage

Describes how the component is linked or included in the project.  
Valid values are:

- `unspecified`: Unspecified linkage.
- `embedded`: For example, a statically linked library.
- `external`: For example, a dynamically linked library.
- `project`: For example, a parent project, product, or group that the component is part of.
- `build`: For example, an artifact that was used in the process of building or generating the component.
- `derived`: For example, public key parameters extracted from the private key.
- `vendored`: For example, a library distributed as part of a software package, with or without modifications, whose original provenance is from a different project, product, or group.

#### vendor

The vendor or organization that produces this component.

#### product

The product or project that this component is a part of.

#### version

The version of the component, if applicable.

#### license

The license under which the component is distributed.

#### affected_versions

A table of affected versions for this component.

#### cpe

A [Common Platform Enumeration](https://nvd.nist.gov/products/cpe) (CPE) identifier for the component (e.g., `cpe:2.3:a:haxx:libcurl:7.50.0:*:*:*:*:*:*:*`).

#### purl

A [Package URL](https://github.com/package-url/purl-spec) (PURL) identifier for the component (e.g., `pkg:generic/libcurl@7.50.0`).

### Example

```lua
provenance = {
  kind = "posix.ELF",
  linkage = "project",
  vendor = "haxx",
  product = "libcurl",
  license = "MIT",
  affected_versions = {">=7.41.0", "<=8.9.1"}
},
```
