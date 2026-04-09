---
sidebar_position: 7
---

# Admin Credentials (CMA Tokens)

Cargoman supports two ways to authenticate with the REST and GraphQL APIs: the root **admin token** (set via environment variable) and **CMA tokens** (per-user credentials created in the admin UI).

## Root Admin Token

The `ADMIN_TOKEN` environment variable is configured during server setup. It always has full owner-level access and serves as a recovery mechanism even after CMA tokens are created.

```bash
# Set during deployment
ADMIN_TOKEN=your-secure-admin-token

# Or use a pre-hashed value for production
ADMIN_TOKEN_HASH=$argon2id$v=19$m=19456,t=2,p=1$...
```

## CMA Tokens

CMA (Cargoman Management Admin) tokens are per-user credentials managed through the admin UI's **Team** page. They allow multiple team members to access the API with individual credentials and permission levels.

### Token Format

CMA tokens use the `cma_` prefix followed by 32 random alphanumeric characters:

```
cma_xY9kL2mN4pQ7rS1tU5vW8xZ3aB6cD9e
```

The plain token is shown **only once** at creation time and cannot be retrieved afterwards.

### Permission Levels

| Level | Permissions | Use Case |
|-------|-------------|----------|
| **Owner** | Full access + team management | Team leads, primary administrators |
| **Admin** | Manage packages, customers, tokens, collections, settings | Day-to-day operations |
| **Viewer** | Read-only access to all resources | Monitoring, auditing, dashboards |

#### Permission Details

| Action | Owner | Admin | Viewer |
|--------|-------|-------|--------|
| View packages, customers, stats | Yes | Yes | Yes |
| Create/update/delete packages | Yes | Yes | No |
| Manage customers and tokens | Yes | Yes | No |
| Manage collections | Yes | Yes | No |
| Change settings | Yes | Yes | No |
| Create/revoke CMA tokens | Yes | No | No |
| Manage team members | Yes | No | No |

### Creating CMA Tokens

CMA tokens are created in the admin UI under **Team** > **New Credential**:

1. Open the admin UI
2. Navigate to the **Team** page
3. Click **New Credential**
4. Enter a name, optional email, and select a role (owner, admin, or viewer)
5. Optionally set an expiration date
6. Copy the generated token — it will not be shown again

### Using CMA Tokens

CMA tokens are used identically to the root admin token in the `Authorization` header:

```bash
# REST API
curl https://packages.example.com/api/v1/packages \
  -H "Authorization: Bearer cma_xY9kL2mN4pQ7rS1tU5vW8xZ3aB6cD9e"

# GraphQL API
curl -X POST https://packages.example.com/graphql \
  -H "Authorization: Bearer cma_xY9kL2mN4pQ7rS1tU5vW8xZ3aB6cD9e" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ packages { edges { node { name } } } }"}'
```

### Bootstrap Flow

When no CMA credentials exist yet, the server operates in **bootstrap mode**:

1. Authenticate with the root `ADMIN_TOKEN`
2. Open the admin UI and create the first CMA credential (must be **owner** level)
3. Once created, team members can use their individual CMA tokens
4. The root `ADMIN_TOKEN` continues to work as a fallback with full owner access

### Token Security

CMA tokens are:

- **Hashed**: Stored using Argon2 (never in plain text)
- **Trackable**: Last used time and IP address are recorded
- **Expirable**: Optional expiration dates
- **Revocable**: Can be invalidated instantly from the Team page
- **Rotatable**: Generate a new token value while keeping the same settings

### Best Practices

1. **Create individual tokens**: Give each team member their own CMA token instead of sharing the root admin token
2. **Use least privilege**: Assign viewer level to users who only need to monitor
3. **Set expiration dates**: Especially for tokens used in CI/CD or shared environments
4. **Revoke on departure**: Remove CMA tokens when team members leave
5. **Keep the root token secure**: Store `ADMIN_TOKEN` securely and use it only for recovery or initial setup
