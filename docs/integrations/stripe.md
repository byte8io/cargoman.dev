---
sidebar_position: 4
---

# Stripe Integration

Automate customer lifecycle based on Stripe subscription events.

## Overview

Integrate Cargoman with Stripe to automatically:
- Create customers when subscriptions start
- Suspend customers when payments fail
- Reactivate customers when payments succeed
- Freeze or expire customers when subscriptions end

## Setup

### 1. Create Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Configure:
   - **Endpoint URL**: `https://packages.example.com/api/webhooks/stripe`
   - **Events to send**: Select events below
4. Copy the **Signing secret**

### 2. Configure Cargoman

```bash
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

### 3. Select Events

Configure these events in Stripe:

| Event | Cargoman Action |
|-------|-----------------|
| `customer.subscription.created` | Create customer |
| `customer.subscription.updated` | Update status |
| `customer.subscription.deleted` | Freeze/expire customer |
| `invoice.paid` | Reactivate if suspended |
| `invoice.payment_failed` | Suspend customer |

## Customer Mapping

Link Stripe customers to Cargoman using `external_id`:

```json
// Stripe customer ID -> Cargoman external_id
{
  "external_id": "cus_abc123"
}
```

### Create Customer via API

When a Stripe subscription is created:

```bash
curl -X POST https://packages.example.com/api/v1/customers \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Name",
    "email": "customer@example.com",
    "external_id": "cus_abc123"
  }'
```

### Lookup Customer

Find customer by Stripe ID:

```bash
curl https://packages.example.com/api/v1/customers/by-external/cus_abc123 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Webhook Handler Example

```rust
// Pseudo-code for handling Stripe webhooks
async fn handle_stripe_webhook(event: StripeEvent) -> Result<()> {
    match event.type_ {
        "customer.subscription.created" => {
            let sub = event.data.object;
            let customer = create_cargoman_customer(
                sub.customer,
                sub.metadata.get("email"),
            ).await?;

            // Grant package access based on plan
            grant_plan_access(&customer, &sub.items).await?;
        }

        "invoice.payment_failed" => {
            let invoice = event.data.object;
            suspend_customer_by_stripe_id(
                invoice.customer,
                "Payment failed",
            ).await?;
        }

        "invoice.paid" => {
            let invoice = event.data.object;
            reactivate_customer_by_stripe_id(invoice.customer).await?;
        }

        "customer.subscription.deleted" => {
            let sub = event.data.object;
            // Option 1: Freeze to current versions
            freeze_customer_by_stripe_id(sub.customer).await?;
            // Option 2: Expire completely
            // expire_customer_by_stripe_id(sub.customer).await?;
        }

        _ => {}
    }
    Ok(())
}
```

## Plan to Package Mapping

Map Stripe products/prices to package bundles:

```json
{
  "price_basic": ["vendor/core"],
  "price_pro": ["vendor/core", "vendor/pro-features"],
  "price_enterprise": ["vendor/core", "vendor/pro-features", "vendor/enterprise"]
}
```

Configure in environment:

```bash
STRIPE_PRICE_MAPPING='{"price_xxx":["vendor/core"],"price_yyy":["vendor/core","vendor/pro"]}'
```

## Testing

Use Stripe CLI for local testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:8080/api/webhooks/stripe

# Trigger test events
stripe trigger customer.subscription.created
```

## Subscription Lifecycle

```
┌─────────────────┐
│   Subscription  │
│     Created     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│     Active      │◄────│   Invoice Paid  │
└────────┬────────┘     └─────────────────┘
         │
         │ Payment Failed
         ▼
┌─────────────────┐
│    Suspended    │
│  (Grace Period) │
└────────┬────────┘
         │
         │ Subscription Deleted
         ▼
┌─────────────────┐
│ Frozen/Expired  │
└─────────────────┘
```

## Next Steps

- [Customer management](/docs/guides/customers)
- [Subscription lifecycle](/docs/guides/subscriptions)
