---
sidebar_position: 2
---

# REST API Reference

Complete reference for the Cargoman REST API. All endpoints require admin authentication via the `Authorization: Bearer <ADMIN_TOKEN>` header unless noted otherwise.

## Customers

### Create Customer

```http
POST /api/v1/customers
```

```json
{
  "name": "Acme Corp",
  "email": "dev@acme.com",
  "external_id": "stripe_cus_abc123"
}
```

### List Customers

```http
GET /api/v1/customers
GET /api/v1/customers?status=active&page=1&per_page=20
```

### Get Customer

```http
GET /api/v1/customers/{id}
GET /api/v1/customers/by-external/{external_id}
```

### Update Customer

```http
PATCH /api/v1/customers/{id}
```

```json
{
  "name": "Acme Corporation",
  "email": "team@acme.com"
}
```

### Delete Customer

```http
DELETE /api/v1/customers/{id}
```

### Suspend Customer

```http
POST /api/v1/customers/{id}/suspend
```

```json
{
  "reason": "Payment failed"
}
```

### Reactivate Customer

```http
POST /api/v1/customers/{id}/reactivate
```

### Freeze Customer

```http
POST /api/v1/customers/{id}/freeze
```

```json
{
  "versions": [
    {"package": "vendor/package", "version": "2.0.0"}
  ]
}
```

---

## Tokens (Scoped)

Cargoman uses a multi-token scoped system. Each customer can have multiple tokens with different permissions.

### Create Token

```http
POST /api/v1/customers/{id}/tokens
```

```json
{
  "name": "CI Deploy Token",
  "scope": "download",
  "package_scopes": ["vendor/*"],
  "expires_at": "2025-12-31T23:59:59Z"
}
```

**Scopes:**

| Scope | Description |
|-------|-------------|
| `admin` | Full admin access (default) |
| `developer` | Download + upload packages |
| `download` | Read-only Composer downloads |
| `webhook` | Webhook access only |

**Package scopes** restrict token access to specific packages. Supports glob patterns (e.g., `vendor/*`, `vendor/specific-package`).

Response (token is shown only once):

```json
{
  "token": {
    "id": "tok_uuid",
    "name": "CI Deploy Token",
    "scope": "download",
    "package_scopes": ["vendor/*"],
    "expires_at": "2025-12-31T23:59:59Z",
    "created_at": "2024-01-15T10:30:00Z"
  },
  "plain_token": "tok_abc123xyz",
  "composer_auth": {
    "username": "token",
    "password": "tok_abc123xyz",
    "repository_url": "https://packages.example.com"
  }
}
```

### List Tokens

```http
GET /api/v1/customers/{id}/tokens
```

### Get Token

```http
GET /api/v1/customers/{id}/tokens/{token_id}
```

### Revoke Token

```http
DELETE /api/v1/customers/{id}/tokens/{token_id}
```

### Rotate Token

Generate a new token value while keeping the same settings (name, scope, package scopes):

```http
POST /api/v1/customers/{id}/tokens/{token_id}/rotate
```

### Legacy Token Endpoints

For backward compatibility, the original single-token endpoints are still available:

```http
POST   /api/v1/customers/{id}/token/regenerate
DELETE /api/v1/customers/{id}/token
```

### Issue JWT

```http
POST /api/v1/customers/{id}/jwt
```

Requires `JWT_SECRET` to be configured. Returns a signed JWT for the customer.

---

## Package Access

### List Customer Packages

```http
GET /api/v1/customers/{id}/packages
```

### Replace Package Access

```http
PUT /api/v1/customers/{id}/packages
```

```json
{
  "packages": [
    {"package": "vendor/core", "constraint": "*"},
    {"package": "vendor/addon", "constraint": "^1.0"}
  ]
}
```

### Add Package Access

```http
POST /api/v1/customers/{id}/packages
```

```json
{
  "package": "vendor/package",
  "constraint": "^2.0"
}
```

### Remove Package Access

```http
DELETE /api/v1/customers/{id}/packages/{vendor}/{name}
```

### Reverse Lookup: Customers by Package

```http
GET /api/v1/packages/{vendor}/{name}/customers
```

---

## Packages

### List Packages

```http
GET /api/v1/packages
```

### Add Package

```http
POST /api/v1/packages
```

```json
{
  "name": "vendor/package",
  "repository_url": "https://github.com/vendor/package.git",
  "type": "github"
}
```

### Get Package

```http
GET /api/v1/packages/{vendor}/{name}
```

### Delete Package

```http
DELETE /api/v1/packages/{vendor}/{name}
```

### Sync Package

```http
POST /api/v1/packages/{vendor}/{name}/sync
```

### Yank Version

Remove a version from being installable (does not delete the archive):

```http
POST /api/v1/packages/{vendor}/{name}/yank/{version}
```

### Unyank Version

