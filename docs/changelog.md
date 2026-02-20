---
sidebar_position: 100
---

# Changelog

All notable changes to Cargoman.

## [Unreleased]

### Added
- Initial public release
- Composer Protocol v2 support
- REST API for customer and package management
- GraphQL API for flexible queries
- GitHub, GitLab, Bitbucket webhook integration
- Filesystem and Cloudflare R2 storage backends
- Customer subscription lifecycle (suspend, freeze, reactivate)
- Token-based authentication with Argon2 hashing
- Multi-tenant support for Cloud deployments

### Security
- SQL injection prevention via SQLx compile-time checks
- Token hashing (never stored in plain text)
- Webhook signature verification
- Rate limiting on public endpoints

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
