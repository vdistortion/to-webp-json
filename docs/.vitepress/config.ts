import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'to-webp-json',
  description: 'Image conversion for static websites',
  base: '/to-webp-json/',
  head: [['link', { rel: 'icon', href: '/to-webp-json/favicon.ico' }]],
  locales: {
    root: {
      label: '🇬🇧 English',
      lang: 'en',
    },
    ru: {
      label: '🇷🇺 Русский',
      lang: 'ru',
      link: '/ru/',
      themeConfig: {
        nav: [
          { text: 'Главная', link: '/ru/' },
          { text: 'Документация', link: '/ru/docs' },
        ],

        sidebar: [
          {
            text: 'Документация',
            items: [{ text: 'to-webp-json', link: '/ru/docs' }],
          },
        ],
      },
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs' },
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [{ text: 'to-webp-json', link: '/docs' }],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vdistortion/to-webp-json' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/to-webp-json' },
    ],
  },
});
