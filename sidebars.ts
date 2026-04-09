import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/installation',
        'getting-started/quick-start',
        'getting-started/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        'guides/packages',
        'guides/customers',
        'guides/tokens',
        'guides/subscriptions',
        'guides/editions',
        'guides/vulnerability-scanning',
        'guides/packagist-proxy',
      ],
    },
    'cli',
    {
      type: 'category',
      label: 'API Reference',
      items: [
        'api/overview',
        'api/rest',
        'api/graphql',
        'api/composer',
      ],
    },
    {
      type: 'category',
      label: 'Self-Hosting',
      items: [
        'self-hosting/requirements',
        'self-hosting/docker',
        'self-hosting/binary',
        'self-hosting/production',
      ],
    },
    {
      type: 'category',
      label: 'Cloud',
      items: [
        'cloud/overview',
        'cloud/custom-domain',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      items: [
        'integrations/github',
        'integrations/github-app',
        'integrations/gitlab',
        'integrations/bitbucket',
      ],
    },
    'changelog',
  ],
};

export default sidebars;
