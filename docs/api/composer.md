---
sidebar_position: 4
---

# Composer Protocol

Cargoman implements the Composer Repository Protocol v2 for seamless integration with the Composer client.

## Endpoints

### Package Index

```http
GET /packages.json
```

Returns the repository metadata:

```json
{
  "packages": {},
  "metadata-url": "/p2/%package%.json",
  "providers-lazy-url": "/p/%package%.json"
}
```

### Package Metadata (v2)

```http
GET /p2/{vendor}/{package}.json
```

Returns package metadata for a specific package:

```json
{
  "packages": {
    "vendor/package": [
      {
        "name": "vendor/package",
        "version": "2.0.0",
        "version_normalized": "2.0.0.0",
        "dist": {
          "type": "zip",
          "url": "https://packages.example.com/dist/vendor/package/2.0.0.zip",
          "shasum": "abc123..."
        },
        "require": {
          "php": ">=8.1"
        },
        "autoload": {
          "psr-4": {
            "Vendor\\Package\\": "src/"
          }
        }
      }
    ]
  }
}
```

### Package Archive

```http
GET /dist/{vendor}/{package}/{version}.zip
```

Returns the package archive (zip file).

## Authentication

Composer uses HTTP Basic Auth. Configure your credentials:

```bash
composer config http-basic.packages.example.com token YOUR_TOKEN
```

Or in `auth.json`:

```json
{
  "http-basic": {
    "packages.example.com": {
      "username": "token",
      "password": "YOUR_TOKEN"
    }
  }
}
```

## Repository Configuration

Add Cargoman as a Composer repository:

```json
{
  "repositories": [
    {
      "type": "composer",
      "url": "https://packages.example.com"
    }
  ]
}
```

Or via CLI:

```bash
composer config repositories.cargoman composer https://packages.example.com
```

## Priority

To prefer your private packages over Packagist:

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

## Access Control

The Composer endpoints enforce customer access:

- Only packages granted to the customer are visible
- Version constraints are enforced (e.g., `^2.0` only shows 2.x versions)
- Frozen customers only see their frozen versions
- Suspended/expired customers receive 403 errors

## Error Responses

### 401 Unauthorized

```
composer install

[Composer\Downloader\TransportException]
The "https://packages.example.com/packages.json" URL could not be
accessed: HTTP/1.1 401 Unauthorized
```

**Solution**: Configure authentication credentials.

### 403 Forbidden

```
[Composer\Downloader\TransportException]
Access denied to package vendor/package
```

**Solution**: Customer doesn't have access to this package.

### 404 Not Found

```
[Composer\Downloader\TransportException]
Package vendor/package not found
```

**Solution**: Package doesn't exist in the registry.

## Caching

Composer caches package metadata. To force a refresh:

```bash
composer clear-cache
composer update --prefer-dist
```

## CI/CD Integration

### GitHub Actions

```yaml
- name: Configure Composer
  run: |
    composer config http-basic.packages.example.com token ${{ secrets.COMPOSER_TOKEN }}

- name: Install dependencies
  run: composer install --no-dev --prefer-dist
```

### GitLab CI

```yaml
before_script:
  - composer config http-basic.packages.example.com token $COMPOSER_TOKEN

install:
  script:
    - composer install --no-dev --prefer-dist
```

## Next Steps

- [REST API Reference](/docs/api/rest)
- [Token management](/docs/guides/tokens)
- [Customer management](/docs/guides/customers)
