+++
title = "Options"
weight = 1
+++
VulHunt CLI provides four subcommands:

| Subcommand                                     | Description                                         |
| :--------------------------------------------- | :-------------------------------------------------- |
| [`scan`](/docs/user-guide/vulhunt-cli/options/scan) | Scan binaries and firmware for vulnerabilities      |
| [`mcp`](/docs/user-guide/vulhunt-cli/options/mcp)   | Start an MCP server for AI-assisted binary analysis |
| [`btp`](/docs/user-guide/vulhunt-cli/options/btp)   | Interact with the Binarly Transparency Platform     |
| [`ba2`](/docs/user-guide/vulhunt-cli/options/ba2)   | Query Binarly Analysis Archives                     |

Each subcommand has its own set of options documented in the pages linked above.

## Environment variables

VulHunt can take some of its options from environment variables:

| Variable               | Subcommands   | Option                    |
| :--------------------- | :------------ | :------------------------ |
| `BIAS_DATA`            | `scan`, `mcp` | `-d, --data <data>`       |
| `BIAS_VULHUNT_RULES`   | `scan`        | `-r, --rules <rules>`     |
| `BIAS_VULHUNT_MODULES` | `scan`, `mcp` | `-m, --modules <modules>` |
| `BTP_USERNAME`         | `btp`         | `-u, --username`          |
| `BTP_PASSWORD`         | `btp`         | `-p, --password`          |
| `BTP_INSTANCE_SLUG`    | `btp`         | `-s, --instance-slug`     |
