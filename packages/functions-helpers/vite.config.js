import path from 'path'

import { defineConfig } from 'vite'

import baseConfig from '../../config/vite.lib.config'

export default defineConfig({
  ...baseConfig,
  test: {
    ...(baseConfig.test || {}),
    testTimeout: 30000,
    environment: 'node'
  },
  build: {
    ...baseConfig.build,
    rollupOptions: {
      ...baseConfig.build.rollupOptions,
      input: {
        index: baseConfig.build.lib.entry,
        'functions-bundle': path.resolve(process.env.PWD, 'src/cli/bundle.ts'),
        'functions-codegen': path.resolve(process.env.PWD, 'src/cli/codegen.ts')
      },

      output: [
        {
          ...baseConfig.build.rollupOptions.output,
          entryFileNames: '[name].cjs.js',
          format: 'cjs',
          banner: '#!/usr/bin/env node'
        },
        {
          ...baseConfig.build.rollupOptions.output,
          entryFileNames: '[name].esm.js',
          format: 'es'
        }
      ]
    }
  }
})
