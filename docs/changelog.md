---
sidebar_position: 100
---

# Changelog

All notable changes to Cargoman.

## [Unreleased]

### Added
- **Editions system**: 4-tier edition model (Community, Pro, Cloud, Enterprise) with progressive feature gating and usage limits
- **Scoped tokens**: Multi-token system with admin, developer, download, and webhook scopes; package-level restrictions; expiration dates; token rotation
- **Collections**: Group packages into collections for plan-based access management (replaces bundles)
- **Vulnerability scanning**: Integration with OSV, GitHub Security Advisory, and PHP Security Advisory databases; Composer security advisories endpoint; CLI audit command with text/JSON/JUnit/SARIF output
- **Packagist proxy/mirror**: Private proxy for Packagist packages with metadata/archive caching, LRU eviction, Time Machine, and freeze/unfreeze
- **GitHub App integration**: Full GitHub App support for secure repository access, automatic webhook configuration, and installation management
- **OAuth connections**: GitLab and Bitbucket OAuth for repository access
- **Audit logging**: Track all administrative actions with configurable retention (90 days default)
- **Download analytics**: Per-package, per-version, and daily download statistics
- **CLI tool**: Full-featured CLI with commands for init, serve, migrate, db, customer, package, token, import (satis/packagist/git), and audit
- **Monorepo support**: Add and sync monorepo packages with glob-pattern child detection
- **Version management**: Yank/unyank and deprecate package versions
- **License enforcement**: Online verification with offline grace period, air-gapped mode
- **Task queue**: Background task processing for git sync, cleanup, and other operations
- **Presigned URL redirects**: Serve archives directly from R2/S3 storage
- **Tenant management**: Full CRUD with suspend/reactivate/change-plan lifecycle
- **Usage metering**: Per-tenant storage and bandwidth tracking
- **CORS configuration**: Configurable allowed origins
- **Admin IP allowlist**: CIDR-based access restriction for admin endpoints
- **HMAC authentication**: Webhook-style admin auth with timestamp tolerance

### Core (from initial release)
- Composer Protocol v2 support
- REST API for customer and package management
- GraphQL API for flexible queries (Pro+)
- GitHub, GitLab, Bitbucket webhook integration
- Filesystem and Cloudflare R2 storage backends
- Customer subscription lifecycle (active, suspended, frozen, expired)
- Token-based authentication with Argon2 hashing
- Multi-tenant support for Cloud deployments

### Security
- SQL injection prevention via SQLx compile-time checks
- Token hashing (never stored in plain text)
- Webhook signature verification (GitHub, GitLab, Bitbucket, Stripe, GitHub App)
- Rate limiting per edition
- Feature gating prevents unauthorized access to edition-locked features
- Encryption key support for sensitive data

---

## Versioning

Cargoman follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes to API or configuration
- **MINOR**: New features, backwards compatible
- **PATCH**: Bug fixes, backwards compatible

## Release Schedule

- **Stable releases**: Monthly
- **Security patches**: As needed
- **Breaking changes**: Announced 30 days in advance

## Upgrade Guide

See the [upgrade documentation](/docs/self-hosting/production#updating) for instructions on updating your installation.
