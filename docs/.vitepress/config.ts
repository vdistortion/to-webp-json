import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "to-webp-json",
  description: "Convert images to webp structure",
  base: '/to-webp-json/',
  head: [['link', { rel: 'icon', href: '/to-webp-json/favicon.ico' }]],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs' }
    ],

    sidebar: [
      {
        text: 'Docs',
        items: [
          { text: 'to-webp-json', link: '/docs' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vdistortion/to-webp-json' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/to-webp-json' },
    ]
  }
})
