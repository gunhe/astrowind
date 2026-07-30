import { getPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    { text: '首页', href: getPermalink('/') },
    { text: '我们的优势', href: getPermalink('/#advantages') },
    { text: '核心产品', href: getPermalink('/#products') },
    { text: '产品分类', href: getPermalink('/#product-categories') },
    { text: '交钥匙工程', href: getPermalink('/#solutions') },
    { text: '关于我们', href: getPermalink('/#about') },
    { text: '市场覆盖', href: getPermalink('/#market') },
    { text: '创新专利', href: getPermalink('/#patents') },
    { text: '联系我们', href: getPermalink('/#contact') },
  ],
};

export const footerData = {
  links: [
    {
      title: '快速链接',
      links: [
        { text: '首页', href: getPermalink('/') },
        { text: '我们的优势', href: getPermalink('/#advantages') },
        { text: '核心产品', href: getPermalink('/#products') },
        { text: '产品分类', href: getPermalink('/#product-categories') },
        { text: '交钥匙工程', href: getPermalink('/#solutions') },
        { text: '联系我们', href: getPermalink('/#contact') },
      ],
    },
    {
      title: '产品分类',
      links: [
        { text: 'PE拉伸膜机/缠绕膜机', href: getPermalink('/#product-categories') },
        { text: 'PVC保鲜膜机', href: getPermalink('/#product-categories') },
        { text: 'CPE/CPP 流延膜机', href: getPermalink('/#product-categories') },
        { text: 'TPU/EVA 流延膜机', href: getPermalink('/#product-categories') },
        { text: '淋膜机', href: getPermalink('/#product-categories') },
      ],
    },
    {
      title: '联系我们',
      links: [
        { text: '惠州市富利源实业有限公司', href: getPermalink('/#contact') },
        { text: '中国广东省惠州市平潭镇怡发3路', href: getPermalink('/#contact') },
        { text: 'fuliyuan@epemachine.com', href: 'mailto:fuliyuan@epemachine.com' },
        { text: '+86 18819694106', href: 'tel:+8618819694106' },
        { text: '抖音官方账号', href: getPermalink('/#contact') },
      ],
    },
  ],
  secondaryLinks: [],
  socialLinks: [],
  footNote: `
    专业薄膜机制造商，为各类工业应用提供薄膜解决方案。
  `,
};
