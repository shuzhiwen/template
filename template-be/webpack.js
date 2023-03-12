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
      '@configs': path.resolve(__dirname, 'dist/configs'),
      '@generated': path.resolve(__dirname, 'dist/generated'),
      '@models': path.resolve(__dirname, 'dist/models'),
      '@resolvers': path.resolve(__dirname, 'dist/resolvers'),
      '@utils': path.resolve(__dirname, 'dist/utils'),
    },
  },
  externals: [nodeExternals()],
}
