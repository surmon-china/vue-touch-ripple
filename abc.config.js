module.exports = {
  targets: ['umd', 'esm'],
  minimize: false,
  external: [
    'vue'
  ],
  globals: {
    vue: 'Vue'
  }
}
