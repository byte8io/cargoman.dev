---
sidebar_position: 1
---

# Cargoman Cloud

Managed private Composer registry with zero infrastructure to manage.

## Features

- **Instant Setup**: Your registry is ready in seconds
- **Automatic TLS**: HTTPS enabled by default
- **Global CDN**: Fast downloads worldwide (Cloud and Enterprise plans)
- **Automatic Backups**: Daily backups with 30-day retention
- **Zero Maintenance**: We handle updates and security patches
- **Multi-Tenant**: Isolated registry per customer

## Getting Started

1. **Sign up** at [cargoman.io](https://cargoman.io)
2. **Choose a plan** — start with a 14-day free trial
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
- Monorepo support

### Customer Management
- Create and manage customers
- Generate scoped access tokens
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

# GraphQL (Pro, Cloud, Enterprise)
curl https://your-name.packages.cargoman.io/graphql \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{"query": "{ packages { name } }"}'
```

## Plans

See [Plans & Pricing](https://cargoman.io/pricing) for the full comparison of features, limits, and pricing across all tiers.

## Support

- **Community**: Community forums and documentation
- **Pro**: Email support
- **Cloud**: Priority email support
- **Enterprise**: Dedicated support with SLA

## Next Steps

- [View plans and pricing](https://cargoman.io/pricing)
- [Set up custom domain](/docs/cloud/custom-domain)
