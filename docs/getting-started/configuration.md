---
sidebar_position: 3
---

# Configuration

Cargoman is configured through environment variables. This page covers all available options.

## Required Variables

```bash
# Database connection string
DATABASE_URL=postgresql://user:pass@localhost:5432/cargoman

# Admin API token for management endpoints
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

# Log level (default: info)
RUST_LOG=info,cargoman=debug
```

## Storage Configuration

Cargoman supports multiple storage backends for package archives.

### Filesystem (Development)

```bash
STORAGE_BACKEND=filesystem
STORAGE_PATH=/var/lib/cargoman/packages
```

### Cloudflare R2 (Production)

```bash
STORAGE_BACKEND=r2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-access-key
R2_SECRET_ACCESS_KEY=your-secret-key
R2_BUCKET=cargoman-packages

# Optional: custom endpoint
R2_ENDPOINT=https://your-account-id.r2.cloudflarestorage.com
```

### AWS S3

```bash
STORAGE_BACKEND=s3
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
S3_BUCKET=cargoman-packages
```

## Git Provider Webhooks

Configure webhook secrets for automatic package sync:

```bash
GITHUB_WEBHOOK_SECRET=your-github-secret
GITLAB_WEBHOOK_SECRET=your-gitlab-secret
BITBUCKET_WEBHOOK_SECRET=your-bitbucket-secret
```

## Authentication

```bash
# JWT secret for API authentication (optional)
JWT_SECRET=your-jwt-secret
JWT_EXPIRY=3600  # seconds
```

## Rate Limiting

```bash
# Rate limit for public endpoints
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_SECS=60
```

## Development Options

```bash
# Enable GraphQL Playground (disable in production)
GRAPHQL_PLAYGROUND=true
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
```

### Production

```bash
DATABASE_URL=postgresql://cargoman:secure-password@db.internal:5432/cargoman
ADMIN_TOKEN=${ADMIN_TOKEN}  # from secrets manager
BASE_URL=https://packages.example.com
STORAGE_BACKEND=r2
R2_ACCOUNT_ID=${R2_ACCOUNT_ID}
R2_ACCESS_KEY_ID=${R2_ACCESS_KEY_ID}
R2_SECRET_ACCESS_KEY=${R2_SECRET_ACCESS_KEY}
R2_BUCKET=cargoman-packages
RUST_LOG=info
GRAPHQL_PLAYGROUND=false
GITHUB_WEBHOOK_SECRET=${GITHUB_WEBHOOK_SECRET}
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
