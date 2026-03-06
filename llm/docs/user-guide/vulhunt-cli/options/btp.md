+++
title = "btp"
weight = 4
+++
Interact with the Binarly Transparency Platform (BTP). All `btp` subcommands require authentication credentials.

## Authentication

Every `btp` subcommand requires the following options (or their environment variable equivalents):

| Option                       | Env Variable        | Description                           |
| :--------------------------- | :------------------ | :------------------------------------ |
| `-u, --username <username>`  | `BTP_USERNAME`      | BTP username                          |
| `-p, --password <password>`  | `BTP_PASSWORD`      | BTP password                          |
| `-s, --instance-slug <slug>` | `BTP_INSTANCE_SLUG` | Instance slug (e.g., `your-org.prod`) |

## `push-rules`

Push a VulHunt rule pack to a BTP instance.

```
vulhunt-ce btp push-rules [OPTIONS] -r <repository> <INPUTS>...
```

| Option                          | Required | Description                                                 |
| :------------------------------ | :------: | :---------------------------------------------------------- |
| `-r, --repository <repository>` |   Yes    | Repository name (e.g., `rulepacks/custom`)                  |
| `<INPUTS>...`                   |   Yes    | Rule directories (named `posix/` or `uefi/`) or `.vh` files |
| `-t, --tag <tag>`               |    No    | Image tag (defaults to `latest`)                            |
| `--name <name>`                 |    No    | Rule pack name                                              |
| `--platform <platform>`         |    No    | Platform for individual `.vh` files (`posix` or `uefi`)     |
| `--modules <path>`              |    No    | Directory containing modules (`.vhm` files)                 |
| `--deploy-to-product <ULID>`    |    No    | Deploy rule pack to a product                               |
| `--deploy-to-org <ULID>`        |    No    | Deploy rule pack to an organisation                         |

`--deploy-to-product` and `--deploy-to-org` are mutually exclusive.

When passing directories as inputs, they must be named `posix/` or `uefi/` so the platform is inferred automatically. When passing individual `.vh` files, `--platform` is required.

## `list-products`

List products in a BTP instance. No additional options beyond authentication.

```
vulhunt-ce btp list-products
```

## `create-product`

Create a new product in a BTP instance.

```
vulhunt-ce btp create-product --name <name> [--description <desc>]
```

| Option                 | Required | Description         |
| :--------------------- | :------: | :------------------ |
| `--name <name>`        |   Yes    | Product name        |
| `--description <desc>` |    No    | Product description |

## `upload`

Upload an image or firmware file to a product.

```
vulhunt-ce btp upload --product-id <ULID> --name <name> --version <version> [--scan] <FILE>
```

| Option                | Required | Description                |
| :-------------------- | :------: | :------------------------- |
| `--product-id <ULID>` |   Yes    | Product ID                 |
| `--name <name>`       |   Yes    | Image name                 |
| `--version <version>` |   Yes    | Image version              |
| `<FILE>`              |   Yes    | File to upload             |
| `--scan`              |    No    | Create a scan after upload |

## `list-images`

List images in a product.

```
vulhunt-ce btp list-images --product-id <ULID>
```

| Option                | Required | Description |
| :-------------------- | :------: | :---------- |
| `--product-id <ULID>` |   Yes    | Product ID  |

## `list-scans`

List scans for an image.

```
vulhunt-ce btp list-scans --product-id <ULID> --image-id <ULID>
```

| Option                | Required | Description |
| :-------------------- | :------: | :---------- |
| `--product-id <ULID>` |   Yes    | Product ID  |
| `--image-id <ULID>`   |   Yes    | Image ID    |

## `create-scan`

Create a scan for an existing image.

```
vulhunt-ce btp create-scan --product-id <ULID> --image-id <ULID>
```

| Option                | Required | Description |
| :-------------------- | :------: | :---------- |
| `--product-id <ULID>` |   Yes    | Product ID  |
| `--image-id <ULID>`   |   Yes    | Image ID    |

## `get-scan`

Get details of an individual scan.

```
vulhunt-ce btp get-scan --product-id <ULID> --image-id <ULID> --scan-id <ULID>
```

| Option                | Required | Description |
| :-------------------- | :------: | :---------- |
| `--product-id <ULID>` |   Yes    | Product ID  |
| `--image-id <ULID>`   |   Yes    | Image ID    |
| `--scan-id <ULID>`    |   Yes    | Scan ID     |

## `get-findings`

Get findings for an image.

```
vulhunt-ce btp get-findings --product-id <ULID> --image-id <ULID>
```

| Option                | Required | Description |
| :-------------------- | :------: | :---------- |
| `--product-id <ULID>` |   Yes    | Product ID  |
| `--image-id <ULID>`   |   Yes    | Image ID    |

## `download-ba2`

Download the BA2 file for an image from BTP.

```
vulhunt-ce btp download-ba2 --product-id <ULID> --image-id <ULID> --scan-id <ULID> [-o <path>]
```

| Option                | Required | Description                            |
| :-------------------- | :------: | :------------------------------------- |
| `--product-id <ULID>` |   Yes    | Product ID                             |
| `--image-id <ULID>`   |   Yes    | Image ID                               |
| `--scan-id <ULID>`    |   Yes    | Scan ID                                |
| `-o, --output <path>` |    No    | Output path (defaults to URL filename) |
