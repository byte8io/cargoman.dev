---
sidebar_position: 4
---

# Production Setup

Best practices for running Cargoman in production.

## Security Checklist

- [ ] Use strong, random admin token
- [ ] Enable TLS (HTTPS)
- [ ] Restrict database access
- [ ] Configure firewall
- [ ] Enable audit logging
- [ ] Set up backups
- [ ] Monitor health

## TLS Configuration

### Using Caddy (Recommended)

Caddy automatically provisions TLS certificates:

```bash
# Caddyfile
packages.example.com {
    reverse_proxy localhost:8080
}
```

### Using Nginx with Let's Encrypt

```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d packages.example.com
```

## Database Security

### Connection String

Use environment variables for sensitive data:

```bash
DATABASE_URL=postgresql://cargoman:${DB_PASSWORD}@db.internal:5432/cargoman?sslmode=require
```

### PostgreSQL Security

```sql
-- Use strong password
ALTER USER cargoman WITH PASSWORD 'very-long-random-password';

-- Restrict connections
-- In pg_hba.conf:
-- host cargoman cargoman 10.0.0.0/8 scram-sha-256
```

### Connection Pooling

For high traffic, use PgBouncer:

```ini
[databases]
cargoman = host=localhost dbname=cargoman

[pgbouncer]
pool_mode = transaction
max_client_conn = 1000
default_pool_size = 20
```

## Storage Configuration

### Cloudflare R2 (Recommended)

```bash
STORAGE_BACKEND=r2
R2_ACCOUNT_ID=your-account-id
R2_ACCESS_KEY_ID=your-key
R2_SECRET_ACCESS_KEY=your-secret
R2_BUCKET=cargoman-packages
```

Benefits:
- Edge caching for faster downloads
- S3-compatible API
- Cost-effective egress

### Backup Strategy

For filesystem storage:

```bash
#!/bin/bash
# backup.sh
DATE=$(date +%Y%m%d)
BACKUP_DIR=/var/backups/cargoman

# Database
pg_dump -h localhost -U cargoman cargoman | gzip > $BACKUP_DIR/db-$DATE.sql.gz

# Packages (if filesystem)
tar -czf $BACKUP_DIR/packages-$DATE.tar.gz /var/lib/cargoman/packages

# Cleanup old backups (keep 30 days)
find $BACKUP_DIR -mtime +30 -delete
```

## Monitoring

### Health Endpoint

```bash
curl https://packages.example.com/health
```

### Prometheus Metrics

Enable metrics endpoint:

```bash
METRICS_ENABLED=true
METRICS_PORT=9090
```

Scrape configuration:

```yaml
scrape_configs:
  - job_name: cargoman
    static_configs:
      - targets: ['localhost:9090']
```

### Alerting

Key metrics to monitor:
- Request latency (p99 < 200ms)
- Error rate (< 1%)
- Database connections
- Storage usage
- Git sync failures

## Scaling

### Horizontal Scaling

Cargoman is stateless and can be scaled horizontally:

```yaml
services:
  cargoman:
    deploy:
      replicas: 3

  nginx:
    # Load balancer in front
```

### Database Read Replicas

For read-heavy workloads:

```bash
# Primary for writes
DATABASE_URL=postgresql://cargoman@primary:5432/cargoman

# Read replica for Composer endpoints
DATABASE_READ_URL=postgresql://cargoman@replica:5432/cargoman
```

## Logging

### Structured Logging

```bash
RUST_LOG=info,cargoman=debug
LOG_FORMAT=json
```

Example log output:

```json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "level": "INFO",
  "target": "cargoman::api",
  "message": "Package downloaded",
  "customer_id": "cust_abc123",
  "package": "vendor/package",
  "version": "2.0.0"
}
```

### Log Aggregation

Ship logs to your preferred system:
- Loki + Grafana
- Elasticsearch + Kibana
- Datadog
- CloudWatch

## Rate Limiting

Configure rate limits:

```bash
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW_SECS=60
```

For authenticated requests, limits are per-customer.

## Disaster Recovery

### Recovery Time Objective (RTO)

Target: < 1 hour

1. Restore database from backup
2. Deploy Cargoman
3. Verify health

### Recovery Point Objective (RPO)

Target: < 1 hour

- Continuous database backups
- Cloud storage durability

## Next Steps

- [Set up webhooks](/docs/integrations/github)
- [Configure Stripe integration](/docs/integrations/stripe)
