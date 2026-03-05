---
sidebar_position: 3
---

# Configuration

Cargoman is configured through environment variables. This page covers all available options.

## Required Variables

```bash
# Database connection string
# Community edition uses SQLite by default; Pro/Cloud/Enterprise require PostgreSQL
DATABASE_URL=postgresql://user:pass@localhost:5432/cargoman

# Admin API token for management endpoints
# Supports plain text or Argon2 hashed values
ADMIN_TOKEN=your-secure-admin-token
```

## Server Configuration

```bash
# Server host (default: 0.0.0.0)
HOST=0.0.0.0

# Server port (default: 8080)
PORT=8080

# Public URL of your registry
BASE_URL=https://packages.example.com

# URL of the web app (for links in emails, etc.)
WEB_URL=https://cargoman.io

# Environment (development, staging, production)
ENVIRONMENT=production

# Request timeout in seconds (default: 30)
REQUEST_TIMEOUT=30

# Log level (default: info)
RUST_LOG=info,cargoman=debug
```

## Edition & Tenant Configuration

```bash
# Edition: community (default), pro, cloud, enterprise
EDITION=community

# Tenant mode: single (default) or multi (Cloud edition only)
TENANT_MODE=single

# License key (required for Pro and Enterprise editions)
LICENSE_KEY=your-license-key

# Tenant subdomain suffix (Cloud edition)
TENANT_SUBDOMAIN_SUFFIX=.packages.cargoman.io
```

See the [Editions guide](/docs/guides/editions) for details on edition features and limits.

## Storage Configuration

Cargoman supports two storage backends: filesystem and R2 (S3-compatible).

### Filesystem (Development)

```bash
STORAGE_BACKEND=filesystem
STORAGE_PATH=/var/lib/cargoman/packages  # default: ./data/packages
```

### Cloudflare R2 / S3-Compatible (Production)

```bash
STORAGE_BACKEND=r2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET=cargoman-packages

# Optional: custom endpoint (for MinIO, AWS S3, etc.)
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
```

### Presigned URL Redirects

For R2/S3 backends, enable presigned URL redirects to serve archives directly from storage:

```bash
# Enable presigned URL redirect for archive downloads (default: false)
STORAGE_PRESIGNED_REDIRECT=true

# Presigned URL expiry in seconds (default: 300)
STORAGE_PRESIGNED_EXPIRY=300
```

## Authentication

```bash
# Admin token — can be plain text or Argon2 hashed
ADMIN_TOKEN=your-secure-admin-token

# JWT secret for API authentication (optional)
JWT_SECRET=your-jwt-secret

# JWT expiry in seconds (default: 3600)
JWT_EXPIRY=3600

# Encryption key for sensitive data (256-bit hex string)
ENCRYPTION_KEY=your-256-bit-hex-key

# Admin IP allowlist (comma-separated CIDRs, optional)
ADMIN_IP_ALLOWLIST=10.0.0.0/8,172.16.0.0/12

# Admin HMAC secret for webhook-style admin auth (optional)
ADMIN_HMAC_SECRET=your-hmac-secret

# HMAC timestamp tolerance in seconds (default: 300)
ADMIN_HMAC_TIMESTAMP_TOLERANCE=300
```

## OAuth Providers

Configure OAuth for GitLab and Bitbucket repository access. GitHub uses the GitHub App exclusively.

```bash
# GitLab OAuth
GITLAB_CLIENT_ID=your-gitlab-client-id
GITLAB_CLIENT_SECRET=your-gitlab-client-secret

# Bitbucket OAuth
BITBUCKET_CLIENT_ID=your-bitbucket-client-id
BITBUCKET_CLIENT_SECRET=your-bitbucket-client-secret
```

## GitHub App

```bash
# GitHub App ID (numeric)
GITHUB_APP_ID=123456

# GitHub App private key (PEM format, use \n for newlines in env vars)
GITHUB_APP_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIE...\n-----END RSA PRIVATE KEY-----"

# GitHub App slug (URL-friendly name)
GITHUB_APP_SLUG=cargoman-registry

# GitHub App webhook secret
GITHUB_APP_WEBHOOK_SECRET=your-webhook-secret
```

## Git Provider Webhooks

Configure webhook secrets for automatic package sync:

```bash
GITHUB_WEBHOOK_SECRET=your-github-secret
GITLAB_WEBHOOK_SECRET=your-gitlab-secret
BITBUCKET_WEBHOOK_SECRET=your-bitbucket-secret
STRIPE_WEBHOOK_SECRET=your-stripe-secret
```

## Task Queue

Background task processing for git sync, cleanup, and other operations.

