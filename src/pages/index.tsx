import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/getting-started/installation"
          >
            Get Started
          </Link>
          <Link
            className="button button--secondary button--lg"
            to="/docs/api/overview"
          >
            API Reference
          </Link>
        </div>
      </div>
    </header>
  );
}

type FeatureItem = {
  title: string;
  icon: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Composer Protocol v2',
    icon: '📦',
    description:
      'Full compatibility with Composer client. Drop-in replacement for Packagist with your private packages.',
  },
  {
    title: 'High Performance',
    icon: '⚡',
    description:
      'Built with Rust for maximum throughput and minimal resource usage. Handle thousands of requests per second.',
  },
  {
    title: 'Git Integration',
    icon: '🔗',
    description:
      'Sync packages directly from GitHub, GitLab, or Bitbucket. Automatic version detection from Git tags.',
  },
  {
    title: 'Subscription Ready',
    icon: '💳',
    description:
      'Built-in customer management, access tokens, and subscription lifecycle. Integrate with Stripe out of the box.',
  },
  {
    title: 'Multi-Tenant Cloud',
    icon: '☁️',
    description:
      'Host multiple isolated registries from a single deployment. Perfect for SaaS or agency setups.',
  },
  {
    title: 'Self-Host or Cloud',
    icon: '🏠',
    description:
      'Deploy on your infrastructure with a single binary, or use our managed cloud service.',
  },
];

function Feature({ title, icon, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>
          {title}
        </Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HomepageQuickStart() {
  return (
    <section className={styles.quickStart}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Quick Start
        </Heading>
        <div className={styles.codeBlock}>
          <pre>
            <code>
{`# Configure Composer to use your Cargoman registry
composer config repositories.cargoman composer https://packages.cargoman.io

# Authenticate with your token
composer config http-basic.packages.cargoman.io token YOUR_ACCESS_TOKEN

# Install packages
composer require vendor/package`}
            </code>
          </pre>
        </div>
        <div className={styles.quickStartLinks}>
          <Link
            className="button button--outline button--primary button--lg"
            to="/docs/getting-started/quick-start"
          >
            View Full Guide
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - Private Composer Registry`}
      description="High-performance private Composer package registry for PHP teams. Built with Rust for speed and reliability."
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomepageQuickStart />
      </main>
    </Layout>
  );
}
