---
sidebar_position: 4
---

# Subscription Lifecycle

Cargoman provides built-in support for subscription-based access control, designed to integrate with payment providers like Stripe.

## Lifecycle States

```
┌──────────┐     ┌───────────┐     ┌─────────┐
│  Active  │────▶│ Suspended │────▶│ Expired │
└──────────┘     └───────────┘     └─────────┘
     │                 │
     │                 ▼
     │           ┌──────────┐
     └──────────▶│  Frozen  │
                 └──────────┘
```

### Active

- Customer has full access to granted packages
- Normal operating state

### Suspended

- Temporary block (e.g., payment failed)
- Used during grace period before cancellation
- Customer receives error when trying to download

### Frozen

- Customer locked to specific versions
- Can still download frozen versions
- No access to newer releases

### Expired

- Subscription fully cancelled
- No access to any packages

## Integration with Stripe

### Webhook Events

Handle Stripe webhooks to manage customer lifecycle:

```rust
// Stripe webhook handler (pseudo-code)
match event.type {
    "customer.subscription.updated" => {
        if subscription.status == "past_due" {
            cargoman.suspend_customer(customer_id, "Payment past due");
        }
    },
    "customer.subscription.deleted" => {
        cargoman.freeze_customer(customer_id, current_versions);
        // or: cargoman.expire_customer(customer_id);
    },
    "invoice.paid" => {
        cargoman.reactivate_customer(customer_id);
    }
}
```

### Grace Period

Implement a grace period for failed payments:

1. Payment fails -> Suspend customer
2. Wait 7-14 days for retry
3. If paid -> Reactivate
4. If not paid -> Freeze or expire

## Version Freezing

When freezing a customer, specify which versions they can access:

```bash
curl -X POST https://packages.example.com/api/v1/customers/cust_xyz789/freeze \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "versions": [
      {"package": "vendor/core", "version": "2.5.0"},
      {"package": "vendor/addon", "version": "1.2.0"}
    ]
  }'
```

The customer can still download these specific versions but not newer ones.

## Typical Flows

### New Customer

1. Customer signs up and pays
2. Create customer in Cargoman with `external_id` = Stripe customer ID
3. Grant package access
4. Customer configures Composer

### Payment Failure

1. Stripe sends `invoice.payment_failed` webhook
2. Suspend customer with reason
3. Customer sees error on `composer install`
4. After grace period, freeze or expire

### Subscription Renewal

1. Stripe sends `invoice.paid` webhook
2. If suspended, reactivate customer
3. Customer access restored

### Cancellation

1. Customer cancels in your dashboard
2. Stripe sends `customer.subscription.deleted`
3. Freeze customer to current versions
4. Customer can still use existing code

## API Reference

```bash
# Suspend
POST /api/v1/customers/{id}/suspend
Body: {"reason": "Payment failed"}

# Reactivate
POST /api/v1/customers/{id}/reactivate

# Freeze
POST /api/v1/customers/{id}/freeze
Body: {"versions": [...]}

# Get customer status
GET /api/v1/customers/{id}
```

## Next Steps

- [Stripe integration guide](/docs/integrations/stripe)
- [Customer management](/docs/guides/customers)
- [API reference](/docs/api/rest)