```bash
# Enable task queue (default: true)
TASK_ENABLED=true

# Number of worker threads (default: 4)
TASK_NUM_WORKERS=4

# Queue buffer size (default: 1000)
TASK_QUEUE_BUFFER_SIZE=1000

# Auto-sync interval in seconds (default: 3600)
TASK_SYNC_INTERVAL=3600

# Cleanup interval in seconds (default: 86400)
TASK_CLEANUP_INTERVAL=86400

# Audit log retention in days (default: 90)
AUDIT_LOG_RETENTION_DAYS=90

# Sync all packages on startup (default: false)
TASK_SYNC_ON_STARTUP=false

# Run cleanup on startup (default: false)
TASK_CLEANUP_ON_STARTUP=false
```

## License Enforcement

For Pro and Enterprise editions that require license validation.

```bash
# License verification URL (default: https://api.cargoman.io/v1/license/verify)
LICENSE_VERIFICATION_URL=https://api.cargoman.io/v1/license/verify

# Grace period in days for offline/failed verification (default: 7)
LICENSE_GRACE_PERIOD_DAYS=7

# Offline mode for air-gapped deployments (default: false)
LICENSE_OFFLINE=false

# Heartbeat interval in seconds (default: 86400)
LICENSE_HEARTBEAT_INTERVAL=86400

# Custom RSA public key for JWT validation (optional)
LICENSE_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIIB...\n-----END PUBLIC KEY-----"
```

## Packagist Proxy

Private proxy/mirror for Packagist packages (Pro edition or higher).

```bash
# Enable Packagist proxy (default: true for Pro+)
PROXY_ENABLED=true

# Metadata cache TTL in seconds (default: 3600)
PROXY_METADATA_TTL=3600

# Archive cache TTL in seconds (default: 86400)
PROXY_ARCHIVE_TTL=86400

# Max cache size in bytes (default: 10 GB)
PROXY_MAX_CACHE_SIZE=10737418240

# Upstream Packagist URL (default: https://repo.packagist.org)
PROXY_PACKAGIST_URL=https://repo.packagist.org

# Upstream timeout in seconds (default: 60)
PROXY_UPSTREAM_TIMEOUT=60

# Cache cleanup interval in seconds (default: 3600)
PROXY_CLEANUP_INTERVAL=3600
```

## Database Pool

```bash
# Maximum database connections (default: 10)
DATABASE_MAX_CONNECTIONS=10
```

## CORS

```bash
# Allowed CORS origins (comma-separated)
CORS_ORIGINS=https://cargoman.io,https://staging.cargoman.io
```

## GraphQL

```bash
# Enable GraphQL Playground (disable in production)
GRAPHQL_PLAYGROUND=true

# Enable GraphQL introspection (disable in production)
GRAPHQL_INTROSPECTION=true
```

## Example Configuration

### Development

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/cargoman
ADMIN_TOKEN=dev-token-change-in-production
BASE_URL=http://localhost:8080
STORAGE_BACKEND=filesystem
STORAGE_PATH=./data/packages
RUST_LOG=debug
GRAPHQL_PLAYGROUND=true
GRAPHQL_INTROSPECTION=true
```

### Production (Self-Hosted Pro)

```bash
EDITION=pro
LICENSE_KEY=${LICENSE_KEY}
DATABASE_URL=postgresql://cargoman:secure-password@db.internal:5432/cargoman
ADMIN_TOKEN=${ADMIN_TOKEN}
BASE_URL=https://packages.example.com
STORAGE_BACKEND=r2
R2_ACCOUNT_ID=${R2_ACCOUNT_ID}
R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
R2_BUCKET=cargoman-packages
STORAGE_PRESIGNED_REDIRECT=true
RUST_LOG=info
GRAPHQL_PLAYGROUND=false
GRAPHQL_INTROSPECTION=false
GITHUB_WEBHOOK_SECRET=${GITHUB_WEBHOOK_SECRET}
GITHUB_APP_ID=${GITHUB_APP_ID}
GITHUB_APP_PRIVATE_KEY=${GITHUB_APP_PRIVATE_KEY}
GITHUB_APP_WEBHOOK_SECRET=${GITHUB_APP_WEBHOOK_SECRET}
```

## Configuration File

You can also use a `.env` file in the working directory:

```bash
# .env
DATABASE_URL=postgresql://user:pass@localhost:5432/cargoman
ADMIN_TOKEN=your-token
# ... other variables
```

The server automatically loads this file on startup.

## Next Steps

- [Add your first package](/docs/guides/packages)
- [Set up customer access](/docs/guides/customers)
- [Configure webhooks](/docs/integrations/github)
- [Editions guide](/docs/guides/editions)
