+++
title = "mcp"
weight = 3
+++
Start a Model Context Protocol (MCP) server for AI-assisted binary analysis. Supports HTTP and stdio transports.

```
vulhunt-ce mcp [OPTIONS] -d <data>
```

| Option                    | Required | Description                                    |
| :------------------------ | :------: | :--------------------------------------------- |
| `-d, --data <data>`       |   Yes    | Path to the VulHunt data directory             |
| `--host <hostname>`       |    No    | Host address to bind (defaults to `127.0.0.1`) |
| `--port <port>`           |    No    | Port to listen on (defaults to `8080`)         |
| `--stdio`                 |    No    | Use stdio transport instead of HTTP            |
| `-m, --modules <modules>` |    No    | Directory containing VulHunt modules           |

`--stdio` is mutually exclusive with `--host` and `--port`.

## Configuring external tools

### Claude Code

```bash
claude mcp add vulhunt-ce -e BIAS_DATA=/path/to/data -- vulhunt-ce mcp --stdio
```

Or add the following to your project's `.mcp.json` file (or `~/.claude/settings.json` for global configuration):

```json
{
  "mcpServers": {
    "vulhunt-ce": {
      "command": "vulhunt-ce",
      "args": ["mcp", "--stdio"],
      "env": { "BIAS_DATA": "/path/to/data" }
    }
  }
}
```

### Codex

```bash
codex mcp add vulhunt-ce --env BIAS_DATA=/path/to/data -- vulhunt-ce mcp --stdio
```

Or add the following to `~/.codex/config.toml`:

```toml
[mcp_servers.vulhunt-ce]
command = "vulhunt-ce"
args = ["mcp", "--stdio"]

[mcp_servers.vulhunt-ce.env]
BIAS_DATA = "/path/to/data"
```