```http
POST /api/v1/packages/{vendor}/{name}/unyank/{version}
```

### Deprecate Version

```http
POST /api/v1/packages/{vendor}/{name}/deprecate/{version}
```

### Package README

```http
GET /api/v1/packages/{vendor}/{name}/readme
```

### Validate Package

```http
POST /api/v1/packages/{vendor}/{name}/validate
```

### Admin Download

```http
GET /api/v1/packages/{vendor}/{name}/download/{version}
```

### Webhook Deliveries

```http
GET /api/v1/packages/{vendor}/{name}/webhook-deliveries
```

### Monorepo Support

```http
GET  /api/v1/packages/{vendor}/{name}/monorepo
POST /api/v1/packages/{vendor}/{name}/monorepo/sync
GET  /api/v1/packages/{vendor}/{name}/monorepo/children
```

---

## Collections

Collections group packages for easier access management (replaces the old "bundles" concept).

### List Collections

```http
GET /api/v1/collections
```

### Create Collection

```http
POST /api/v1/collections
```

```json
{
  "name": "Enterprise Suite",
  "slug": "enterprise",
  "packages": ["vendor/core", "vendor/analytics", "vendor/support"]
}
```

### Get Collection

```http
GET /api/v1/collections/{slug}
```

### Update Collection

```http
PATCH /api/v1/collections/{slug}
```

### Delete Collection

```http
DELETE /api/v1/collections/{slug}
```

---

## Statistics

```http
GET /api/v1/stats
GET /api/v1/stats/packages/{vendor}/{name}
GET /api/v1/stats/packages/{vendor}/{name}/versions/{version}
GET /api/v1/stats/daily
```

---

## Tasks

```http
GET  /api/v1/tasks
GET  /api/v1/tasks/pending
GET  /api/v1/tasks/running
GET  /api/v1/tasks/failed
POST /api/v1/tasks
POST /api/v1/tasks/sync-all
POST /api/v1/tasks/cleanup
```

---

## Vulnerabilities

Requires Pro edition or higher.

```http
GET  /api/v1/vulnerabilities
GET  /api/v1/vulnerabilities/{id}
POST /api/v1/vulnerabilities/scan
```

---

## Tenants

Available in Cloud edition (multi-tenant mode) only.

```http
GET    /api/v1/tenants
POST   /api/v1/tenants
GET    /api/v1/tenants/{id}
PATCH  /api/v1/tenants/{id}
DELETE /api/v1/tenants/{id}
POST   /api/v1/tenants/{id}/suspend
POST   /api/v1/tenants/{id}/reactivate
POST   /api/v1/tenants/{id}/change-plan
```

### Tenant Usage & Notifications

```http
GET /api/v1/tenants/{id}/usage
GET /api/v1/tenants/{id}/notifications
```

---

## OAuth Connections

```http
POST /api/v1/oauth/gitlab/initiate
GET  /api/v1/oauth/gitlab/status
POST /api/v1/oauth/gitlab/disconnect
POST /api/v1/oauth/bitbucket/initiate
GET  /api/v1/oauth/bitbucket/status
POST /api/v1/oauth/bitbucket/disconnect
GET  /api/v1/oauth/connections
```

---

## GitHub App

```http
GET  /api/v1/github-app/status
GET  /api/v1/github-app/install-url
GET  /api/v1/github-app/installations
POST /api/v1/github-app/installations/claim
GET  /api/v1/github-app/installations/{id}
POST /api/v1/github-app/installations/{id}/sync
GET  /api/v1/github-app/installations/{id}/repositories
GET  /api/v1/github-app/installations/by-github-id/{id}
```

---

## License

```http
GET /api/v1/license
```

Returns current license information (Pro/Enterprise editions).

---

## Audit Logs

```http
GET /api/v1/audit
```

Returns audit log entries. Retained for 90 days by default (configurable via `AUDIT_LOG_RETENTION_DAYS`).

---

## Proxy

Packagist proxy/mirror management (Pro edition or higher).

```http
GET  /api/v1/proxy/status
GET  /api/v1/proxy/stats
POST /api/v1/proxy/purge
POST /api/v1/proxy/freeze/{vendor}/{name}
POST /api/v1/proxy/unfreeze/{vendor}/{name}
GET  /api/v1/proxy/alerts
```

---

## Webhooks (Git Providers)

These endpoints do **not** require admin auth — they use signature verification.

```http
POST /api/webhooks/github
POST /api/webhooks/gitlab
POST /api/webhooks/bitbucket
POST /api/webhooks/github-app
POST /api/webhooks/stripe
```

---

## Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid request body |
| `UNAUTHORIZED` | 401 | Invalid or missing token |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `CONFLICT` | 409 | Resource already exists |
| `FEATURE_NOT_AVAILABLE` | 403 | Feature not available in current edition |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
