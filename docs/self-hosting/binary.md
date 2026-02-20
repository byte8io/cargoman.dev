---
sidebar_position: 3
---

# Binary Installation

Install Cargoman from pre-built binaries.

## Download

Download the latest release for your platform:

```bash
# Linux x86_64
curl -L https://github.com/byte8/cargoman/releases/latest/download/cargoman-linux-x86_64.tar.gz | tar xz

# Linux ARM64
curl -L https://github.com/byte8/cargoman/releases/latest/download/cargoman-linux-aarch64.tar.gz | tar xz

# macOS Intel
curl -L https://github.com/byte8/cargoman/releases/latest/download/cargoman-darwin-x86_64.tar.gz | tar xz

# macOS Apple Silicon
curl -L https://github.com/byte8/cargoman/releases/latest/download/cargoman-darwin-aarch64.tar.gz | tar xz
```

## Install

Move to a directory in your PATH:

```bash
sudo mv cargoman-server /usr/local/bin/
sudo mv cargoman /usr/local/bin/
sudo chmod +x /usr/local/bin/cargoman*
```

## Configuration

Create a configuration file:

```bash
sudo mkdir -p /etc/cargoman
sudo tee /etc/cargoman/.env << 'EOF'
DATABASE_URL=postgresql://cargoman:password@localhost:5432/cargoman
ADMIN_TOKEN=your-secure-admin-token
BASE_URL=https://packages.example.com
STORAGE_BACKEND=filesystem
STORAGE_PATH=/var/lib/cargoman/packages
RUST_LOG=info
EOF

sudo chmod 600 /etc/cargoman/.env
```

## Database Setup

Install and configure PostgreSQL:

```bash
# Ubuntu/Debian
sudo apt install postgresql

# Create database
sudo -u postgres createuser cargoman
sudo -u postgres createdb -O cargoman cargoman
sudo -u postgres psql -c "ALTER USER cargoman WITH PASSWORD 'password';"
```

Run migrations:

```bash
cd /usr/local/bin
cargoman-server migrate
```

## Systemd Service

Create a systemd service:

```bash
sudo tee /etc/systemd/system/cargoman.service << 'EOF'
[Unit]
Description=Cargoman Package Registry
After=network.target postgresql.service

[Service]
Type=simple
User=cargoman
Group=cargoman
EnvironmentFile=/etc/cargoman/.env
ExecStart=/usr/local/bin/cargoman-server
Restart=always
RestartSec=5

# Security
NoNewPrivileges=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/lib/cargoman

[Install]
WantedBy=multi-user.target
EOF
```

Create user and directories:

```bash
sudo useradd -r -s /bin/false cargoman
sudo mkdir -p /var/lib/cargoman/packages
sudo chown -R cargoman:cargoman /var/lib/cargoman
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable cargoman
sudo systemctl start cargoman
```

Check status:

```bash
sudo systemctl status cargoman
journalctl -u cargoman -f
```

## Build from Source

If you prefer to build from source:

```bash
# Install Rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Clone and build
git clone https://github.com/byte8/cargoman.git
cd cargoman
cargo build --release

# Install
sudo cp target/release/cargoman-server /usr/local/bin/
sudo cp target/release/cargoman /usr/local/bin/
```

## Updating

```bash
# Download new version
curl -L https://github.com/byte8/cargoman/releases/latest/download/cargoman-linux-x86_64.tar.gz | tar xz

# Stop service
sudo systemctl stop cargoman

# Replace binaries
sudo mv cargoman-server /usr/local/bin/
sudo mv cargoman /usr/local/bin/

# Run migrations
cargoman-server migrate

# Start service
sudo systemctl start cargoman
```

## Next Steps

- [Production configuration](/docs/self-hosting/production)
- [Set up TLS with Caddy](/docs/self-hosting/production#reverse-proxy)
