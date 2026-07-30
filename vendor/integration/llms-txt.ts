import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { AstroIntegration } from 'astro';
import { Readability } from '@mozilla/readability';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

export interface LlmsTxtOptions {
  /**
   * Output file name under Astro's build directory.
   */
  filename?: string;
  /**
   * Site title used as the top-level heading.
   */
  siteTitle?: string;
  /**
   * Optional intro placed before page entries.
   */
  description?: string;
  /**
   * Paths excluded from llms.txt. Supports strings, regexes, and predicates.
   */
  exclude?: Array<string | RegExp | ((pathname: string) => boolean)>;
}

const DEFAULT_EXCLUDES: NonNullable<LlmsTxtOptions['exclude']> = [
  '/404',
  '/rss.xml',
  '/sitemap-index.xml',
  '/robots.txt',
  /^\/tag\//,
  /^\/category\//,
];

const normalizePathname = (pathname: string): string => {
  if (!pathname) return '/';
  return pathname.startsWith('/') ? pathname : `/${pathname}`;
};

const getHtmlPath = (distDir: string, pathname: string): string => {
  const normalizedPathname = normalizePathname(pathname);
  const cleanPathname = normalizedPathname === '/' ? 'index.html' : normalizedPathname.replace(/^\//, '');

  if (path.extname(cleanPathname)) {
    return path.join(distDir, cleanPathname);
  }

  return path.join(distDir, cleanPathname, 'index.html');
};

const getMetaContent = (document: Document, selector: string): string => {
  const node = document.querySelector(selector);
  return node?.getAttribute('content')?.trim() || '';
};

const normalizeText = (value: string | undefined | null): string => (value || '').replace(/\s+/g, ' ').trim();

const isExcluded = (pathname: string, excludes: NonNullable<LlmsTxtOptions['exclude']>): boolean =>
  excludes.some((rule) => {
    if (typeof rule === 'string') {
      return pathname === rule || pathname.startsWith(`${rule}/`);
    }

    if (rule instanceof RegExp) {
      return rule.test(pathname);
    }

    return rule(pathname);
  });

export default function llmsTxtIntegration(options: LlmsTxtOptions = {}): AstroIntegration {
  const filename = options.filename || 'llms.txt';
  const excludes = [...DEFAULT_EXCLUDES, ...(options.exclude || [])];

  return {
    name: 'astrowind-llms-txt',
    hooks: {
      'astro:build:done': async ({ dir, pages, logger }) => {
        const distDir = fileURLToPath(dir);
        const outputPath = path.join(distDir, filename);
        const turndown = new TurndownService({
          bulletListMarker: '-',
          codeBlockStyle: 'fenced',
          headingStyle: 'atx',
        });

        const entries = pages
          .map(({ pathname }) => normalizePathname(pathname))
          .filter((pathname) => !isExcluded(pathname, excludes))
          .map((pathname) => ({
            pathname,
            htmlPath: getHtmlPath(distDir, pathname),
          }))
          .filter(({ htmlPath }) => fs.existsSync(htmlPath));

        const sections = entries.flatMap(({ pathname, htmlPath }) => {
          try {
            const html = fs.readFileSync(htmlPath, 'utf8');
            const dom = new JSDOM(html, { url: new URL(pathname, 'https://example.com').href });
            const { document } = dom.window;
            const article = new Readability(document).parse();

            if (!article?.content) {
              logger.warn(`Skipping ${pathname}: readable content was not found.`);
              return [];
            }

            const title = normalizeText(document.querySelector('title')?.textContent || article.title);
            const description =
              normalizeText(getMetaContent(document, 'meta[name="description"]')) || normalizeText(article.excerpt);
            const canonical = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || pathname;
            const markdown = turndown.turndown(article.content).trim();

            return [
              [
                `## ${title || pathname}`,
                '',
                `URL: ${canonical}`,
                description ? `Description: ${description}` : '',
                '',
                markdown,
              ]
                .filter(Boolean)
                .join('\n'),
            ];
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            logger.warn(`Skipping ${pathname}: ${message}`);
            return [];
          }
        });

        const content = [
          `# ${options.siteTitle || 'Website Content'}`,
          options.description || '',
          `Generated from ${sections.length} public HTML pages.`,
          '',
          ...sections,
          '',
        ]
          .filter((section, index) => index <= 2 || section)
          .join('\n\n');

        fs.writeFileSync(outputPath, content, 'utf8');
        logger.info(`Generated ${filename} with ${sections.length} page entries.`);
      },
    },
  };
}
