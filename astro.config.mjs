import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://smgives.org',
  build: {
    // Inline all stylesheets directly into the HTML to eliminate the render-blocking
    // external CSS request. Tailwind ships as a single ~34KB bundle — inlining trades
    // a round-trip for a small HTML size bump and unblocks first paint on mobile.
    inlineStylesheets: 'always',
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
