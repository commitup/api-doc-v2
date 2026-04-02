import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
// @ts-ignore
import customers from './customers.config.json';

const customersMap = customers as Record<string, any>;
const CUSTOMER_ID = process.env.CUSTOMER_ID || 'payporter';
let activeCustomer = customersMap[CUSTOMER_ID] || customersMap['payporter'];

const hasAccess = (sidebarId: string) => {
  // Eğer activeCustomer veya allowedSidebars yoksa, default olarak TRUE dön (Full versiyon mantığı)
  if (!activeCustomer || !Array.isArray(activeCustomer.allowedSidebars)) {
    return true; 
  }
  return activeCustomer.allowedSidebars.includes(sidebarId);
};

const config: Config = {
  title: 'Payporter API Platform',
  tagline: 'Comprehensive documentation and integration guides for Payporter',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://commitup.github.io',
  baseUrl: process.env.CUSTOMER_ID ? `/api-doc-v2/${process.env.CUSTOMER_ID}/` : '/api-doc-v2/',
  
  organizationName: 'commitup',
  projectName: 'api-doc-v2',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr', 'ru'],
    localeConfigs: {
      en: { label: 'English' },
      tr: { label: 'Türkçe' },
      ru: { label: 'Русский' },
    },
  },
  
  markdown: {
    mermaid: true,
  },
  
  themes: [
    '@docusaurus/theme-mermaid',
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ["en", "tr"],
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Payporter API',
      logo: {
        alt: 'Payporter Logo',
        src: 'img/pp-logo.png',
      },
      items: [
        // Dinamik Sidebar Linkleri
        ...(hasAccess('introductionSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'introductionSidebar', position: 'left' as const, label: 'Introduction' }] : []),
        ...(hasAccess('eftSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'eftSidebar', position: 'left' as const, label: 'EFT to Turkish Banks' }] : []),
        ...(hasAccess('qrPaymentsSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'qrPaymentsSidebar', position: 'left' as const, label: 'QR Payments' }] : []),
        ...(hasAccess('moneyTransfersSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'moneyTransfersSidebar', position: 'left' as const, label: 'Money Transfers' }] : []),
        ...(hasAccess('whitelabelWalletSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'whitelabelWalletSidebar', position: 'left' as const, label: 'Whitelabel Wallet' }] : []),
        ...(hasAccess('posApiSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'posApiSidebar', position: 'left' as const, label: 'POS API' }] : []),
        
        {to: '/blog', label: 'Blog', position: 'left' as const},
        {
          type: 'localeDropdown',
          position: 'right' as const,
        },
        {
          href: 'https://github.com/commitup/api-doc-v2',
          label: 'GitHub',
          position: 'right' as const,
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Documentation',
          items: [
            ...(hasAccess('introductionSidebar') ? [{ label: 'Introduction', to: '/docs/introduction/intro' }] : []),
            ...(hasAccess('eftSidebar') ? [{ label: 'EFT to Turkish Banks', to: '/docs/eft-turkish-banks/intro' }] : []),
            ...(hasAccess('qrPaymentsSidebar') ? [{ label: 'QR Payments', to: '/docs/qr-payments/intro' }] : []),
            ...(hasAccess('moneyTransfersSidebar') ? [
              { label: 'Money Transfers', to: '/docs/money-transfers/intro' },
              { label: 'Payments', to: '/docs/payments/overview' }
            ] : []),
            ...(hasAccess('whitelabelWalletSidebar') ? [{ label: 'Whitelabel Wallet', to: '/docs/whitelabel-wallet/intro' }] : []),
            ...(hasAccess('posApiSidebar') ? [{ label: 'POS API', to: '/docs/pos-api/intro' }] : []),
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/commitup/api-doc-v2',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Payporter. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;