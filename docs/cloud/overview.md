---
sidebar_position: 1
---

# Cargoman Cloud

Managed private Composer registry with zero infrastructure to manage.

## Features

- **Instant Setup**: Your registry is ready in seconds
- **Automatic TLS**: HTTPS enabled by default
- **Global CDN**: Fast downloads worldwide
- **Automatic Backups**: Daily backups with 30-day retention
- **99.9% Uptime SLA**: Enterprise-grade reliability
- **Zero Maintenance**: We handle updates and security patches

## Getting Started

1. **Sign up** at [cargoman.io](https://cargoman.io)
2. **Create a registry** from your dashboard
3. **Add packages** from your Git repositories
4. **Configure Composer** with your registry URL

Your registry will be available at:
```
https://your-name.packages.cargoman.io
```

## Dashboard Features

### Package Management
- Add packages from GitHub, GitLab, or Bitbucket
- View all versions and download statistics
- Trigger manual syncs

### Customer Management
- Create and manage customers
- Generate access tokens
- View usage analytics

### Billing
- Manage subscription
- View invoices
- Update payment method

## API Access

Cloud registries include full API access:

```bash
# REST API
curl https://your-name.packages.cargoman.io/api/v1/packages \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# GraphQL
curl https://your-name.packages.cargoman.io/graphql \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"query": "{ packages { name } }"}'
```

## Regions

Cargoman Cloud is available in:

| Region | Location | Endpoint |
|--------|----------|----------|
| US | Virginia | `us.packages.cargoman.io` |
| EU | Frankfurt | `eu.packages.cargoman.io` |
| APAC | Singapore | `apac.packages.cargoman.io` |

Select your region during registry creation for optimal performance.

## Support

- **Starter/Scale**: Email support
- **Business**: Priority email support
- **Enterprise**: Dedicated support with SLA

## Next Steps

- [View plans and pricing](/docs/cloud/plans)
- [Set up custom domain](/docs/cloud/custom-domain)
