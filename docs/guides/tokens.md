---
sidebar_position: 3
---

# Access Tokens

Cargoman uses a multi-token scoped system. Each customer can have multiple tokens with different permission levels, package restrictions, and expiration dates.

## Token Scopes

| Scope | Permissions | Use Case |
|-------|-------------|----------|
| `admin` | Full access to all operations | Admin scripts, full API access |
| `developer` | Download + upload packages | Developer workstations |
| `download` | Read-only Composer downloads | CI/CD pipelines, production servers |
| `webhook` | Webhook access only | Git provider integrations |

## Creating Tokens

Create a scoped token via the API:

```bash
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/tokens \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "CI Deploy Token",
    "scope": "download",
    "package_scopes": ["vendor/*"],
    "expires_at": "2025-12-31T23:59:59Z"
  }'
```

Or via the CLI:

```bash
cargoman token create \
  --customer cust_xyz789 \
  --scope download \
  --name "CI Deploy Token" \
  --packages "vendor/*" \
  --expires-in-days 365
```

Response (the plain token is shown **only once**):

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

## Package Scopes

Package scopes restrict which packages a token can access. Supports glob patterns:

| Pattern | Matches |
|---------|---------|
| `vendor/*` | All packages under `vendor/` |
| `vendor/specific-package` | Only `vendor/specific-package` |
| *(empty)* | All packages the customer has access to |

## Listing Tokens

```bash
# API
curl https://packages.example.com/api/v1/customers/cust_xyz789/tokens \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman token list cust_xyz789
```

Returns metadata for all tokens (plain token values are never shown again after creation):

```json
[
  {
    "id": "tok_uuid",
    "name": "CI Deploy Token",
    "scope": "download",
    "package_scopes": ["vendor/*"],
    "expires_at": "2025-12-31T23:59:59Z",
    "last_used_at": "2024-01-20T14:00:00Z",
    "last_used_ip": "203.0.113.1",
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## Rotating Tokens

Rotate a token to generate a new value while keeping the same settings (name, scope, package scopes):

```bash
# API
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/tokens/tok_uuid/rotate \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman token rotate tok_uuid
```

The old token is immediately invalidated.

## Revoking Tokens

Revoke a specific token:

```bash
# API
curl -X DELETE https://packages.example.com/api/v1/customers/cust_xyz789/tokens/tok_uuid \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# CLI
cargoman token revoke tok_uuid
```

## Legacy Endpoints

For backward compatibility, the original single-token endpoints are still available:

```bash
# Regenerate all tokens (replaces all with a single admin token)
POST /api/v1/customers/{id}/token/regenerate

# Revoke all tokens
DELETE /api/v1/customers/{id}/token
```

New integrations should use the scoped token endpoints instead.

## Composer Configuration

Customers configure Composer with their token:

```bash
# Using http-basic (token as password)
composer config http-basic.packages.example.com token tok_abc123xyz
```

Or in `auth.json`:

```json
{
  "http-basic": {
    "packages.example.com": {
      "username": "token",
      "password": "tok_abc123xyz"
    }
  }
}
```

## Token Security

Tokens are:

- **Hashed**: Stored using Argon2 (never in plain text)
- **Scoped**: Limited to specific permission levels and packages
- **Trackable**: Last used time and IP are recorded
- **Expirable**: Optional expiration dates
- **Revocable**: Can be invalidated instantly

A per-customer maximum number of tokens is enforced.

## Environment Variables for CI/CD

```bash
# GitHub Actions
COMPOSER_AUTH='{"http-basic":{"packages.example.com":{"username":"token","password":"${{ secrets.COMPOSER_TOKEN }}"}}}'

# GitLab CI
composer config http-basic.packages.example.com token $COMPOSER_TOKEN
```

## Best Practices

1. **Use scoped tokens**: Create download-only tokens for CI/CD instead of admin tokens
2. **Set expiration dates**: Especially for tokens shared with external collaborators
3. **Use package scopes**: Restrict tokens to only the packages they need
4. **Rotate regularly**: Use the rotate endpoint to refresh token values
5. **Use secrets managers**: Never commit tokens to version control
6. **Monitor usage**: Check `last_used_at` and `last_used_ip` for unusual activity
7. **Revoke on departure**: Revoke tokens when team members leave

## Next Steps

- [Customer management](/docs/guides/customers)
- [API reference](/docs/api/rest)
- [Composer protocol](/docs/api/composer)
