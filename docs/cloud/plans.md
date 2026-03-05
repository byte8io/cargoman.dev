---
sidebar_position: 2
---

# Plans & Pricing

Cargoman offers four plans to match your team's needs — from free self-hosted to fully managed enterprise.

## Plan Comparison

| Feature | Community | Pro | Cloud | Enterprise |
|---------|-----------|-----|-------|------------|
| **Price** | Free | $24/mo | $49/mo | $499/mo |
| **Annual Price** | Free | $240/yr (save 17%) | $490/yr (save 17%) | $4,990/yr |
| **Hosting** | Self-hosted | Self-hosted | Managed (zero-ops) | Dedicated instance |
| **Team Seats** | 3 | Unlimited | Unlimited | Unlimited |
| **Storage** | 2 GB | 50 GB | 100 GB | Unlimited |
| **Bandwidth** | 10 GB/mo | 500 GB/mo | Unlimited (~1 TB fair use) | Unlimited |
| **Packages** | Unlimited | Unlimited | Unlimited | Unlimited |
| **Database** | SQLite | PostgreSQL | PostgreSQL | PostgreSQL |
| **REST API** | Yes | Yes | Yes | Yes |
| **GraphQL API** | - | Yes | Yes | Yes |
| **Vulnerability Scanning** | - | Yes | Yes | Yes |
| **Download Analytics** | - | Yes | Yes | Yes |
| **Packagist Proxy** | - | Yes | Yes | Yes |
| **Audit Logs** | - | Yes | Yes | Yes (exportable) |
| **Custom Domain** | - | Yes | Yes | Yes |
| **SSO/LDAP** | - | Yes | Yes | Yes |
| **OAuth Login** | - | - | Yes | Yes |
| **Global CDN** | - | - | Yes | Yes |
| **SAML/AD** | - | - | - | Yes |
| **Data Residency** | - | - | - | Yes |
| **Dedicated Support + SLA** | - | - | - | Yes |
| **Support** | Community | Email | Priority email | Dedicated |
| **License Required** | No | Yes | No | No |

## Community (Free)

The free self-hosted edition for individuals and small teams getting started.

- Unlimited packages with REST API
- Composer Protocol v2 support
- SQLite database (no external dependencies)
- Filesystem storage
- 3 team seats, 2 GB storage, 10 GB bandwidth/mo
- 30 requests/minute rate limit

## Pro ($24/mo)

Advanced self-hosted edition for teams that need more power.

- Everything in Community, plus:
- PostgreSQL database support
- GraphQL API
- Vulnerability scanning (OSV, GitHub Advisory, PHP Advisory)
- Download analytics
- Packagist proxy/mirror
- Audit logs
- Custom domain, SSO/LDAP
- Unlimited team seats
- 50 GB storage, 500 GB bandwidth/mo
- 120 requests/minute rate limit
- **Requires a license key**

## Cloud ($49/mo)

Fully managed hosting — no infrastructure to set up or maintain.

- Everything in Pro, plus:
- Zero-ops managed hosting
- OAuth login (GitHub, GitLab)
- Global CDN for fast downloads
- Usage metering dashboard
- Multi-tenant architecture
- 100 GB storage, unlimited bandwidth (~1 TB fair use)
- 300 requests/minute rate limit
- Your registry at `{tenant}.packages.cargoman.io`

## Enterprise ($499/mo)

Dedicated instance with full features for organizations with compliance needs.

- Everything in Cloud, plus:
- Dedicated instance (not shared infrastructure)
- SAML/Active Directory
- Exportable audit logs
- Data residency options
- Dedicated support with SLA
- Unlimited storage, unlimited bandwidth
- No rate limits

## Free Trial

All paid plans include a **14-day free trial** with full features. No credit card required during the trial.

## Feature Details

### Storage

Storage includes:
- Package archives (zip files)
- Metadata cache
- Version history

### Bandwidth

Bandwidth is measured per calendar month. Cloud plan has a fair-use policy (~1 TB/mo). Exceeded limits result in throttling, not blocking.

### Custom Domain

Use your own domain for your registry:
```
packages.yourdomain.com
```

Includes automatic TLS certificate provisioning (Cloud and Enterprise).

### Vulnerability Scanning

Scan packages against multiple advisory databases:
- OSV (Open Source Vulnerabilities)
- GitHub Security Advisory
- PHP Security Advisory

Available on Pro, Cloud, and Enterprise editions.

### Audit Logs

Track all actions:
- Customer creation/modification
- Token creation, rotation, revocation
- Package access changes
- Download history

Retained for 90 days (configurable). Enterprise edition supports log export.

## FAQ

### Can I upgrade/downgrade anytime?

Yes, changes are prorated and take effect immediately.

### What happens if I exceed limits?

- **Storage**: You'll be notified and asked to upgrade
- **Bandwidth**: Throttled, never blocked
- **Team Seats** (Community): Cannot add more until upgraded

### Do you offer annual billing?

Yes, save 17% with annual billing on Pro and Cloud plans. Enterprise pricing is available on request.

### Can I migrate from self-hosted to Cloud?

Yes, we provide migration tools and support. Contact support for assistance.

### Does Pro require a license key?

Yes. The Pro edition requires a valid license key for activation. You'll receive your key after subscribing. The license is validated online with an offline grace period of 7 days.

## Next Steps

- [Sign up for Cloud](https://cargoman.io/signup)
- [Editions guide](/docs/guides/editions)
- [Self-hosting setup](/docs/self-hosting/docker)
