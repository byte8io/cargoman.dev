---
sidebar_position: 1
slug: /
---

# Introduction

**Cargoman** is a high-performance private Composer package registry built with Rust. It provides secure PHP package distribution with subscription-based access control, designed for extension vendors (Magento, WordPress, Laravel) and enterprises.

## Why Cargoman?

- **High Performance**: Built with Rust for maximum throughput and minimal resource usage
- **Composer Protocol v2**: Full compatibility with the Composer client
- **Git Integration**: Sync packages directly from GitHub, GitLab, or Bitbucket
- **Subscription Ready**: Built-in customer management and access control
- **Multi-Tenant**: Host multiple isolated registries from a single deployment
- **Flexible Deployment**: Self-host or use our managed cloud service

## Use Cases

### Extension Vendors

Distribute premium Magento, WordPress, or Laravel extensions to paying customers with:
- Per-customer access tokens
- Version constraints (e.g., only access `^2.0` versions)
- Subscription lifecycle management (suspend, freeze, reactivate)

### Enterprise Teams

Host internal packages securely for your organization:
- Private package hosting
- Integration with CI/CD pipelines
- Audit logging and access control

### Agencies

Manage packages for multiple clients:
- Multi-tenant isolation
- Custom domains per client
- Centralized billing

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Composer Client                       │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      Cargoman                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Composer   │  │   REST API  │  │   GraphQL API   │  │
│  │  Protocol   │  │             │  │                 │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
│                            │                             │
│  ┌─────────────────────────┴─────────────────────────┐  │
│  │                  Service Layer                     │  │
│  │   Customer │ Package │ Token │ Git │ Storage      │  │
│  └───────────────────────────────────────────────────┘  │
│                            │                             │
│  ┌─────────────────────────┴─────────────────────────┐  │
│  │                   PostgreSQL                       │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Quick Start

Get started with Cargoman in minutes:

```bash
# Configure Composer to use your registry
composer config repositories.cargoman composer https://your-registry.cargoman.io

# Authenticate with your token
composer config http-basic.your-registry.cargoman.io token YOUR_ACCESS_TOKEN

# Install packages
composer require vendor/package
```

Ready to dive deeper? Check out the [Getting Started](/docs/getting-started) guide.
