/* eslint-disable */

const path = require('path')

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
}
