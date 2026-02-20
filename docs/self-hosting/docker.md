---
sidebar_position: 2
---

# Docker Deployment

Deploy Cargoman using Docker and Docker Compose.

## Quick Start

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  cargoman:
    image: ghcr.io/byte8/cargoman:latest
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://cargoman:cargoman@db:5432/cargoman
      ADMIN_TOKEN: ${ADMIN_TOKEN:-change-me-in-production}
      BASE_URL: ${BASE_URL:-http://localhost:8080}
      STORAGE_BACKEND: filesystem
      STORAGE_PATH: /data/packages
      RUST_LOG: info
    volumes:
      - packages:/data/packages
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: cargoman
      POSTGRES_PASSWORD: cargoman
      POSTGRES_DB: cargoman
    volumes:
      - postgres:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U cargoman"]
      interval: 5s
      timeout: 5s
      retries: 5
    restart: unless-stopped

volumes:
  packages:
  postgres:
```

Start the services:

```bash
export ADMIN_TOKEN=$(openssl rand -hex 32)
docker compose up -d
```

## Environment Variables

Create a `.env` file:

```bash
# Required
ADMIN_TOKEN=your-secure-admin-token
BASE_URL=https://packages.example.com

# Database (if using external)
DATABASE_URL=postgresql://user:pass@host:5432/cargoman

# Storage
STORAGE_BACKEND=filesystem
STORAGE_PATH=/data/packages

# Logging
RUST_LOG=info,cargoman=debug
```

## With Cloud Storage

For production with Cloudflare R2:

```yaml
services:
  cargoman:
    image: ghcr.io/byte8/cargoman:latest
    environment:
      DATABASE_URL: postgresql://cargoman:cargoman@db:5432/cargoman
      ADMIN_TOKEN: ${ADMIN_TOKEN}
      BASE_URL: https://packages.example.com
      STORAGE_BACKEND: r2
      R2_ACCOUNT_ID: ${R2_ACCOUNT_ID}
      R2_ACCESS_KEY_ID: ${R2_ACCESS_KEY_ID}
      R2_SECRET_ACCESS_KEY: ${R2_SECRET_ACCESS_KEY}
      R2_BUCKET: cargoman-packages
    # No volume needed for cloud storage
```

## With Redis Cache

Add Redis for improved performance:

```yaml
services:
  cargoman:
    environment:
      REDIS_URL: redis://redis:6379
    depends_on:
      - redis

  redis:
    image: redis:7-alpine
    volumes:
      - redis:/data
    restart: unless-stopped

volumes:
  redis:
```

## With Nginx

Full production setup with TLS:

```yaml
services:
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - cargoman

  cargoman:
    # ... (as above, but remove ports)
```

Example `nginx.conf`:

```nginx
events {}

http {
    upstream cargoman {
        server cargoman:8080;
    }

    server {
        listen 80;
        server_name packages.example.com;
        return 301 https://$server_name$request_uri;
    }

    server {
        listen 443 ssl http2;
        server_name packages.example.com;

        ssl_certificate /etc/nginx/certs/fullchain.pem;
        ssl_certificate_key /etc/nginx/certs/privkey.pem;

        location / {
            proxy_pass http://cargoman;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
    }
}
```

## Health Checks

The container includes health checks:

```bash
# Check health
curl http://localhost:8080/health

# Response
{"status": "healthy", "version": "0.1.0"}
```

## Updating

```bash
# Pull latest image
docker compose pull

# Restart with new image
docker compose up -d

# Check logs
docker compose logs -f cargoman
```

## Backup

```bash
# Backup database
docker compose exec db pg_dump -U cargoman cargoman > backup.sql

# Backup packages (if using filesystem)
docker compose exec cargoman tar -czf /tmp/packages.tar.gz /data/packages
docker cp cargoman:/tmp/packages.tar.gz ./packages.tar.gz
```

## Next Steps

- [Production configuration](/docs/self-hosting/production)
- [Configure webhooks](/docs/integrations/github)
