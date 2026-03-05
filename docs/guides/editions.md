---
sidebar_position: 5
---

# Editions

Cargoman offers four editions with progressive feature sets and usage limits.

## Edition Overview

| | Community | Pro | Cloud | Enterprise |
|---|-----------|-----|-------|------------|
| **Hosting** | Self-hosted | Self-hosted | Managed | Dedicated |
| **Price** | Free | $24/mo | $49/mo | $499/mo |
| **Database** | SQLite | PostgreSQL | PostgreSQL | PostgreSQL |
| **Storage Backend** | Filesystem | Filesystem (configurable) | S3/R2 | S3/R2 |
| **Tenant Mode** | Single | Single | Multi-tenant | Single (dedicated) |
| **License Required** | No | Yes | No | No |

## Feature Gates

Features are progressively unlocked across editions:

### Core (All Editions)

- Unlimited packages
- REST API
- Composer Protocol v2
- Basic token authentication
- GitHub, GitLab, Bitbucket webhooks

### Pro and Above

- GraphQL API
- Vulnerability scanning (OSV, GitHub Advisory, PHP Advisory)
- Download analytics
- Custom domain
- Role-based access control (RBAC)
- Audit logs
- Packagist proxy/mirror
- SSO/LDAP
- PostgreSQL support

### Cloud and Above

- OAuth login (GitHub, GitLab)
- Global CDN
- Usage metering
- Multi-tenant support (Cloud only)

### Enterprise Only

- SAML/Active Directory
- Exportable audit logs
- Dedicated support channel
- Data residency options

## Usage Limits

| Metric | Community | Pro | Cloud | Enterprise |
|--------|-----------|-----|-------|------------|
| **Rate Limit** | 30/min | 120/min | 300/min | Unlimited |
| **Storage** | 2 GB | 50 GB | 100 GB | Unlimited |
| **Bandwidth/mo** | 10 GB | 500 GB | ~1 TB (fair use) | Unlimited |
| **Team Seats** | 3 | Unlimited | Unlimited | Unlimited |
| **Webhooks/day** | 10 | 100 | Unlimited | Unlimited |

## Configuration

Set the edition via environment variable:

```bash
# Community (default — no configuration needed)
EDITION=community

# Pro (requires license key)
EDITION=pro
LICENSE_KEY=your-license-key

# Enterprise
EDITION=enterprise
```

The Cloud edition is used internally for the managed SaaS platform and is not available in public releases.

## License Keys

Pro and Enterprise editions require a license key for activation:

- **Online validation**: License verified against `https://api.cargoman.io/v1/license/verify`
- **Grace period**: 7 days of offline operation if verification fails
- **Offline mode**: For air-gapped deployments, set `LICENSE_OFFLINE=true` with a custom public key
- **Heartbeat**: License re-verified every 24 hours by default

```bash
# Standard setup
EDITION=pro
LICENSE_KEY=your-license-key

# Air-gapped deployment
EDITION=pro
LICENSE_KEY=your-license-key
LICENSE_OFFLINE=true
LICENSE_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIB...\n-----END PUBLIC KEY-----"
```

## Feature Checking

The registry enforces feature gates at the API level. Attempting to use a feature not available in your edition returns a `403 Feature Not Available` error:

```json
{
  "error": "FEATURE_NOT_AVAILABLE",
  "message": "GraphQL API is not available in Community edition",
  "edition": "community"
}
```

Upgrade your edition to unlock the feature.

## Upgrading

To upgrade from Community to Pro:

1. Obtain a license key from [cargoman.io](https://cargoman.io/pricing)
2. Set `EDITION=pro` and `LICENSE_KEY=your-key` in your environment
3. Restart the registry
4. If upgrading database from SQLite to PostgreSQL, migrate your data first

## Next Steps

- [Plans & pricing](/docs/cloud/plans)
- [Configuration reference](/docs/getting-started/configuration)
- [Self-hosting setup](/docs/self-hosting/docker)
