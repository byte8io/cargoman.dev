---
sidebar_position: 3
---

# Bitbucket Integration

Automatically sync packages when you push to Bitbucket.

## Setup Webhook

### 1. Get Webhook URL

Your webhook URL is:
```
https://packages.example.com/api/webhooks/bitbucket
```

### 2. Create Webhook in Bitbucket

1. Go to your repository **Settings** > **Webhooks**
2. Click **Add webhook**
3. Configure:
   - **Title**: Cargoman Sync
   - **URL**: Your webhook URL
   - **Triggers**: Select "Repository push"
4. Click **Save**

### 3. Configure Cargoman

Set the webhook secret (if using signed webhooks):

```bash
BITBUCKET_WEBHOOK_SECRET=your-webhook-secret
```

## Supported Events

| Event | Action |
|-------|--------|
| `repo:push` | Sync affected packages |

## Workspace Webhooks

For multiple repositories, use workspace webhooks:

1. Go to **Workspace Settings** > **Webhooks**
2. Add webhook with the same configuration
3. All repositories in the workspace will trigger syncs

## Private Repositories

For private repositories, configure Git authentication:

### App Password

1. Go to **Personal Settings** > **App passwords**
2. Create password with `repository:read` scope
3. Configure in Cargoman:

```bash
GIT_AUTH_USER=your-username
GIT_AUTH_TOKEN=your-app-password
```

### SSH Keys (Self-hosted)

1. Generate SSH key pair
2. Add public key in **Personal Settings** > **SSH keys**
3. Configure private key in Cargoman

## Bitbucket Pipelines

Example pipeline for releases:

```yaml
# bitbucket-pipelines.yml
pipelines:
  tags:
    '*':
      - step:
          name: Validate
          script:
            - composer validate

# Package sync happens automatically via webhook
```

## Bitbucket Data Center

For Bitbucket Data Center (self-hosted):

```bash
# Custom Bitbucket URL
BITBUCKET_URL=https://bitbucket.yourcompany.com
```

Note: Data Center uses different webhook formats. Ensure you're using the correct endpoint.

## Troubleshooting

### Webhook Not Working

Check webhook requests:

1. Go to **Settings** > **Webhooks**
2. Click **View requests** on your webhook
3. Review request/response details

### Authentication Issues

For repositories behind SSO:

1. Use app passwords (not your account password)
2. Ensure the app password has correct permissions
3. Verify IP restrictions allow webhook source

## Next Steps

- [GitHub integration](/docs/integrations/github)
- [GitLab integration](/docs/integrations/gitlab)
- [Stripe integration](/docs/integrations/stripe)
