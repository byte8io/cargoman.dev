---
sidebar_position: 2
---

# Plans & Pricing

Choose the right plan for your needs.

## Cloud Plans

| Feature | Starter | Scale | Business | Enterprise |
|---------|---------|-------|----------|------------|
| **Price** | $49/mo | $99/mo | $199/mo | Custom |
| **Storage** | 20 GB | 100 GB | 500 GB | Unlimited |
| **Packages** | 50 | 200 | Unlimited | Unlimited |
| **Customers** | 100 | 500 | Unlimited | Unlimited |
| **Downloads** | 10K/mo | 50K/mo | Unlimited | Unlimited |
| **Custom Domain** | - | Yes | Yes | Yes |
| **SSO/LDAP** | - | - | Yes | Yes |
| **Audit Logs** | - | - | Yes | Yes |
| **SLA** | - | 99.5% | 99.9% | 99.99% |
| **Support** | Email | Email | Priority | Dedicated |

## Self-Hosted Plans

| Feature | Community | Pro |
|---------|-----------|-----|
| **Price** | Free | $29/mo |
| **License** | AGPL-3.0 | Commercial |
| **Packages** | 5 | Unlimited |
| **Customers** | 10 | Unlimited |
| **GraphQL API** | - | Yes |
| **Analytics** | - | Yes |
| **Priority Support** | - | Yes |

## Feature Details

### Storage

Storage includes:
- Package archives (zip files)
- Metadata cache
- Version history

### Downloads

Download limits are per calendar month. Exceeded limits result in throttling, not blocking.

### Custom Domain

Use your own domain:
```
packages.yourdomain.com
```

Includes automatic TLS certificate provisioning.

### SSO/LDAP

Integrate with:
- Google Workspace
- Microsoft Entra ID (Azure AD)
- Okta
- Custom SAML/OIDC providers
- LDAP

### Audit Logs

Track all actions:
- Customer creation/modification
- Token regeneration
- Package access changes
- Download history

Logs retained for 1 year.

## FAQ

### Can I upgrade/downgrade anytime?

Yes, changes are prorated and take effect immediately.

### What happens if I exceed limits?

- **Storage**: You'll be notified and asked to upgrade
- **Downloads**: Throttled to 1 request/second, never blocked
- **Packages/Customers**: Cannot add more until upgraded

### Is there a free trial?

Yes, all Cloud plans include a 14-day free trial with full features.

### Do you offer annual billing?

Yes, save 20% with annual billing. Contact sales for enterprise pricing.

### Can I migrate from self-hosted to Cloud?

Yes, we provide migration tools and support. Contact support for assistance.

## Next Steps

- [Sign up for Cloud](https://cargoman.io/signup)
- [Set up custom domain](/docs/cloud/custom-domain)
