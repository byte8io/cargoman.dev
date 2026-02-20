---
sidebar_position: 3
---

# GraphQL API

The GraphQL API provides flexible queries for complex data needs.

## Endpoint

```
POST /graphql
```

## Playground

In development, access the GraphQL Playground at:

```
GET /graphql/playground
```

Enable with `GRAPHQL_PLAYGROUND=true`.

## Authentication

Use the `Authorization` header:

```bash
curl -X POST https://packages.example.com/graphql \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ customers { id name } }"}'
```

## Schema

### Queries

```graphql
type Query {
  # Customers
  customer(id: ID!): Customer
  customerByExternalId(externalId: String!): Customer
  customers(
    filter: CustomerFilter
    pagination: Pagination
  ): CustomerConnection!

  # Packages
  package(name: String!): Package
  packages(
    filter: PackageFilter
    pagination: Pagination
  ): PackageConnection!

  # Bundles
  bundle(name: String!): Bundle
  bundles: [Bundle!]!

  # Analytics
  downloadStats(packageName: String, period: Period): DownloadStats!
}
```

### Mutations

```graphql
type Mutation {
  # Customers
  createCustomer(input: CreateCustomerInput!): Customer!
  updateCustomer(id: ID!, input: UpdateCustomerInput!): Customer!
  deleteCustomer(id: ID!): Boolean!
  suspendCustomer(id: ID!, reason: String): Customer!
  reactivateCustomer(id: ID!): Customer!
  freezeCustomer(id: ID!, versions: [VersionFreeze!]): Customer!

  # Tokens
  regenerateToken(customerId: ID!): TokenResponse!
  revokeToken(customerId: ID!): Boolean!

  # Package Access
  grantPackageAccess(
    customerId: ID!
    packages: [PackageAccessInput!]!
  ): Customer!
  revokePackageAccess(customerId: ID!, packageName: String!): Customer!

  # Packages
  addPackage(input: AddPackageInput!): Package!
  syncPackage(name: String!): Package!
  deletePackage(name: String!): Boolean!

  # Bundles
  createBundle(input: CreateBundleInput!): Bundle!
  updateBundle(name: String!, input: UpdateBundleInput!): Bundle!
  deleteBundle(name: String!): Boolean!
}
```

### Subscriptions

```graphql
type Subscription {
  packageSynced(name: String): PackageSyncEvent!
  customerActivity(customerId: ID): CustomerActivityEvent!
}
```

## Example Queries

### Get Customer with Packages

```graphql
query GetCustomer($id: ID!) {
  customer(id: $id) {
    id
    name
    email
    status
    packages {
      name
      constraint
      grantedAt
    }
    token {
      createdAt
    }
  }
}
```

### List Packages with Versions

```graphql
query ListPackages($filter: PackageFilter) {
  packages(filter: $filter) {
    edges {
      node {
        name
        description
        versions {
          version
          releasedAt
          downloads
        }
        latestVersion
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

### Create Customer and Grant Access

```graphql
mutation CreateAndGrant($input: CreateCustomerInput!, $packages: [PackageAccessInput!]!) {
  createCustomer(input: $input) {
    id
    token
  }
  grantPackageAccess(customerId: $id, packages: $packages) {
    packages {
      name
    }
  }
}
```

### Download Statistics

```graphql
query Stats {
  downloadStats(period: LAST_30_DAYS) {
    totalDownloads
    byPackage {
      name
      downloads
    }
    byDay {
      date
      downloads
    }
  }
}
```

## Types

### Customer

```graphql
type Customer {
  id: ID!
  name: String!
  email: String!
  externalId: String
  status: CustomerStatus!
  packages: [PackageAccess!]!
  token: Token
  createdAt: DateTime!
  updatedAt: DateTime!
}

enum CustomerStatus {
  ACTIVE
  SUSPENDED
  FROZEN
  EXPIRED
}
```

### Package

```graphql
type Package {
  name: String!
  description: String
  repositoryUrl: String!
  type: GitProviderType!
  versions: [Version!]!
  latestVersion: String
  syncedAt: DateTime
  createdAt: DateTime!
}
```

## Next Steps

- [REST API Reference](/docs/api/rest)
- [Composer Protocol](/docs/api/composer)
