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
curl -X POST https://packages.example.com/api/v1/packages/vendor%2Fpackage/sync \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

For automatic sync, configure webhooks from your Git provider.

## Listing Packages

```bash
curl https://packages.example.com/api/v1/packages \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

Response:

```json
{
  "packages": [
    {
      "name": "vendor/package",
      "description": "A great PHP package",
      "versions": ["1.0.0", "1.1.0", "2.0.0"],
      "latest_version": "2.0.0",
      "synced_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Deleting a Package

```bash
curl -X DELETE https://packages.example.com/api/v1/packages/vendor%2Fpackage \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

This removes the package metadata and all cached archives.

## Package Metadata

Each package stores:

- **name**: Composer package name (e.g., `vendor/package`)
- **repository_url**: Git repository URL
- **type**: Git provider type
- **versions**: List of available versions
- **composer.json**: Cached metadata for each version
- **dist**: Download URLs with SHA256 checksums

## Next Steps

- [Manage customer access](/docs/guides/customers)
- [Set up webhooks](/docs/integrations/github)
- [API reference](/docs/api/rest)
