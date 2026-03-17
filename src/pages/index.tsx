import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import Translate, {translate} from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          <Translate id="homepage.title" description="The title of the homepage">
            {siteConfig.title}
          </Translate>
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline" description="The tagline of the homepage">
            {siteConfig.tagline}
          </Translate>
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/introduction/intro">
            <Translate id="homepage.visitButton" description="The label for the main call to action button">
              View API Documentation
            </Translate>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={translate({message: siteConfig.title, id: 'homepage.layoutTitle'})}
      description={translate({
        message: 'Payporter API Platform - Comprehensive documentation and integration guides.',
        id: 'homepage.layoutDescription'
      })}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
