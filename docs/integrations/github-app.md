---
sidebar_position: 1
---

# GitHub App Integration

GitHub App integration provides the most secure and feature-rich way to connect Cargoman with your GitHub repositories. Unlike OAuth, GitHub Apps offer:

- **Fine-grained permissions** - Request only the access you need
- **Organization-level installation** - One installation covers all repos
- **Higher API rate limits** - 5,000 requests/hour per installation
- **No user token expiration** - Installation tokens auto-refresh
- **Webhook events** - Automatic sync on push events

## When to Use GitHub App vs OAuth

| Feature | GitHub App | OAuth |
|---------|------------|-------|
| Best for | Organizations, Teams | Individual users |
| Rate limits | 5,000/hour per installation | 5,000/hour per user |
| Token management | Automatic | Manual refresh needed |
| Permissions | Granular, per-repo | User's full access |
| Webhook support | Built-in | Requires manual setup |

## Creating a GitHub App

### Step 1: Register the App

1. Go to **GitHub Settings** > **Developer settings** > **GitHub Apps**
2. Click **New GitHub App**
3. Fill in the required fields:

| Field | Value |
|-------|-------|
| **GitHub App name** | `Cargoman Registry` (or your preferred name) |
| **Homepage URL** | `https://your-web-domain.com` (e.g., `https://cargoman.io`) |
| **Callback URL** | `https://your-web-domain.com/api/auth/callback/github` (for user OAuth login) |
| **Setup URL** | `https://your-web-domain.com/dashboard/connections` (redirect after install) |
| **Webhook URL** | `https://your-registry-domain.com/api/webhooks/github-app` (e.g., `https://packages.cargoman.io/api/webhooks/github-app`) |
| **Webhook secret** | Generate with `openssl rand -hex 20` (or `-hex 32` for longer) |

> **Note:** The Callback URL points to the **web app** (for user authentication), while the Webhook URL points to the **registry** (for push events). These are typically different domains.

### Step 2: Configure Permissions

Under **Repository permissions**, set:

| Permission | Access Level | Purpose |
|------------|--------------|---------|
| **Contents** | Read-only | Clone repositories, read composer.json |
| **Metadata** | Read-only | List repositories (required) |
| **Webhooks** | Read and write | Auto-create webhooks for sync |

Under **Account permissions**:

| Permission | Access Level | Purpose |
|------------|--------------|---------|
| **Email addresses** | Read-only | (Optional) User identification |

### Step 3: Subscribe to Events

Under **Subscribe to events**, enable:

- `Push` - Trigger sync on new commits
- `Create` - Detect new tags/releases
- `Release` - Detect published releases
- `Repository` - Track repo changes
- `Installation` - Track app installations

### Step 4: Installation Options

Choose where the app can be installed:

- **Only on this account** - For private/internal use
- **Any account** - For public distribution

### Step 5: Generate Private Key

1. After creating the app, scroll to **Private keys**
2. Click **Generate a private key**
3. Download the `.pem` file securely
4. **Keep this file safe** - you cannot download it again

### Step 6: Note Your App Credentials

From your app's settings page, note:

- **App ID** (numeric, e.g., `123456`)
- **App slug** (URL-friendly name, e.g., `cargoman-registry`)
- **Client ID** (for OAuth fallback, starts with `Iv1.`)
- **Client secret** (generate if using OAuth features)

## Configuring Cargoman

### Environment Variables

Add these to your `.env` file:

```bash
# Required
GITHUB_APP_ID=123456
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEA...
...your key content...
-----END RSA PRIVATE KEY-----"

# Optional but recommended
GITHUB_APP_SLUG=cargoman-registry
GITHUB_APP_WEBHOOK_SECRET=your-webhook-secret
```

**Note on Private Key Format:**

The private key can be provided in several ways:

1. **Inline with escaped newlines:**
   ```bash
   GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----"
   ```

2. **Via config file** (recommended for production):
   ```yaml
   # config.yaml
   github_app:
     app_id: 123456
     private_key: |
       -----BEGIN RSA PRIVATE KEY-----
       MIIEpAIBAAKCAQEA...
       -----END RSA PRIVATE KEY-----
     app_slug: cargoman-registry
     webhook_secret: your-secret
   ```

