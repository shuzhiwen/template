/* eslint-disable */

const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    main: './dist/index.js',
  },
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'dist'),
    },
  },
  externals: [nodeExternals()],
}
