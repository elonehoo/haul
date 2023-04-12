import {defineConfig} from 'vitest/config'

export default defineConfig({
  test:{
    setupFiles:[
      "./test/setupVitest.ts"
    ],
    testTimeout:30000
  }
})
