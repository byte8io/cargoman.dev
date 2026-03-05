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

| Feature | Community | Pro | Cloud | Enterprise |
|---------|-----------|-----|-------|------------|
| **Price** | Free | $24/mo | $49/mo | $499/mo |
| **Storage** | 2 GB | 50 GB | 100 GB | Unlimited |
| **Bandwidth** | 10 GB/mo | 500 GB/mo | ~1 TB/mo | Unlimited |
| **Team Seats** | 3 | Unlimited | Unlimited | Unlimited |
| **Support** | Community | Email | Priority | Dedicated + SLA |

See [Plans & Pricing](/docs/cloud/plans) for the full comparison.

## Support

- **Community**: Community forums and documentation
- **Pro**: Email support
- **Cloud**: Priority email support
- **Enterprise**: Dedicated support with SLA

## Next Steps

- [View plans and pricing](/docs/cloud/plans)
- [Set up custom domain](/docs/cloud/custom-domain)
