---
sidebar_position: 3
---

# Access Tokens

Each customer receives an access token for Composer authentication. Tokens are securely hashed and cannot be retrieved after creation.

## Token Format

Tokens are prefixed for easy identification:

```
tok_abc123xyz...
```

## Regenerating Tokens

If a token is compromised, regenerate it:

```bash
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/token/regenerate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

Response:

```json
{
  "token": "tok_new_secret_xyz",
  "created_at": "2024-01-15T10:30:00Z"
}
```

The old token is immediately invalidated.

## Revoking Tokens

Revoke a token without generating a new one:

```bash
curl -X DELETE https://packages.example.com/api/v1/customers/cust_xyz789/token \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

The customer will lose access until a new token is generated.

## Composer Configuration

Customers configure Composer with their token:

```bash
# Using http-basic (token as password)
composer config http-basic.packages.example.com token tok_abc123xyz

# Or in auth.json
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
- **Unique**: Each customer has one active token
- **Revocable**: Can be invalidated instantly
- **Audited**: All token usage is logged

## Environment Variables

For CI/CD, use environment variables:

```bash
# GitHub Actions
COMPOSER_AUTH='{"http-basic":{"packages.example.com":{"username":"token","password":"${{ secrets.COMPOSER_TOKEN }}"}}}'

# GitLab CI
composer config http-basic.packages.example.com token $COMPOSER_TOKEN
```

## Best Practices

1. **Rotate regularly**: Regenerate tokens periodically
2. **Use secrets managers**: Never commit tokens to version control
3. **Monitor usage**: Check download logs for unusual activity
4. **Revoke on employee departure**: Regenerate tokens when team members leave

## Next Steps

- [Subscription lifecycle](/docs/guides/subscriptions)
- [Customer management](/docs/guides/customers)
- [API reference](/docs/api/rest)
