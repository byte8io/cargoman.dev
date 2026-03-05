---
sidebar_position: 1
---

# Managing Packages

Learn how to add, sync, and manage packages in your Cargoman registry.

## Adding a Package

Packages can be added from Git repositories:

```bash
curl -X POST https://packages.example.com/api/v1/packages \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "vendor/package",
    "repository_url": "https://github.com/vendor/package.git",
    "type": "github"
  }'
```

Or via the CLI:

```bash
cargoman package add https://github.com/vendor/package.git
```

### Supported Git Providers

| Provider | Type | Webhook Support |
|----------|------|-----------------|
| GitHub | `github` | Yes |
| GitLab | `gitlab` | Yes |
| Bitbucket | `bitbucket` | Yes |
| Generic Git | `git` | No |

## Version Detection

Cargoman automatically detects versions from Git tags:

- `v1.0.0` -> `1.0.0`
- `1.2.3` -> `1.2.3`
- `release-2.0.0` -> `2.0.0`

Each tag must contain a valid `composer.json` file in the repository root.

## Syncing Packages

Trigger a manual sync to pull new versions:

```bash
# API
curl -X POST https://packages.example.com/api/v1/packages/vendor/package/sync \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI - sync a specific package
cargoman package sync vendor/package

# CLI - sync all packages
cargoman package sync --all
```

For automatic sync, configure webhooks from your Git provider.

## Listing Packages

```bash
# API
curl https://packages.example.com/api/v1/packages \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman package list
```

## Getting Package Details

```bash
# API
curl https://packages.example.com/api/v1/packages/vendor/package \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman package show vendor/package
```

## Deleting a Package

```bash
# API
curl -X DELETE https://packages.example.com/api/v1/packages/vendor/package \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman package delete vendor/package --force
```

This removes the package metadata and all cached archives.

## Version Yanking

Yank a version to prevent it from being installed (the archive is preserved but hidden from Composer):

```bash
# Yank
curl -X POST https://packages.example.com/api/v1/packages/vendor/package/yank/2.0.0 \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Unyank
curl -X POST https://packages.example.com/api/v1/packages/vendor/package/unyank/2.0.0 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Version Deprecation

Mark a version as deprecated:

```bash
curl -X POST https://packages.example.com/api/v1/packages/vendor/package/deprecate/1.0.0 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Package README

Retrieve the README for a package:

```bash
curl https://packages.example.com/api/v1/packages/vendor/package/readme \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Package Validation

Validate a package's configuration without syncing:

```bash
curl -X POST https://packages.example.com/api/v1/packages/vendor/package/validate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Webhook Deliveries

View webhook delivery history for a package:

```bash
curl https://packages.example.com/api/v1/packages/vendor/package/webhook-deliveries \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Monorepo Support

Cargoman supports monorepos — a single Git repository containing multiple Composer packages.

### Add a Monorepo

```bash
cargoman package add https://github.com/vendor/monorepo.git \
  --monorepo "packages/*/composer.json"
```

### List Monorepo Children

```bash
# API
curl https://packages.example.com/api/v1/packages/vendor/monorepo/monorepo/children \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman package monorepo children vendor/monorepo
```

### Sync Monorepo

```bash
# API
curl -X POST https://packages.example.com/api/v1/packages/vendor/monorepo/monorepo/sync \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman package monorepo sync vendor/monorepo
```

## Reverse Lookup

Find which customers have access to a package:

```bash
curl https://packages.example.com/api/v1/packages/vendor/package/customers \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Package Metadata

Each package stores:

- **name**: Composer package name (e.g., `vendor/package`)
- **repository_url**: Git repository URL
- **type**: Git provider type
- **versions**: List of available versions (with yank/deprecation status)
- **composer.json**: Cached metadata for each version
- **dist**: Download URLs with SHA256 checksums

## Next Steps

- [Manage customer access](/docs/guides/customers)
- [Set up webhooks](/docs/integrations/github)
- [API reference](/docs/api/rest)
