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

// Search plugin için hangi klasörlerin hangi sidebar ile ilişkili olduğunu tanımlıyoruz
const sidebarToPathMap: Record<string, string[]> = {
  introductionSidebar: ['introduction'],
  eftSidebar: ['eft-turkish-banks'],
  qrPaymentsSidebar: ['qr-payments'],
  moneyTransfersSidebar: ['money-transfers', 'payments', 'resources'],
  whitelabelWalletSidebar: ['whitelabel-wallet'],
  posApiSidebar: ['pos-api'],
  accountingSidebar: ['accounting'],
};

const calculatedIgnorePaths: (string | RegExp)[] = [];

// Hem ana dil (en) hem de diğer dillerdeki (tr, ru vb.) doküman yollarını yakalamak için regex oluşturucu
const createDocExcludeRegex = (path: string) => {
  // Daha esnek eşleşme: docs/klasor-adi/ içeren herhangi bir route'u yakalar
  // Başındaki / veya tr/docs/ kısımlarını da kapsar
  return new RegExp(`docs/${path}(/.*)?$`, 'i');
};

// Müşterinin erişimi olmayan sidebar yollarını ignore listesine ekle
Object.keys(sidebarToPathMap).forEach(sidebarId => {
  if (!hasAccess(sidebarId)) {
    sidebarToPathMap[sidebarId].forEach(path => {
      calculatedIgnorePaths.push(createDocExcludeRegex(path));
    });
  }
});

// Explicit olarak hariç tutulan dokümanları ekle
if (activeCustomer && Array.isArray(activeCustomer.excludedDocs)) {
  activeCustomer.excludedDocs.forEach((path: string) => {
    calculatedIgnorePaths.push(createDocExcludeRegex(path));
  });
}

// Docs plugin için hariç tutulacak dosyalar (glob pattern)
const docsExclude: string[] = [];
Object.keys(sidebarToPathMap).forEach(sidebarId => {
  if (!hasAccess(sidebarId)) {
    sidebarToPathMap[sidebarId].forEach(path => {
      docsExclude.push(`${path}/**`);
    });
  }
});

// Explicit excluded docs'ları da ekle
if (activeCustomer && Array.isArray(activeCustomer.excludedDocs)) {
  activeCustomer.excludedDocs.forEach((path: string) => {
    docsExclude.push(`${path}/**`);
    docsExclude.push(`${path}.md`);
    docsExclude.push(`${path}.mdx`);
  });
}

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
    locales: ['en', 'tr', 'ru', 'zh'],
    localeConfigs: {
      en: { label: 'English' },
      tr: { label: 'Türkçe' },
      ru: { label: 'Русский' },
      zh: { label: '中文' },
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
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        ignoreFiles: calculatedIgnorePaths,
      },
    ],
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          exclude: docsExclude,
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
    image: 'img/og-social-card.png',
    metadata: [
      {name: 'keywords', content: 'payporter, api, documentation, money transfer, eft, payment'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@payporter'},
      {property: 'og:site_name', content: 'Payporter API Platform'},
      {property: 'og:type', content: 'website'},
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: CUSTOMER_ID === 'qr-api' ? undefined : 'Payporter API',
      logo: CUSTOMER_ID === 'qr-api' ? undefined : {
        alt: 'Payporter Logo',
        src: 'img/pp-logo.png',
      },
      items: [
        // Dinamik Sidebar Linkleri
        ...(hasAccess('introductionSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'introductionSidebar', position: 'left' as const, label: 'Introduction' }] : []),
        ...(hasAccess('moneyTransfersSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'moneyTransfersSidebar', position: 'left' as const, label: 'Money Transfers' }] : []),
        ...(hasAccess('eftSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'eftSidebar', position: 'left' as const, label: 'EFT to Turkish Banks' }] : []),
        ...(hasAccess('whitelabelWalletSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'whitelabelWalletSidebar', position: 'left' as const, label: 'Whitelabel Wallet' }] : []),
        ...(hasAccess('qrPaymentsSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'qrPaymentsSidebar', position: 'left' as const, label: 'QR Payments' }] : []),
        ...(hasAccess('posApiSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'posApiSidebar', position: 'left' as const, label: 'POS API' }] : []),
        ...(hasAccess('accountingSidebar') ? [{ type: 'docSidebar' as const, sidebarId: 'accountingSidebar', position: 'left' as const, label: 'Accounting' }] : []),
        
        ...(!['qr-api', 'pos'].includes(CUSTOMER_ID) ? [
          {to: '/blog', label: 'Blog', position: 'left' as const},
          {
            href: 'https://github.com/commitup/api-doc-v2',
            label: 'GitHub',
            position: 'right' as const,
          },
        ] : []),
        {
          type: 'localeDropdown',
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
            ...(hasAccess('accountingSidebar') ? [{ label: 'Accounting', to: '/docs/accounting/account-info' }] : []),
          ],
        },
        ...(CUSTOMER_ID !== 'qr-api' ? [{
          title: 'Resources',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/commitup/api-doc-v2',
            },
          ],
        }] : []),
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