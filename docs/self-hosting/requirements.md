---
sidebar_position: 1
---

# System Requirements

Requirements for self-hosting Cargoman.

## Minimum Requirements

| Component | Requirement |
|-----------|-------------|
| **CPU** | 1 vCPU |
| **Memory** | 512 MB RAM |
| **Storage** | 10 GB (depends on package count) |
| **OS** | Linux (x86_64, aarch64), macOS |

## Recommended for Production

| Component | Requirement |
|-----------|-------------|
| **CPU** | 2+ vCPUs |
| **Memory** | 2 GB RAM |
| **Storage** | SSD with 50+ GB |
| **OS** | Ubuntu 22.04 LTS or similar |

## Software Dependencies

### Required

- **PostgreSQL 14+**: Primary database
- **Git 2.30+**: For repository cloning

### Optional

- **Redis 6+**: For caching (improves performance)
- **Nginx/Caddy**: Reverse proxy with TLS

## Storage Backends

### Filesystem

For development or small deployments:
- Local disk with sufficient space
- Mount point for package archives

### Cloud Storage

For production:
- **Cloudflare R2**: Recommended (S3-compatible, cost-effective)
- **AWS S3**: Fully supported
- **MinIO**: Self-hosted S3-compatible storage

## Network Requirements

### Inbound

| Port | Protocol | Purpose |
|------|----------|---------|
| 80 | HTTP | Redirect to HTTPS |
| 443 | HTTPS | API and Composer protocol |

### Outbound

| Destination | Purpose |
|-------------|---------|
| Git providers | Clone repositories |
| Cloud storage | Package archive storage |
| PostgreSQL | Database connection |

## Docker Requirements

If using Docker:
- Docker 20.10+
- Docker Compose 2.0+
- 1 GB disk for images

## Build from Source

If building from source:
- Rust 1.75+ (Edition 2024)
- Cargo
- libpq-dev (PostgreSQL client library)
- libssl-dev (OpenSSL)
- pkg-config

```bash
# Ubuntu/Debian
apt install build-essential libpq-dev libssl-dev pkg-config

# macOS
brew install postgresql openssl
```

## Next Steps

- [Docker deployment](/docs/self-hosting/docker)
- [Binary installation](/docs/self-hosting/binary)
- [Production setup](/docs/self-hosting/production)
