---
sidebar_position: 2
---

# Managing Customers

Customers are the users who can access your private packages. Each customer has an access token for Composer authentication.

## Creating a Customer

```bash
curl -X POST https://packages.example.com/api/v1/customers \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corporation",
    "email": "dev@acme.com",
    "external_id": "stripe_cus_abc123"
  }'
```

Response:

```json
{
  "id": "cust_xyz789",
  "name": "Acme Corporation",
  "email": "dev@acme.com",
  "external_id": "stripe_cus_abc123",
  "token": "tok_secret_xyz",
  "status": "active",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Customer Status

Customers can have the following statuses:

| Status | Description | Package Access |
|--------|-------------|----------------|
| `active` | Normal state | Full access |
| `suspended` | Temporarily blocked (e.g., payment failed) | No access |
| `frozen` | Locked to specific versions | Limited access |
| `expired` | Subscription ended | No access |

### Suspend a Customer

Temporarily block access (e.g., payment failure with grace period):

```bash
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/suspend \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"reason": "Payment failed"}'
```

### Reactivate a Customer

Restore access after payment is resolved:

```bash
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/reactivate \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Freeze a Customer

Lock to specific versions (subscription ended, but allow existing installs):

```bash
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/freeze \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "versions": [
      {"package": "vendor/package", "version": "2.0.0"}
    ]
  }'
```

## Package Access

Grant access to specific packages:

```bash
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/packages \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "package": "vendor/package",
    "constraint": "^2.0"
  }'
```

### Version Constraints

| Constraint | Description |
|------------|-------------|
| `*` | All versions |
| `^2.0` | Semver compatible with 2.x |
| `>=1.0 <3.0` | Range |
| `2.0.0` | Exact version |

### Revoke Access

```bash
curl -X DELETE https://packages.example.com/api/v1/customers/cust_xyz789/packages/vendor%2Fpackage \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## External IDs

Use `external_id` to link customers to your e-commerce or billing system:

```bash
# Find customer by Stripe customer ID
curl https://packages.example.com/api/v1/customers/by-external/stripe_cus_abc123 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

This is useful for webhook integrations with Stripe, Paddle, or your custom system.

## Next Steps

- [Manage tokens](/docs/guides/tokens)
- [Subscription lifecycle](/docs/guides/subscriptions)
- [Stripe integration](/docs/integrations/stripe)
