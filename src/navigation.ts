import { getPermalink, getBlogPermalink, getAsset } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: '首页',
      links: [
        {
          text: 'SaaS',
          href: getPermalink('/homes/saas'),
        },
        {
          text: '创业公司',
          href: getPermalink('/homes/startup'),
        },
        {
          text: '移动应用',
          href: getPermalink('/homes/mobile-app'),
        },
        {
          text: '个人主页',
          href: getPermalink('/homes/personal'),
        },
      ],
    },
    {
      text: '页面',
      links: [
        {
          text: '功能特性（锚点链接）',
          href: getPermalink('/#features'),
        },
        {
          text: '服务',
          href: getPermalink('/services'),
        },
        {
          text: '价格',
          href: getPermalink('/pricing'),
        },
        {
          text: '关于我们',
          href: getPermalink('/about'),
        },
        {
          text: '联系我们',
          href: getPermalink('/contact'),
        },
        {
          text: '服务条款',
          href: getPermalink('/terms'),
        },
        {
          text: '隐私政策',
          href: getPermalink('/privacy'),
        },
      ],
    },
    {
      text: '落地页',
      links: [
        {
          text: '线索获取',
          href: getPermalink('/landing/lead-generation'),
        },
        {
          text: '长篇销售页',
          href: getPermalink('/landing/sales'),
        },
        {
          text: '点击转化',
          href: getPermalink('/landing/click-through'),
        },
        {
          text: '产品详情（或服务）',
          href: getPermalink('/landing/product'),
        },
        {
          text: '即将上线或预发布',
          href: getPermalink('/landing/pre-launch'),
        },
        {
          text: '订阅',
          href: getPermalink('/landing/subscription'),
        },
      ],
    },
    {
      text: '博客',
      links: [
        {
          text: '博客列表',
          href: getBlogPermalink(),
        },
        {
          text: '文章',
          href: getPermalink('get-started-website-with-astro-tailwind-css', 'post'),
        },
        {
          text: 'MDX 文章',
          href: getPermalink('markdown-elements-demo-post', 'post'),
        },
        {
          text: '分类页面',
          href: getPermalink('tutorials', 'category'),
        },
        {
          text: '标签页面',
          href: getPermalink('astro', 'tag'),
        },
      ],
    },
  ],
};

export const footerData = {
  links: [
    {
      title: '产品',
      links: [
        { text: '功能特性', href: '#' },
        { text: '安全', href: '#' },
        { text: '团队', href: '#' },
        { text: '企业版', href: '#' },
        { text: '客户案例', href: '#' },
        { text: '价格', href: '#' },
        { text: '资源', href: '#' },
      ],
    },
    {
      title: '平台',
      links: [
        { text: '开发者 API', href: '#' },
        { text: '合作伙伴', href: '#' },
        { text: 'Atom', href: '#' },
        { text: 'Electron', href: '#' },
        { text: 'AstroWind Desktop', href: '#' },
      ],
    },
    {
      title: '支持',
      links: [
        { text: '文档', href: '#' },
        { text: '社区论坛', href: '#' },
        { text: '专业服务', href: '#' },
        { text: '技能', href: '#' },
        { text: '系统状态', href: '#' },
      ],
    },
    {
      title: '公司',
      links: [
        { text: '关于', href: '#' },
        { text: '博客', href: '#' },
        { text: '招聘', href: '#' },
        { text: '媒体报道', href: '#' },
        { text: '多元包容', href: '#' },
        { text: '社会影响', href: '#' },
        { text: '商店', href: '#' },
      ],
    },
  ],
  secondaryLinks: [
    { text: '服务条款', href: getPermalink('/terms') },
    { text: '隐私政策', href: getPermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/gunhe/astrowind/tree/dev' },
  ],
  footNote: `
    由 <a class="text-blue-600 underline dark:text-muted" href="https://www.geetest.com/">xxxx科技有限公司 Copyright © 2012-2026</a> 制作 · 保留所有权利。
  `,
};
