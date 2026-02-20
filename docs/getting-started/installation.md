---
sidebar_position: 1
---

# Installation

Cargoman can be deployed in several ways depending on your needs.

## Cloud (Recommended)

The easiest way to get started is with Cargoman Cloud:

1. Sign up at [cargoman.io](https://cargoman.io)
2. Create your registry
3. Start adding packages

No installation required. Your registry will be available at `your-name.packages.cargoman.io`.

## Docker

Deploy Cargoman using Docker:

```bash
docker run -d \
  --name cargoman \
  -p 8080:8080 \
  -e DATABASE_URL=postgresql://user:pass@host:5432/cargoman \
  -e ADMIN_TOKEN=your-secure-token \
  -v /var/lib/cargoman:/data \
  ghcr.io/byte8/cargoman:latest
```

### Docker Compose

```yaml
version: '3.8'

services:
  cargoman:
    image: ghcr.io/byte8/cargoman:latest
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://cargoman:cargoman@db:5432/cargoman
      ADMIN_TOKEN: ${ADMIN_TOKEN}
      STORAGE_BACKEND: filesystem
      STORAGE_PATH: /data/packages
    volumes:
      - cargoman-data:/data
    depends_on:
      - db

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: cargoman
      POSTGRES_PASSWORD: cargoman
      POSTGRES_DB: cargoman
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  cargoman-data:
  postgres-data:
```

## Binary

Download the pre-built binary for your platform:

```bash
# Linux (x86_64)
curl -L https://github.com/byte8/cargoman/releases/latest/download/cargoman-linux-x86_64 -o cargoman
chmod +x cargoman

# macOS (Apple Silicon)
curl -L https://github.com/byte8/cargoman/releases/latest/download/cargoman-darwin-aarch64 -o cargoman
chmod +x cargoman

# Run the server
./cargoman serve --port 8080
```

## From Source

Build from source using Cargo:

```bash
# Clone the repository
git clone https://github.com/byte8/cargoman.git
cd cargoman

# Build release binary
cargo build --release

# Run the server
./target/release/cargoman-server
```

### Requirements

- Rust 1.75+ (Edition 2024)
- PostgreSQL 14+
- (Optional) Redis for caching

## Next Steps

After installation:

1. [Configure your environment](/docs/getting-started/configuration)
2. [Add your first package](/docs/guides/packages)
3. [Create customer access tokens](/docs/guides/tokens)