3. **From file path** (not yet supported, use config file instead)

## Installing the App

### For Your Organization

1. Navigate to your GitHub App's public page:
   ```
   https://github.com/apps/your-app-slug
   ```

2. Click **Install** or **Configure**

3. Choose the organization or account

4. Select repository access:
   - **All repositories** - Access all current and future repos
   - **Only select repositories** - Choose specific repos

5. Click **Install**

### Via Cargoman API

Get the installation URL programmatically:

```bash
curl -H "Authorization: Bearer $ADMIN_TOKEN" \
  https://your-domain.com/api/v1/github-app/install-url
```

Response:
```json
{
  "url": "https://github.com/apps/cargoman-registry/installations/new"
}
```

## API Endpoints

### Check GitHub App Status

```bash
GET /api/v1/github-app/status

# Response when configured:
{
  "configured": true,
  "app_id": 123456,
  "app_slug": "cargoman-registry"
}

# Response when not configured:
{
  "configured": false
}
```

### List Installations

```bash
GET /api/v1/github-app/installations

# Response:
{
  "installations": [
    {
      "id": "uuid",
      "github_installation_id": 12345678,
      "account_login": "my-org",
      "account_type": "Organization",
      "repository_selection": "all",
      "status": "active",
      "installed_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

### List Accessible Repositories

```bash
GET /api/v1/github-app/installations/{id}/repositories

# Response:
{
  "repositories": [
    {
      "id": 123456789,
      "name": "my-package",
      "full_name": "my-org/my-package",
      "private": true,
      "default_branch": "main"
    }
  ]
}
```

## Webhook Events

Cargoman handles these GitHub App webhook events:

| Event | Action |
|-------|--------|
| `installation.created` | Record new installation |
| `installation.deleted` | Remove installation |
| `installation.suspend` | Mark installation suspended |
| `installation.unsuspend` | Reactivate installation |
| `push` | Trigger package sync |
| `create` (tag) | Sync new version |
| `release.published` | Sync new release |

## Credential Resolution Order

When syncing a repository, Cargoman uses credentials in this order:

1. **GitHub App installation token** (if app is installed for that repo)
2. **User OAuth token** (if user connected via OAuth)
3. **Configured deploy key** (for specific repo access)

This fallback ensures maximum compatibility while preferring the most secure option.

## Troubleshooting

### "GitHub App not configured"

Ensure both `GITHUB_APP_ID` and `GITHUB_APP_PRIVATE_KEY` are set.

### "Invalid private key"

- Check the key starts with `-----BEGIN RSA PRIVATE KEY-----`
- Verify newlines are preserved (use `\n` in env vars or YAML block scalar)
- Ensure no extra whitespace

### "Installation not found"

- Verify the app is installed on the target organization/user
- Check the installation hasn't been suspended
- Ensure repository access includes the target repo

### "Rate limit exceeded"

GitHub Apps have a 5,000 requests/hour limit per installation. If exceeded:
- Wait for the rate limit to reset
- Consider spreading sync operations
- Check for infinite sync loops

### Webhook not triggering

1. Verify webhook URL is publicly accessible
2. Check webhook secret matches `GITHUB_APP_WEBHOOK_SECRET`
3. Review webhook deliveries in GitHub App settings
4. Check Cargoman logs for webhook processing errors

## Security Best Practices

1. **Protect the private key** - Never commit to version control
2. **Use webhook secrets** - Verify all incoming webhooks
3. **Minimal permissions** - Only request necessary access
4. **Audit installations** - Regularly review active installations
5. **Rotate keys periodically** - Generate new private keys annually

## GraphQL Support

GitHub App status and installations are also available via GraphQL:

```graphql
query {
  githubAppStatus {
    configured
    appId
    appSlug
  }

  githubAppInstallations {
    id
    accountLogin
    accountType
    repositorySelection
    status
  }
}

mutation {
  removeGitHubAppInstallation(id: "uuid") {
    success
  }
}
```
