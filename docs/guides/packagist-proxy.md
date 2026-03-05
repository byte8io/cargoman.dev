---
sidebar_position: 7
---

# Packagist Proxy

Cargoman can act as a private proxy/mirror for Packagist, caching public packages alongside your private ones. Available on Pro, Cloud, and Enterprise editions.

## Overview

The Packagist proxy:

- **Caches** public package metadata and archives locally
- **Reduces** bandwidth to Packagist and speeds up installs
- **Provides** a single Composer repository URL for both private and public packages
- **Supports** Time Machine — pin to a specific date to reproduce past installs
- **Uses** LRU eviction to stay within cache size limits

## Configuration

```bash
# Enable the proxy (default: true for Pro+)
PROXY_ENABLED=true

# Metadata cache TTL in seconds (default: 3600 = 1 hour)
PROXY_METADATA_TTL=3600

# Archive cache TTL in seconds (default: 86400 = 24 hours)
PROXY_ARCHIVE_TTL=86400

# Max cache size in bytes (default: 10 GB)
PROXY_MAX_CACHE_SIZE=10737418240

# Upstream Packagist URL (default: https://repo.packagist.org)
PROXY_PACKAGIST_URL=https://repo.packagist.org

# User agent for upstream requests
PROXY_USER_AGENT=cargoman-proxy

# Upstream timeout in seconds (default: 60)
PROXY_UPSTREAM_TIMEOUT=60

# Cache cleanup interval in seconds (default: 3600)
PROXY_CLEANUP_INTERVAL=3600
```

## Composer Configuration

Point Composer at your registry as the only repository:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packages.example.com"
    },
    {
      "packagist.org": false
    }
  ]
}
```

Both private packages and proxied Packagist packages will be served from the same URL.

## Proxy Endpoints

### Proxy Archive Download

```http
GET /dist-proxy/{vendor}/{package}/{version}/{reference}.zip
```

Serves cached Packagist archives. If not in cache, fetches from upstream, caches, and serves.

## Management API

### Proxy Status

```bash
curl https://packages.example.com/api/v1/proxy/status \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Proxy Statistics

```bash
curl https://packages.example.com/api/v1/proxy/stats \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Purge Cache

```bash
curl -X POST https://packages.example.com/api/v1/proxy/purge \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Freeze / Unfreeze a Package

Prevent a specific public package from being updated (pin to current cached version):

```bash
# Freeze
curl -X POST https://packages.example.com/api/v1/proxy/freeze/vendor/package \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Unfreeze
curl -X POST https://packages.example.com/api/v1/proxy/unfreeze/vendor/package \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

### Alerts

View proxy alerts (e.g., upstream failures, cache limits):

```bash
curl https://packages.example.com/api/v1/proxy/alerts \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

## Cache Behavior

- **Metadata**: Cached for `PROXY_METADATA_TTL` seconds, then refreshed from upstream
- **Archives**: Cached for `PROXY_ARCHIVE_TTL` seconds
- **Eviction**: LRU (Least Recently Used) eviction when cache exceeds `PROXY_MAX_CACHE_SIZE`
- **Cleanup**: Background task runs every `PROXY_CLEANUP_INTERVAL` seconds

## Next Steps

- [Configuration reference](/docs/getting-started/configuration)
- [Editions](/docs/guides/editions)
- [Composer protocol](/docs/api/composer)
