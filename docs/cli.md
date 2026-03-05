---
sidebar_position: 6
---

# CLI Reference

The `cargoman` CLI tool provides commands for managing your registry from the terminal.

## Global Options

```bash
cargoman [OPTIONS] <COMMAND>

Options:
  --config <PATH>   Configuration file path
  -v, --verbose     Increase verbosity (can repeat: -vv, -vvv)
  -q, --quiet       Suppress output
  --json            Output as JSON (for automation)
```

## Commands

### init

Initialize a new Cargoman registry:

```bash
cargoman init
```

Creates default configuration files and directory structure.

### serve

Start the HTTP server:

```bash
cargoman serve [--port 8080]
```

### migrate

Run database migrations:

```bash
cargoman migrate
```

### db

Database management commands:

```bash
# Reset database (drop and re-run all migrations)
cargoman db reset [--force]

# Seed with sample data (5 customers, 5 packages)
cargoman db seed
```

### customer

Customer management:

```bash
# Create a new customer
cargoman customer create --name "Acme Corp" [--email dev@acme.com] [--external-id stripe_cus_123]

# List customers
cargoman customer list [--limit 20]

# Show customer details
cargoman customer show <id>

# Suspend a customer
cargoman customer suspend <id> [--reason "Payment failed"]

# Reactivate a suspended customer
cargoman customer reactivate <id>

# Delete a customer
cargoman customer delete <id> [--force]
```

### package

Package management:

```bash
# Add a package from a Git URL
cargoman package add <url> [--name vendor/package] [--monorepo "packages/*/composer.json"] [--version-strategy tags]

# List all packages
cargoman package list

# Show package details
cargoman package show <vendor/package>

# Sync a package (pull new versions from Git)
cargoman package sync <vendor/package>
cargoman package sync --all

# Delete a package
cargoman package delete <vendor/package> [--force]

# Monorepo commands
cargoman package monorepo list              # List monorepo root packages
cargoman package monorepo children <name>   # List child packages
cargoman package monorepo sync <name>       # Sync monorepo
```

### token

Token management:

```bash
# Create a scoped token
cargoman token create --customer <id> [--scope download] [--name "CI Token"] [--packages "vendor/*"] [--expires-in-days 365]

# List tokens for a customer
cargoman token list <customer_id>

# Show token details
cargoman token show <token_id>

# Rotate a token (new value, same settings)
cargoman token rotate <token_id>

# Revoke a token
cargoman token revoke <token_id>
```

Token scopes: `admin`, `developer`, `download`, `webhook`

### import

Import packages from external sources:

```bash
# Import from Satis configuration
cargoman import satis --config satis.json [--dry-run] [--concurrency 4] [--skip-sync] [--report]

# Import from Private Packagist
cargoman import packagist --token <api-token> --org <org-name> [--dry-run] [--concurrency 4] [--skip-sync] [--report]

# Import from a file containing Git URLs (one per line)
cargoman import git --file urls.txt [--dry-run] [--concurrency 4] [--skip-sync] [--report]
```

Common import options:
- `--dry-run` — Show what would be imported without making changes
- `--concurrency` — Number of parallel operations (default: 4)
- `--skip-sync` — Add packages but don't sync versions yet
- `--report` — Generate a summary report after import

### audit

Audit `composer.lock` for known vulnerabilities:

```bash
# Audit the current directory
cargoman audit

# Audit a specific file
cargoman audit /path/to/composer.lock

# Options
cargoman audit \
  --include-dev          # Include dev dependencies (default: true)
  --format text          # Output format: text, json, junit, sarif
  --fail-on-any          # Exit with error code on any vulnerability
  --min-severity medium  # Minimum severity: low, medium, high, critical
```

## JSON Output

All commands support `--json` for machine-readable output:

```bash
cargoman customer list --json | jq '.[] | .name'
cargoman package list --json
cargoman token list customer_id --json
```

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | General error |
| 2 | Configuration error |
| 3 | Database error |

## Next Steps

- [Configuration reference](/docs/getting-started/configuration)
- [Managing packages](/docs/guides/packages)
- [Token management](/docs/guides/tokens)
