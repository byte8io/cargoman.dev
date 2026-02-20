# Cargoman Documentation

This is the documentation site for [Cargoman](https://cargoman.io), built with [Docusaurus](https://docusaurus.io/).

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Build for production
pnpm build

# Serve production build locally
pnpm serve
```

## Structure

```
docs/
├── docs/                 # Documentation pages
│   ├── intro.md
│   ├── getting-started/
│   ├── guides/
│   ├── api/
│   ├── self-hosting/
│   ├── cloud/
│   └── integrations/
├── blog/                 # Blog posts
├── src/
│   ├── css/             # Custom styles
│   ├── components/      # React components
│   └── pages/           # Custom pages
├── static/              # Static assets
│   └── img/             # Images and logos
├── docusaurus.config.ts # Site configuration
├── sidebars.ts          # Sidebar configuration
└── package.json
```

## Deployment

The documentation is deployed to [cargoman.dev](https://cargoman.dev).

```bash
# Build
npm run build

# Deploy (Cloudflare Pages, Vercel, Netlify, etc.)
```

## Contributing

1. Create a new branch
2. Make your changes
3. Run `npm run build` to verify
4. Submit a pull request

## Color Palette

- **Primary**: Safety Orange (#FF5722)
- **Secondary**: Deep Ocean Blue (#1976D2)
- **Background (Dark)**: Gunmetal (#1E1E1E)
- **Text**: Off-White (#F5F5F5)
