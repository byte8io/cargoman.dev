---
sidebar_position: 1
---

# GitHub Integration

Automatically sync packages when you push to GitHub.

## Setup Webhook

### 1. Get Webhook URL

Your webhook URL is:
```
https://packages.example.com/api/webhooks/github
```

### 2. Create Webhook in GitHub

1. Go to your repository **Settings** > **Webhooks**
2. Click **Add webhook**
3. Configure:
   - **Payload URL**: Your webhook URL
   - **Content type**: `application/json`
   - **Secret**: Generate a secure secret
   - **Events**: Select "Just the push event" or specific events

### 3. Configure Cargoman

Set the webhook secret:

```bash
GITHUB_WEBHOOK_SECRET=your-webhook-secret
```

## Supported Events

| Event | Action |
|-------|--------|
| `push` | Sync affected packages |
| `create` (tag) | Add new version |
| `delete` (tag) | Remove version |

## Organization Webhooks

For multiple repositories, use organization-level webhooks:

1. Go to **Organization Settings** > **Webhooks**
2. Add webhook with the same configuration
3. All repositories will trigger syncs

## GitHub App (Coming Soon)

For easier setup, we're building a GitHub App that:
- Automatically configures webhooks
- Provides repository selection UI
- Handles authentication securely

## Troubleshooting

### Webhook Not Triggering

Check webhook delivery logs in GitHub:

1. Go to **Settings** > **Webhooks**
2. Click your webhook
3. View **Recent Deliveries**

### Authentication Failed

Ensure your webhook secret matches:

```bash
# In Cargoman
GITHUB_WEBHOOK_SECRET=abc123

# In GitHub webhook settings
Secret: abc123
```

### Package Not Syncing

Verify:
1. Repository URL matches in Cargoman
2. Tag format is valid (e.g., `v1.0.0`)
3. `composer.json` exists in repository root

## Private Repositories

For private repositories, configure Git authentication:

```bash
# Using personal access token
GIT_AUTH_TOKEN=ghp_xxxx
```

Or use SSH keys (self-hosted only):

```bash
# Add SSH key to ~/.ssh/id_rsa
# Ensure it has read access to repositories
```

## Example Workflow

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate composer.json
        run: composer validate

      # Webhook automatically syncs on tag push
      # No additional steps needed!
```

## Next Steps

- [GitLab integration](/docs/integrations/gitlab)
- [Bitbucket integration](/docs/integrations/bitbucket)
