# Cargoman Documentation

Private Composer registry for PHP teams.

---

## Ecosystem Overview

```
                              ┌─────────────────────────────────────┐
                              │           cargoman.io               │
                              └─────────────────────────────────────┘
                                              │
        ┌───────────────┬───────────────┬─────┴─────┬───────────────┐
        ▼               ▼               ▼           ▼               ▼
┌──────────────┐ ┌─────────────┐ ┌───────────┐ ┌─────────┐ ┌──────────────┐
│  Marketing   │ │  Customer   │ │   Admin   │ │ Package │ │    Docs      │
│    Site      │ │  Dashboard  │ │   Panel   │ │Registry │ │              │
├──────────────┤ ├─────────────┤ ├───────────┤ ├─────────┤ ├──────────────┤
│ cargoman.io  │ │app.cargoman │ │  admin.   │ │   *.    │ │ cargoman.dev │
│              │ │    .io      │ │cargoman.io│ │packages.│ │              │
│              │ │             │ │           │ │cargoman │ │              │
│              │ │             │ │           │ │  .io    │ │              │
└──────────────┘ └─────────────┘ └───────────┘ └─────────┘ └──────────────┘
       │                │               │            │
       └────────────────┴───────┬───────┴────────────┘
                                │
                    ┌───────────┴───────────┐
                    │                       │
                    ▼                       ▼
            ┌──────────────┐       ┌──────────────┐
            │ cargoman-web │       │   cargoman   │
            │   (Next.js)  │       │    (Rust)    │
            └──────────────┘       └──────────────┘
```

---

## Domains

| Domain | Purpose | Project |
|--------|---------|---------|
| `cargoman.io` | Marketing site - landing, pricing, signup | cargoman-web |
| `cargoman.io/dashboard` | Customer dashboard - manage packages, billing | cargoman-web |
| `admin.cargoman.io` | Internal admin - manage customers, subscriptions (basic auth protected) | cargoman-web |
| `*.packages.cargoman.io` | Package registries - Composer endpoints | cargoman |
| `cargoman.dev` | Documentation site | - |

---

## Projects

### cargoman (Rust)
**Path:** `cargoman.io/cargoman/`

Registry backend handling:
- Composer v2 protocol
- Package storage (filesystem/R2)
- Git sync (GitHub/GitLab/Bitbucket)
- Multi-tenant isolation
- Access control & tokens

### cargoman-web (Next.js)
**Path:** `cargoman.io/cargoman-web/`

Customer-facing application:
- Marketing pages (landing, pricing)
- User authentication (better-auth)
- Stripe billing & subscriptions
- Customer dashboard
- Tenant provisioning

### cargoman-admin (Next.js)
**Path:** `cargoman.io/cargoman-admin/`

Internal administration:
- Customer management
- Subscription overview
- Revenue analytics
- Support tools

---

## Product Tiers

| Tier | Type | Price | Features |
|------|------|-------|----------|
| Community | Self-hosted | Free | Basic registry, 5 packages |
| Pro | Self-hosted | $29/mo | Unlimited packages, GraphQL, analytics |
| Cloud Starter | SaaS | $49/mo | Managed hosting, 20GB storage |
| Cloud Scale | SaaS | $99/mo | 100GB storage, custom domain |
| Cloud Business | SaaS | $199/mo | 500GB, SSO/LDAP, audit logs |
| Enterprise | Dedicated | $499+/mo | Dedicated instance, SLA |

---

## User Flow

```
Visitor → cargoman.io (marketing)
    │
    ▼
Sign up → cargoman.io/dashboard
    │
    ├─── Pro Plan ──────► License key generated
    │                     Customer self-hosts
    │
    └─── Cloud Plan ────► Tenant provisioned
                          acme.packages.cargoman.io created
                          Customer manages via dashboard
```

---

## Technology Stack

| Component | cargoman | cargoman-web | cargoman-admin |
|-----------|----------|--------------|----------------|
| Language | Rust | TypeScript | TypeScript |
| Framework | Axum | Next.js 16 | Next.js 16 |
| Database | PostgreSQL (SQLx) | PostgreSQL (Drizzle) | PostgreSQL (Drizzle) |
| Auth | Token-based | better-auth | better-auth |
| UI | - | MUI + Tailwind | MUI + Tailwind |

---

## Related Documentation

| Document | Location | Description |
|----------|----------|-------------|
| Product Strategy | `cargoman/__DOCS/PRODUCT_STRATEGY.md` | Business model & positioning |
| Multi-Tenant Spec | `cargoman/__DOCS/MULTI_TENANT_SPEC.md` | Cloud SaaS architecture |
| Feature Roadmap | `cargoman/__DOCS/FEATURE_ROADMAP.md` | Planned features |
| Hosting Spec | `cargoman/__DOCS/HOSTING_SPEC.md` | Infrastructure & deployment |
| API Specification | `cargoman/__DOCS/API_SPECIFICATION.md` | REST API reference |
