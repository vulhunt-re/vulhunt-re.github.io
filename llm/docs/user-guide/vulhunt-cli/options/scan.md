+++
title = "scan"
weight = 2
+++
Scan binaries and firmware for vulnerabilities.

```
vulhunt-ce scan [OPTIONS] -o <OUTPUT> -d <data> -r <rules> <INPUT>
```

| Option                              | Required | Description                                       |
| :---------------------------------- | :------: | :------------------------------------------------ |
| `-o, --output <OUTPUT>`             |   Yes    | Path to write output JSON                         |
| `-d, --data <data>`                 |   Yes    | Path to the VulHunt data directory                |
| `-r, --rules <rules>`               |   Yes    | Directory or file containing VulHunt rules        |
| `<INPUT>`                           |   Yes    | Path to the binary or firmware to scan            |
| `--loader <loader>`                 |    No    | Loader to use for the input source (see below)    |
| `--component-attribute <key=value>` |    No    | Component attributes (repeatable, see below)      |
| `-m, --modules <modules>`           |    No    | Directory containing VulHunt modules              |
| `--pretty`                          |    No    | Render each issue to stdout for human consumption |
| `--stream`                          |    No    | Stream results as JSONL for machine consumption   |
| `--compress`                        |    No    | Compress output JSONL stream with Zstandard       |

`--pretty` and `--stream` are mutually exclusive. `--compress` and `--pretty` are mutually exclusive.

## Loaders

The `--loader` option selects how the input is loaded for analysis. The default is `component` for the Community Edition and `ba2` for the Enterprise Edition.

| Value       | Description                   |
| :---------- | :---------------------------- |
| `component` | Component loader              |
| `ba2`       | BA2 loader (alias: `default`) |
| `uefi`      | UEFI firmware loader          |
| `bndb`      | Binary Ninja database loader  |

## Component attributes

The `--component-attribute` option can be repeated to pass additional metadata during loading analysis. Each attribute is a `key=value` pair:

```bash
vulhunt-ce scan \
  --loader component \
  --component-attribute kind=SmmModule \
  --component-attribute guid=FEAB1234-5678-90AB-CDEF-1234567890AB \
  ...
```

Only supported with the `component` loader.
