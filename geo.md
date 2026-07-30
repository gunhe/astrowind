角色：全栈技术专家与高级网站审计师。
任务：我正在使用 AstroWind 模板开发一个 GitHub 项目的官网。为了让 Google、ChatGPT 更好地抓取我的网站，请帮我列出一份审查清单（Audit Checklist）。

请告诉我：
1. 在 Astro 项目中，`robots.txt` 和 `sitemap.xml` 应该如何配置，才能既不拦截 AI 爬虫，又能防止敏感路径泄露？
2. 除了 `llms.txt`，我还需要在 AstroWind 的 HTML 根节点或内部组件中添加哪些属性（如 `lang`, `canonical`），才能防止多语言（i18n）导致的权重分散？
3. 如何利用 Astro 的 `Content Collections` 原生优势，来自动化生成符合语义化网格的内链系统？