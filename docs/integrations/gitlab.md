---
sidebar_position: 2
---

# GitLab Integration

Automatically sync packages when you push to GitLab.

## Setup Webhook

### 1. Get Webhook URL

Your webhook URL is:
```
https://packages.example.com/api/webhooks/gitlab
```

### 2. Create Webhook in GitLab

1. Go to your project **Settings** > **Webhooks**
2. Configure:
   - **URL**: Your webhook URL
   - **Secret token**: Generate a secure secret
   - **Trigger**: Check "Push events" and "Tag push events"
3. Click **Add webhook**

### 3. Configure Cargoman

Set the webhook secret:

```bash
GITLAB_WEBHOOK_SECRET=your-webhook-secret
```

## Supported Events

| Event | Action |
|-------|--------|
| `Push Hook` | Sync affected packages |
| `Tag Push Hook` | Add/remove version |

## Group Webhooks

For multiple projects, use group-level webhooks:

1. Go to **Group Settings** > **Webhooks**
2. Add webhook with the same configuration
3. All projects in the group will trigger syncs

## GitLab CI Integration

Example pipeline for releases:

```yaml
# .gitlab-ci.yml
stages:
  - validate
  - release

validate:
  stage: validate
  script:
    - composer validate
  rules:
    - if: $CI_COMMIT_TAG

# Package sync happens automatically via webhook
```

## Private Projects

For private projects, configure Git authentication:

```bash
# Using personal access token
GITLAB_TOKEN=glpat-xxxx
```

Or use deploy tokens:

1. Go to **Settings** > **Repository** > **Deploy tokens**
2. Create token with `read_repository` scope
3. Configure in Cargoman:

```bash
GIT_AUTH_USER=gitlab+deploy-token-123
GIT_AUTH_TOKEN=your-deploy-token
```

## GitLab Self-Managed

For self-managed GitLab instances:

```bash
# Custom GitLab URL
GITLAB_URL=https://gitlab.yourcompany.com
```

Webhooks and authentication work the same as GitLab.com.

## Troubleshooting

### Webhook Delivery Failed

Check webhook logs in GitLab:

1. Go to **Settings** > **Webhooks**
2. Click **Edit** on your webhook
3. View **Recent events**

### SSL Certificate Error

For self-managed GitLab with self-signed certificates:

```bash
# Disable SSL verification (not recommended for production)
GIT_SSL_VERIFY=false
```

Better: Add your CA certificate to the system trust store.

## Next Steps

- [GitHub integration](/docs/integrations/github)
- [Bitbucket integration](/docs/integrations/bitbucket)
