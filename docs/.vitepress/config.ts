import { defineConfig } from 'vitepress'
import { description, discord, font, github, name, releases, twitter,} from './meta'

export default defineConfig({
  lang: 'en-US',
  title:name,
  description: description,
  head: [
    ['meta', { name: 'theme-color', content: '#ffffff' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { property: 'og:title', content: name }],
    ['meta', { property: 'og:description', content: 'description' }],
    ['meta', { name: 'twitter:title', content: name }],
    ['meta', { name: 'twitter:description', content: description }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { href: font, rel: 'stylesheet' }],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
  ],
  lastUpdated: true,
  markdown: {
    theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
    },
  },
  themeConfig:{
    editLink: {
      pattern: 'https://github.com/elonehoo/haul/tree/main/docs/:path',
      text: 'Suggest changes to this page',
    },
    socialLinks: [
        { icon: 'twitter', link: twitter },
        { icon: 'discord', link: discord },
        { icon: 'github', link: github },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2023-PRESENT Elone Hoo',
    },
    sidebar:[
      {
        text:'Guide',
        items:[
          {
            text:'Getting Started',
            link:'/'
          }
        ]
      },
      {
        text:'Function',
        items:[
          {
            text:'haul()',
            link:'/function/haul'
          }
        ]
      }
    ]
  }
})
