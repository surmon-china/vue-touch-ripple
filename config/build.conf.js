
const path = require('path')
const merge = require('webpack-merge')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const baseConfig = require('./base.conf')
const utils = require('./utils')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  entry: {
    'vue-touch-ripple': './src/index.js'
  },
  externals: {
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].js',
    library: 'VueTouchRipple',
    libraryTarget: 'umd'
  },
  module: {
    rules: utils.styleLoaders({
      sourceMap: false,
      extract: true
    })
  },
  devtool: '#source-map',
  plugins: [
    new ExtractTextPlugin({
      filename: 'vue-touch-ripple.css'
    }),
    new OptimizeCSSPlugin()
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ]
  }
})
