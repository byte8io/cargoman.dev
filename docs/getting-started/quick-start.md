---
sidebar_position: 2
---

# Quick Start

Get your private Composer registry up and running in 5 minutes.

## Prerequisites

- Docker and Docker Compose installed
- A domain or subdomain for your registry (optional for local testing)

## Step 1: Start the Server

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  cargoman:
    image: ghcr.io/byte8/cargoman:latest
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://cargoman:cargoman@db:5432/cargoman
      ADMIN_TOKEN: change-this-to-a-secure-token
      BASE_URL: http://localhost:8080
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: cargoman
      POSTGRES_PASSWORD: cargoman
      POSTGRES_DB: cargoman
```

Start the services:

```bash
docker compose up -d
```

## Step 2: Add a Package

Add a package from a Git repository:

```bash
curl -X POST http://localhost:8080/api/v1/packages \
  -H "Authorization: Bearer change-this-to-a-secure-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "vendor/package",
    "repository_url": "https://github.com/vendor/package.git",
    "type": "github"
  }'
```

## Step 3: Create a Customer

Create a customer who can access your packages:

```bash
curl -X POST http://localhost:8080/api/v1/customers \
  -H "Authorization: Bearer change-this-to-a-secure-token" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Acme Corp",
    "email": "dev@acme.com"
  }'
```

This returns a customer with an access token:

```json
{
  "id": "cust_abc123",
  "name": "Acme Corp",
  "email": "dev@acme.com",
  "token": "tok_xyz789",
  "status": "active"
}
```

## Step 4: Grant Package Access

Grant the customer access to your package:

```bash
curl -X POST http://localhost:8080/api/v1/customers/cust_abc123/packages \
  -H "Authorization: Bearer change-this-to-a-secure-token" \
  -H "Content-Type: application/json" \
  -d '{
    "package": "vendor/package",
    "constraint": "*"
  }'
```

## Step 5: Configure Composer

Your customer can now configure Composer to use your registry:

```bash
# Add the repository
composer config repositories.my-registry composer http://localhost:8080

# Configure authentication
composer config http-basic.localhost token tok_xyz789

# Install packages
composer require vendor/package
```

## What's Next?

- [Configure production settings](/docs/getting-started/configuration)
- [Learn about customer management](/docs/guides/customers)
- [Set up Git webhooks for automatic sync](/docs/integrations/github)
- [Explore the REST API](/docs/api/rest)
