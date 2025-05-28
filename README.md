[![NPM](https://img.shields.io/badge/npm-v1.0.2-0077B5?style=flat-square&logo=npm)](https://www.npmjs.com/package/@lomas/sonarqubemcp)
[![License](https://img.shields.io/badge/license-MIT-0077B5?style=flat-square)](https://github.com/akashlomas/sonarqubemcp/blob/main/LICENSE)
[![Stars](https://img.shields.io/badge/stars-☆_0-0077B5?style=flat-square&logo=github)](https://github.com/akashlomas/sonarqubemcp/stargazers)
[![Forks](https://img.shields.io/badge/forks-0-0077B5?style=flat-square&logo=git)](https://github.com/akashlomas/sonarqubemcp/network/members)
[![Watchers](https://img.shields.io/badge/watchers-👀_0-0077B5?style=flat-square)](https://github.com/akashlomas/sonarqubemcp/watchers)


# SonarQube MCP Server

A Model Context Protocol (MCP) server for interacting with SonarQube APIs, providing tools for authentication, project management, and metrics retrieval.

## Features

- ✅ Token-based authentication
- 🔍 Project listing and details
- 📊 Metrics retrieval
- 🚀 Lightweight and fast
- 🔄 Standardized MCP interface

## 🛠️ Getting Started
### Requirements
    - Node.js >= v20.0.0
    - Cursor or Windsurf

## Installation CLI

```bash
npm install -g @lomas/sonarqubemcp
# or
npx @lomas/sonarqubemcp@latest
```

## Configuration

Set these environment variables:

```bash
export SONARQUBE_URL="http://your-sonarqube-server:9000"
export SONARQUBE_TOKEN="<token>"
```

## Usage

### Cursor IDE

Go to: Settings -> Cursor Settings -> MCP -> Add new global MCP server

Pasting the following configuration into your Cursor ~/.cursor/mcp.json file is the recommended approach. You may also install in a specific project by creating .cursor/mcp.json in your project folder. See Cursor MCP docs for more info.

Configure SonarQube MCP on Cursor
```json
{
    "mcpServers": {
        "SonarQube MCP": {
            "command": "npx",
            "args": [
                "-y",
                "@lomas/sonarqubemcp@1.0.3",
                "sonarqubemcp"
            ],
            "env": {
                "SONARQUBE_URL": "<url>",
                "SONARQUBE_TOKEN": "<token>"
            }
        }
    }
}
```

### In Windsurf

Add this to your Windsurf MCP config file. See Windsurf MCP docs for more info.

``` json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

### In VS Code

Install in VS Code

Add this to your VS Code MCP config file. See VS Code MCP docs for more info.

```json
{
  "servers": {
    "Context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

## Available tools (via MCP protocol):
    - authenticate
    - list_projects
    - get_project_details
    - get_project_metrics

## API Endpoints

| Tool                | Parameters                     | Description                          |
|---------------------|--------------------------------|--------------------------------------|
| `authenticate`      | `token?`                      | Validate SonarQube token             |
| `list_projects`     | `token?`                      | List all projects                    |
| `get_project_details` | `token?`, `projectKey`        | Get details for specific project     |
| `get_project_metrics` | `token?`, `projectKey`, `metrics` | Get metrics for project            |

## Troubleshooting

**Error: Connection refused**
- Verify SonarQube server is running
- Check `SONARQUBE_URL` is correct

**Error: Invalid token**
- Regenerate your SonarQube token
- Ensure token has proper permissions

## License

MIT © [Akash Lomas](https://github.com/akashlomas)
