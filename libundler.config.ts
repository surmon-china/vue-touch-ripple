import { defineConfig } from '@surmon-china/libundler'

export default defineConfig({
  libName: 'VueTouchRipple',
  outFileName: 'vue-touch-ripple',
  entry: './src/index.ts',
  outDir: './dist',
  targets: ['esm', 'umd'],
  external: ['vue'],
  exports: 'named',
  globals: {
    vue: 'Vue'
  }
})
