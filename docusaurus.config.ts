import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Cargoman',
  tagline: 'Private Composer Registry for PHP Teams',
  favicon: 'img/favicon.ico',

  // Enable Docusaurus v4 compatibility
  future: {
    v4: true,
  },

  // Production URL
  url: 'https://cargoman.dev',
  baseUrl: '/',

  // GitHub pages deployment config
  organizationName: 'byte8',
  projectName: 'cargoman',

  onBrokenLinks: 'throw',

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: 'docs',
          editUrl: 'https://github.com/byte8/cargoman/edit/main/docs/',
        },
        blog: {
          showReadingTime: true,
          blogTitle: 'Cargoman Blog',
          blogDescription: 'Latest updates, releases, and guides for Cargoman',
          postsPerPage: 10,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/byte8/cargoman/edit/main/docs/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/cargoman-social-card.png',
    navbar: {
      title: 'Cargoman',
      logo: {
        alt: 'Cargoman Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/docs/api',
          label: 'API Reference',
          position: 'left',
        },
        {
          to: '/blog',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/byte8/cargoman',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started/installation',
            },
            {
              label: 'Quick Start',
              to: '/docs/getting-started/quick-start',
            },
            {
              label: 'Configuration',
              to: '/docs/getting-started/configuration',
            },
          ],
        },
        {
          title: 'API',
          items: [
            {
              label: 'API Overview',
              to: '/docs/api/overview',
            },
            {
              label: 'REST API',
              to: '/docs/api/rest',
            },
            {
              label: 'GraphQL API',
              to: '/docs/api/graphql',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/byte8/cargoman',
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'cargoman.io',
              href: 'https://cargoman.io',
            },
            {
              label: 'byte8.io',
              href: 'https://byte8.io',
            },
          ],
        },
      ],
      copyright: `Copyright ${new Date().getFullYear()} byte8.io. All rights reserved.`,
    },
    colorMode: {
      defaultMode: 'dark',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['php', 'bash', 'rust', 'toml', 'json', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
