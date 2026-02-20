---
sidebar_position: 1
---

# API Overview

Cargoman provides three APIs for different use cases:

| API | Purpose | Authentication |
|-----|---------|----------------|
| **Composer Protocol** | Package installation | Customer token |
| **REST API** | Management operations | Admin token |
| **GraphQL API** | Flexible queries | Admin token |

## Base URLs

- **Composer**: `https://packages.example.com`
- **REST API**: `https://packages.example.com/api/v1`
- **GraphQL**: `https://packages.example.com/graphql`

## Authentication

### Admin Token

For REST and GraphQL APIs, use the `Authorization` header:

```bash
curl https://packages.example.com/api/v1/packages \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Customer Token

For Composer protocol, use HTTP Basic Auth with `token` as username:

```bash
composer config http-basic.packages.example.com token $CUSTOMER_TOKEN
```

## Response Format

All REST API responses are JSON:

```json
{
  "data": { ... },
  "error": null
}
```

Errors include status code and message:

```json
{
  "data": null,
  "error": {
    "code": "NOT_FOUND",
    "message": "Customer not found"
  }
}
```

## Rate Limiting

Public endpoints are rate limited:

- **Default**: 100 requests per 60 seconds
- **Composer downloads**: Unlimited for authenticated users

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1705312800
```

## Pagination

List endpoints support pagination:

```bash
GET /api/v1/packages?page=1&per_page=20
```

Response includes pagination info:

```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "per_page": 20,
    "total": 45,
    "total_pages": 3
  }
}
```

## Next Steps

- [Multi-Tenant Authentication](/docs/api/authentication)
- [REST API Reference](/docs/api/rest)
- [GraphQL API](/docs/api/graphql)
- [Composer Protocol](/docs/api/composer)
