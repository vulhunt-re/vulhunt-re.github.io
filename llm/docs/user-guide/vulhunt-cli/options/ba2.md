+++
title = "ba2"
weight = 5
+++
Query Binarly Analysis Archives (BA2s).

## `list-components`

List all components in a BA2.

```
vulhunt-ce ba2 list-components <INPUT>
```

| Option    | Required | Description       |
| :-------- | :------: | :---------------- |
| `<INPUT>` |   Yes    | Path to input BA2 |

## `extract-component`

Extract a component from a BA2.

```
vulhunt-ce ba2 extract-component [OPTIONS] --component-id <UUID> <INPUT>
```

| Option                  | Required | Description         |
| :---------------------- | :------: | :------------------ |
| `--component-id <UUID>` |   Yes    | Component ID (UUID) |
| `<INPUT>`               |   Yes    | Path to input BA2   |
| `-o, --output <OUTPUT>` |    No    | Output path         |
