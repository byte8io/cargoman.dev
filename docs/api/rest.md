---
sidebar_position: 2
---

# REST API Reference

Complete reference for the Cargoman REST API.

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

## Tokens

### Regenerate Token

```http
POST /api/v1/customers/{id}/token/regenerate
```

Response:

```json
{
  "token": "tok_new_xyz",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Revoke Token

```http
DELETE /api/v1/customers/{id}/token
```

---

## Package Access

### List Customer Packages

```http
GET /api/v1/customers/{id}/packages
```

### Grant Package Access

```http
POST /api/v1/customers/{id}/packages
```

```json
{
  "package": "vendor/package",
  "constraint": "^2.0"
}
```

### Update Package Access

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

### Revoke Package Access

```http
DELETE /api/v1/customers/{id}/packages/{package}
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
GET /api/v1/packages/{name}
```

### Sync Package

```http
POST /api/v1/packages/{name}/sync
```

### Delete Package

```http
DELETE /api/v1/packages/{name}
```

---

## Bundles

Bundles group packages for easier access management.

### List Bundles

```http
GET /api/v1/bundles
```

### Create Bundle

```http
POST /api/v1/bundles
```

```json
{
  "name": "enterprise",
  "packages": ["vendor/core", "vendor/analytics", "vendor/support"]
}
```

### Update Bundle

```http
PATCH /api/v1/bundles/{name}
```

### Delete Bundle

```http
DELETE /api/v1/bundles/{name}
```

---

## Webhooks

### GitHub Webhook

```http
POST /api/webhooks/github
```

### GitLab Webhook

```http
POST /api/webhooks/gitlab
```

### Bitbucket Webhook

```http
POST /api/webhooks/bitbucket
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
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Server error |
