/// <reference types="vitest" />
import { defineConfig } from 'vite'

import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig({
 plugins:[
  viteMockServe({
     // default
     mockPath: 'mock'
  })
 ]
})
