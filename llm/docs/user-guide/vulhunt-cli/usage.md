+++
title = "Usage"
weight = 4
+++
The CLI tool scans binaries and firmware for vulnerabilities, serves an MCP endpoint for AI-assisted analysis, and integrates with the Binarly Transparency Platform (BTP).

NOTE: we show usage via the community edition tool, for enterprise customers, use `vulhunt`.

## Scanning binaries

### Single rule

Scan a binary with a single rule and display results in the terminal:

```bash
vulhunt-ce scan \
  --data ./bias-data \
  --rules CVE-2024-6387.vh \
  --output results.json \
  --pretty \
  ./sshd
```

The above command uses the rule `CVE-2024-6387.vh` to scan the `sshd` binary. Type libraries and signatures are loaded from `./bias-data`, which should contain the required [Auxiliary Data](/docs/user-guide/vulhunt-cli/auxiliary-data). Results are written to `results.json` and rendered to the terminal with `--pretty`.

### Rule set

Scan a binary against all rules in a directory:

```bash
vulhunt-ce scan \
  --data ./bias-data \
  --rules ./my-rules/ \
  --output results.json \
  --pretty \
  ./sshd
```

When scanning with multiple rules, narrow down rule coverage with [Conditions](/docs/vulhunt-reference/vulhunt-rules/rule-fields#conditions) to minimize the performance impact.

### UEFI firmware and alternate loaders

Scan a UEFI firmware image using the `uefi` loader:

```bash
vulhunt-ce scan \
  --loader uefi \
  --data ./bias-data \
  --rules ./uefi-rules/ \
  --output results.json \
  --pretty \
  ./firmware.bin
```

VulHunt's scanner also supports `ba2` (Binarly Analysis Archive) and `bndb` (Binary Ninja) loaders. The Binary Ninja loader requires VulHunt to be built with [specific support](/docs/user-guide/vulhunt-cli/installation#integrations).

### Component attributes

Pass additional metadata when scanning individual components:

```bash
vulhunt-ce scan \
  --data ./bias-data \
  --rules ./my-rules/ \
  --component-attribute kind=SmmModule \
  --component-attribute guid=FEAB1234-5678-90AB-CDEF-1234567890AB \
  --output results.json \
  --pretty \
  ./module.efi
```

### Streaming output

For CI/CD pipelines or large scans, stream results as JSONL:

```bash
vulhunt-ce scan \
  --data ./bias-data \
  --rules ./my-rules/ \
  --output results.jsonl \
  --stream \
  ./firmware.bin
```

Add `--compress` to compress the stream with Zstandard:

```bash
vulhunt-ce scan \
  --data ./bias-data \
  --rules ./my-rules/ \
  --output results.jsonl.zst \
  --stream --compress \
  ./firmware.bin
```

### Using environment variables

Set common paths once and omit them from individual commands:

```bash
export BIAS_DATA=./bias-data
export BIAS_VULHUNT_RULES=./my-rules

vulhunt-ce scan --output results.json --pretty ./sshd
```

## Starting the MCP server

The `mcp` subcommand starts a Model Context Protocol server for AI-assisted binary analysis.

### HTTP transport

```bash
vulhunt-ce mcp --data ./bias-data --host 0.0.0.0 --port 9090
```

### Stdio transport

For integration with tools like Claude Desktop:

```bash
vulhunt-ce mcp --data ./bias-data --stdio
```

## Binarly Transparency Platform (BTP)

The `btp` subcommand interacts with the Binarly Transparency Platform. All commands require authentication credentials, which can be passed as options or set via environment variables:

```bash
export BTP_USERNAME=user@example.com
export BTP_PASSWORD=your-password
export BTP_INSTANCE_SLUG=your-org.prod
```

### Pushing rules

Push a rule pack from local directories to BTP:

```bash
vulhunt-ce btp push-rules \
  -r rulepacks/custom \
  --name "My Custom Rules" \
  ./posix/ ./uefi/
```

Push and deploy directly to a product:

```bash
vulhunt-ce btp push-rules \
  -r rulepacks/custom \
  --deploy-to-product 01JQXYZ1234567890ABCDE \
  ./posix/ ./uefi/
```

Push individual rule files (requires `--platform`):

```bash
vulhunt-ce btp push-rules \
  -r rulepacks/custom \
  --platform posix \
  CVE-2024-6387.vh CVE-2025-1234.vh
```

### Managing products

List all products:

```bash
vulhunt-ce btp list-products
```

Create a new product:

```bash
vulhunt-ce btp create-product \
  --name "Router Firmware" \
  --description "Production router firmware images"
```

### Uploading and scanning

Upload a firmware image and trigger a scan:

```bash
vulhunt-ce btp upload \
  --product-id 01JQXYZ1234567890ABCDE \
  --name "Router v2.1" \
  --version "2.1.0" \
  --scan \
  ./firmware.bin
```

### Monitoring scans

List scans for an image:

```bash
vulhunt-ce btp list-scans \
  --product-id 01JQXYZ1234567890ABCDE \
  --image-id 01JQXYZ1234567890FGHIJ
```

Get scan details:

```bash
vulhunt-ce btp get-scan \
  --product-id 01JQXYZ1234567890ABCDE \
  --image-id 01JQXYZ1234567890FGHIJ \
  --scan-id 01JQXYZ1234567890KLMNO
```

### Retrieving results

Get findings for an image:

```bash
vulhunt-ce btp get-findings \
  --product-id 01JQXYZ1234567890ABCDE \
  --image-id 01JQXYZ1234567890FGHIJ
```

Download a BA2 archive for offline analysis:

```bash
vulhunt-ce btp download-ba2 \
  --product-id 01JQXYZ1234567890ABCDE \
  --image-id 01JQXYZ1234567890FGHIJ \
  -o ./image.ba2
```

## Querying BA2 archives

The `ba2` subcommand inspects and extracts components from Binarly Analysis Archives.

### Listing components

```bash
vulhunt-ce ba2 list-components ./image.ba2
```

### Extracting a component

```bash
vulhunt-ce ba2 extract-component \
  --component-id 550e8400-e29b-41d4-a716-446655440000 \
  -o ./extracted-module.efi \
  ./image.ba2
```
