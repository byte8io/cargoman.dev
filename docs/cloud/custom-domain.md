---
sidebar_position: 3
---

# Custom Domain

Use your own domain for your Cargoman Cloud registry.

*Available on Scale, Business, and Enterprise plans.*

## Setup

### 1. Add Domain in Dashboard

1. Go to **Settings** > **Custom Domain**
2. Enter your domain (e.g., `packages.yourdomain.com`)
3. Click **Add Domain**

### 2. Configure DNS

Add a CNAME record pointing to your registry:

```
packages.yourdomain.com  CNAME  your-name.packages.cargoman.io
```

Example DNS configuration:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | packages | your-name.packages.cargoman.io | 3600 |

### 3. Verify Domain

Click **Verify** in the dashboard. Verification typically takes 1-5 minutes.

### 4. Enable TLS

TLS certificates are provisioned automatically via Let's Encrypt. This may take up to 10 minutes.

## Using Your Custom Domain

Update your Composer configuration:

```bash
# Before
composer config repositories.cargoman composer https://your-name.packages.cargoman.io

# After
composer config repositories.cargoman composer https://packages.yourdomain.com
```

Update authentication:

```bash
composer config http-basic.packages.yourdomain.com token $CUSTOMER_TOKEN
```

## Multiple Domains

You can add multiple custom domains for different environments:

- `packages.yourdomain.com` - Production
- `packages-staging.yourdomain.com` - Staging

Each domain points to the same registry.

## Troubleshooting

### DNS Not Propagating

DNS changes can take up to 48 hours to propagate globally. Check propagation:

```bash
dig packages.yourdomain.com CNAME
```

### TLS Certificate Error

If TLS provisioning fails:

1. Ensure DNS is correctly configured
2. Remove and re-add the domain
3. Contact support if issues persist

### Mixed Content Warning

Ensure your Composer configuration uses `https://`:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packages.yourdomain.com"
    }
  ]
}
```

## Removing a Custom Domain

1. Go to **Settings** > **Custom Domain**
2. Click **Remove** next to the domain
3. Update your Composer configuration to use the default domain

## Next Steps

- [Manage customers](/docs/guides/customers)
- [Set up webhooks](/docs/integrations/github)
