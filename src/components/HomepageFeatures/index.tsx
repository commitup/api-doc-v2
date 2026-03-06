import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Translate from '@docusaurus/Translate';

type FeatureItem = {
  title: ReactNode;
  image: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: (
      <Translate id="homepage.features.global.title">
        Global Money Transfers
      </Translate>
    ),
    image: require('@site/static/img/global_transfers.png').default,
    description: (
      <Translate id="homepage.features.global.description">
        Seamlessly integrate money transfers to physical names (cash pick up),
        bank accounts, wallets, and cards worldwide using our RESTful endpoints.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.eft.title">
        EFT & Direct Payments
      </Translate>
    ),
    image: require('@site/static/img/direct_payments.png').default,
    description: (
      <Translate id="homepage.features.eft.description">
        Utilize direct EFT capabilities to Turkish Banks and powerful dynamic 
        payment firm integrations to handle high-volume transactions instantly.
      </Translate>
    ),
  },
  {
    title: (
      <Translate id="homepage.features.settlement.title">
        Comprehensive Settlement
      </Translate>
    ),
    image: require('@site/static/img/accounting_settlement.png').default,
    description: (
      <Translate id="homepage.features.settlement.description">
        Automate your accounting with detailed account information, real-time
        transaction history, and end-of-day settlement APIs.
      </Translate>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={image} className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
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
