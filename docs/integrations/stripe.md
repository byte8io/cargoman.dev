---
sidebar_position: 4
---

# Stripe Integration

Automate customer lifecycle based on Stripe subscription events. The Stripe webhook handler runs in the **web app** (Next.js), not in the registry.

## Overview

Cargoman's web app integrates with Stripe to automatically:
- Provision tenants when customers subscribe to Cloud plans
- Generate license keys for Pro/Enterprise subscriptions
- Suspend tenants when payments fail
- Handle plan upgrades and downgrades
- Send trial ending reminders

## Setup

### 1. Create Stripe Webhook

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click **Add endpoint**
3. Configure:
   - **Endpoint URL**: `https://cargoman.io/api/stripe/webhook` (your web app URL)
   - **Events to send**: Select events below
4. Copy the **Signing secret**

:::note
The webhook URL points to the **web app** (Next.js), not the registry. The web app handles subscription logic and provisions tenants via the registry API.
:::

### 2. Configure Environment

```bash
# Web app (.env)
STRIPE_SECRET_KEY=sk_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
STRIPE_PUBLISHABLE_KEY=pk_xxxxx

# Price IDs (one for each billing interval)
STRIPE_PRICE_PRO_MONTHLY=price_xxxxx
STRIPE_PRICE_PRO_YEARLY=price_xxxxx
STRIPE_PRICE_CLOUD_MONTHLY=price_xxxxx
STRIPE_PRICE_CLOUD_YEARLY=price_xxxxx
```

### 3. Select Events

Configure these events in Stripe:

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create subscription, provision tenant (Cloud) or generate license (Pro) |
| `customer.subscription.updated` | Handle plan changes, upgrades/downgrades |
| `customer.subscription.deleted` | Suspend tenant, cancel subscription |
| `invoice.payment_failed` | Mark subscription past_due, suspend tenant |
| `customer.subscription.trial_will_end` | Send trial ending reminder (3 days before) |

## Subscription Flow

### Checkout Completed

When a customer completes Stripe Checkout:

1. Subscription record created in the web database
2. Organization created/updated
3. **Cloud plans**: Tenant provisioned in the registry (`POST /api/v1/tenants`)
4. **Pro/Enterprise plans**: License key (JWT) generated and emailed
5. Confirmation email sent

### Plan Changes

The `customer.subscription.updated` event handles:

| Scenario | Action |
|----------|--------|
| Reactivate from suspended | Reactivate tenant |
| Upgrade to Cloud (no tenant) | Provision new tenant |
| Downgrade from Cloud | Suspend tenant |
| Payment becomes `past_due` | Suspend tenant |

### Subscription Deletion

When a subscription is canceled/deleted:
- Subscription status set to `canceled`
- Cloud tenant suspended (not deleted)

### Status Mapping

| Stripe Status | Internal Status |
|---------------|-----------------|
| `active` | `active` |
| `trialing` | `trialing` |
| `past_due` | `past_due` |
| `unpaid` | `past_due` |
| `incomplete` | `past_due` |
| `canceled` | `canceled` |
| `incomplete_expired` | `canceled` |
| `paused` | `canceled` |

## Trial Configuration

New subscriptions include a **14-day free trial** by default. This is configurable via `DEFAULT_TRIAL_PERIOD_DAYS` in `stripe-service.ts`. Set to `0` to disable trials.

A reminder email is sent 3 days before the trial ends.

## Testing

Use Stripe CLI for local testing:

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login
stripe login

# Forward webhooks to local web app
stripe listen --forward-to localhost:3000/api/stripe/webhook

# Trigger test events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.updated
stripe trigger invoice.payment_failed
```

## Subscription Lifecycle

```
┌─────────────────┐
│   Checkout       │
│   Completed      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐     ┌─────────────────┐
│     Active /    │◄────│  Subscription   │
│    Trialing     │     │   Updated       │
└────────┬────────┘     └─────────────────┘
         │
         │ Payment Failed
         ▼
┌─────────────────┐
│    Past Due     │
│  (Tenant        │
│   Suspended)    │
└────────┬────────┘
         │
         │ Subscription Deleted
         ▼
┌─────────────────┐
│    Canceled     │
└─────────────────┘
```

## Email Notifications

| Event | Email Sent |
|-------|------------|
| Checkout completed | Subscription confirmation |
| Cloud tenant provisioned | Welcome email with registry URL |
| Pro/Enterprise subscription | License key email |
| Payment failed | Payment failure notification |
| Trial ending (3 days) | Trial ending reminder |

## Next Steps

- [Customer management](/docs/guides/customers)
- [Plans & pricing](/docs/cloud/plans)
