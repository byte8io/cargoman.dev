---
sidebar_position: 2
---

# Multi-Tenant Authentication

Cargoman Cloud uses a **two-layer security model** that combines tenant isolation with token-based authentication.

## Security Layers

| Layer | Purpose | Mechanism |
|-------|---------|-----------|
| **Tenant Isolation** | Determines which tenant's data to access | Subdomain in URL |
| **Authentication** | Verifies the caller's identity and permissions | Bearer token in header (admin token or CMA token) |

Both layers are required for any API request. A valid token without tenant context (or vice versa) will be rejected.

## How It Works

```
┌─────────────────────────────────────────────────────────────────┐
│  Request                                                        │
│  GET https://acme.packages.cargoman.io/graphql                  │
│  Host: acme.packages.cargoman.io                                │
│  Authorization: Bearer <token>                                  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  1. Tenant Middleware                                           │
│     - Extracts subdomain "acme" from Host header                │
│     - Looks up tenant in database                               │
│     - Injects TenantContext for downstream queries              │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  2. Auth Middleware                                             │
│     - Validates Bearer token (admin token or CMA token)         │
│     - Checks token permissions (owner/admin/viewer level)       │
│     - Rejects if invalid (401 Unauthorized)                     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  3. Handler                                                     │
│     - Executes query scoped to tenant                           │
│     - Returns only that tenant's data                           │
└─────────────────────────────────────────────────────────────────┘
```

## Tenant URL Structure

Each tenant gets a unique subdomain:

```
https://{subdomain}.packages.cargoman.io
        └────┬────┘
             └── Tenant identifier (e.g., "acme", "beta-corp")
```

Examples:
- `https://acme.packages.cargoman.io` - Acme Corp's registry
- `https://beta-corp.packages.cargoman.io` - Beta Corp's registry

## Token Types

The auth middleware accepts two types of Bearer tokens:

### Root Admin Token

The `ADMIN_TOKEN` set via environment variable during server setup. This token always has full **owner**-level access.

### CMA Tokens

CMA (Cargoman Management Admin) tokens are per-user credentials created in the admin UI. They use the `cma_` prefix and are assigned one of three levels:

| Level | Permissions |
|-------|-------------|
| **Owner** | Full access to all operations + team management (create/revoke CMA tokens) |
| **Admin** | Manage packages, customers, tokens, collections, and settings |
| **Viewer** | Read-only access to all resources |

Both token types are used identically in the `Authorization` header:

```bash
# Root admin token
Authorization: Bearer $ADMIN_TOKEN

# CMA token
Authorization: Bearer cma_xY9kL2mN4pQ7rS1tU5vW8xZ3aB6cD9e
```

## REST API Examples

### List Packages (Tenant-Scoped)

```bash
# Request packages for the "acme" tenant
curl -X GET "https://acme.packages.cargoman.io/api/v1/packages" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json"
```

Response contains only Acme's packages:

```json
{
  "data": [
    {
      "id": "pkg_abc123",
      "name": "acme/payment-gateway",
      "repository_url": "https://github.com/acme/payment-gateway"
    }
  ],
  "pagination": {
    "page": 1,
    "total": 1
  }
}
```

### Create a Customer

```bash
curl -X POST "https://acme.packages.cargoman.io/api/v1/customers" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "dev@client.com",
    "name": "Client Developer"
  }'
```

### Get Package Details

```bash
curl -X GET "https://acme.packages.cargoman.io/api/v1/packages/acme/payment-gateway" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## GraphQL API Examples

### Query Packages

```bash
curl -X POST "https://acme.packages.cargoman.io/graphql" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query { packages(first: 10) { edges { node { id name repositoryUrl } } totalCount } }"
  }'
```

Response:

```json
{
  "data": {
    "packages": {
      "edges": [
        {
          "node": {
            "id": "pkg_abc123",
            "name": "acme/payment-gateway",
            "repositoryUrl": "https://github.com/acme/payment-gateway"
          }
        }
      ],
      "totalCount": 1
    }
  }
}
```

### Create Package Mutation

```bash
curl -X POST "https://acme.packages.cargoman.io/graphql" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation CreatePackage($input: CreatePackageInput!) { createPackage(input: $input) { id name } }",
    "variables": {
      "input": {
        "name": "acme/new-module",
        "repositoryUrl": "https://github.com/acme/new-module",
        "repositoryType": "git"
      }
    }
  }'
```

### Query Customers with Filtering

```bash
curl -X POST "https://acme.packages.cargoman.io/graphql" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query($filter: CustomerFilter) { customers(first: 20, filter: $filter) { edges { node { id email status } } } }",
    "variables": {
      "filter": {
        "status": "ACTIVE"
      }
    }
  }'
```

## Error Responses

### Missing or Invalid Token (401)

```json
{
  "error": "unauthorized",
  "message": "Invalid or missing authentication token"
}
```

### Tenant Not Found (404)

```json
{
  "error": "tenant_not_found",
  "message": "Tenant 'unknown' not found"
}
```

### Tenant Suspended (403)

```json
{
  "error": "tenant_suspended",
  "message": "Tenant 'acme' is suspended"
}
```

## Security Summary

| Scenario | Subdomain | Token | Result |
|----------|-----------|-------|--------|
| Valid request | `acme.packages...` | Valid | Success - returns Acme's data |
| No subdomain | `packages...` | Valid | Error - no tenant context |
| Wrong subdomain | `other.packages...` | Valid | Error - tenant not found (or other's data) |
| No token | `acme.packages...` | Missing | 401 Unauthorized |
| Invalid token | `acme.packages...` | Invalid | 401 Unauthorized |

## Composer Protocol

For Composer clients, authentication uses HTTP Basic Auth with the customer token:

```bash
# Configure Composer with customer credentials
composer config http-basic.acme.packages.cargoman.io token $CUSTOMER_TOKEN
```

The subdomain in the repository URL ensures tenant isolation:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://acme.packages.cargoman.io"
    }
  ]
}
```
