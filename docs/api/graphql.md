---
sidebar_position: 3
---

# GraphQL API

The GraphQL API provides flexible queries for complex data needs. Available on Pro, Cloud, and Enterprise editions.

## Endpoint

```
POST /graphql
```

## Playground

In development, access the GraphQL Playground at:

```
GET /graphql/playground
```

Enable with `GRAPHQL_PLAYGROUND=true` and `GRAPHQL_INTROSPECTION=true`.

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

  # Collections
  collection(slug: String!): Collection
  collections: [Collection!]!

  # Analytics
  downloadStats(packageName: String, period: Period): DownloadStats!

  # Vulnerabilities (Pro+)
  vulnerabilities(packageName: String): [Vulnerability!]!

  # Proxy (Pro+)
  proxyStatus: ProxyStatus!

  # Audit Logs (Pro+)
  auditLogs(filter: AuditLogFilter, pagination: Pagination): AuditLogConnection!

  # Statistics
  stats: RegistryStats!

  # GitHub App
  githubAppStatus: GitHubAppStatus!
  githubAppInstallations: [GitHubAppInstallation!]!

  # OAuth Connections
  oauthConnections: [OAuthConnection!]!
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

  # Tokens (Scoped)
  createToken(customerId: ID!, input: CreateTokenInput!): ScopedTokenCreatedResponse!
  revokeToken(customerId: ID!, tokenId: ID!): Boolean!
  rotateToken(customerId: ID!, tokenId: ID!): ScopedTokenCreatedResponse!

  # Legacy Token Operations
  regenerateToken(customerId: ID!): TokenResponse!
  revokeAllTokens(customerId: ID!): Boolean!

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

  # Collections
  createCollection(input: CreateCollectionInput!): Collection!
  updateCollection(slug: String!, input: UpdateCollectionInput!): Collection!
  deleteCollection(slug: String!): Boolean!

  # GitHub App
  removeGitHubAppInstallation(id: ID!): Boolean!
}
```

### Subscriptions

```graphql
type Subscription {
  packageSynced(name: String): PackageSyncEvent!
  customerActivity(customerId: ID): CustomerActivityEvent!
}
```

## Complexity Limiting

Query complexity is limited per edition to prevent abuse:

| Edition | Max Complexity |
|---------|---------------|
| Pro | 500 |
| Cloud | 1000 |
| Enterprise | Unlimited |

Deeply nested queries that exceed the limit will be rejected with a `QUERY_TOO_COMPLEX` error.

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

### Vulnerability Scan Results

```graphql
query Vulnerabilities($packageName: String!) {
  vulnerabilities(packageName: $packageName) {
    id
    advisory
    severity
    affectedVersions
    patchedVersions
    description
  }
}
```

### Collections

```graphql
query {
  collections {
    slug
    name
    packages {
      name
      latestVersion
    }
  }
}
```

### GitHub App Status

```graphql
query {
  githubAppStatus {
    configured
    appId
    appSlug
  }

  githubAppInstallations {
    id
    accountLogin
    accountType
    repositorySelection
    status
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

### Collection

```graphql
type Collection {
  slug: String!
  name: String!
  packages: [Package!]!
  createdAt: DateTime!
  updatedAt: DateTime!
}
```

## Next Steps

- [REST API Reference](/docs/api/rest)
- [Composer Protocol](/docs/api/composer)
