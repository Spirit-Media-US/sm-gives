import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://smgives.org',
  build: {
    // 'auto' (not 'always'): Astro emits external CSS bundles, which scripts/async-css.mjs
    // rewrites postbuild to media="print" onload swap for non-blocking load. Hand-rolled
    // critical CSS lives in Layout.astro <style is:inline>. Matches the-kohler-group pattern
    // (see kohler astro.config.mjs:14). 'always' inlined 34KB which blocked paint 2080ms on
    // Moto G Slow-4G — diagnosed in 100 Club v4 session 2026-04-21.
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      serialize(item) {
        if (item.url.includes('/blog/') && item.url !== 'https://smgives.org/blog/') {
          return { ...item, changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() };
        }
        if (item.url.endsWith('/blog/')) {
          return { ...item, changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() };
        }
        if (item.url === 'https://smgives.org/') {
          return { ...item, changefreq: 'monthly', priority: 1.0, lastmod: new Date().toISOString() };
        }
        return { ...item, changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() };
      },
    }),
  ],
  vite: {
    server: { allowedHosts: ['preview.spiritmediapublishing.com'] },
    plugins: [tailwindcss()],
  },
});
