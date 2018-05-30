'use strict';
const path = require('path');

const isLocal = (process.env.NODE_ENV === 'local');
const isDev = (process.env.NODE_ENV === 'development');
const isProd = (process.env.NODE_ENV === 'production');

const APP_DIR = path.resolve(__dirname, 'src');
const BUILD_DIR = path.resolve(__dirname, 'dist');

const localConfig = require('./webpack/webpack.local.config');
const devConfig = require('./webpack/webpack.dev.config');
const prodConfig = require('./webpack/webpack.prod.config');

// loaders
const jsxLoader = require('./webpack/loaders/jsx.loader');
const lessLoader = require('./webpack/loaders/less.loader');
const postcssLoader = require('./webpack/loaders/postcss.loader');
const imageLoader = require('./webpack/loaders/image.loader');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let config = {
  entry: [
    `${APP_DIR}/index.js`,
  ],

  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/dist/',
  },

  resolve: {
    extensions: ['.js', '.json'],
  },

  module: {
    rules: [],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: true,
    }),
  ],
};

// Loader hooks
config = jsxLoader(config, APP_DIR);
config = lessLoader(config, APP_DIR);
config = postcssLoader(config, APP_DIR);
config = imageLoader(config, APP_DIR);

if (isLocal) {
  config = localConfig(config, APP_DIR, BUILD_DIR);
} else if (isDev) {
  config = devConfig(config);
} else if (isProd) {
  config = prodConfig(config);
} else {
  console.log('WARNING: NODE_ENV=environment (e.g. development or production) must be set on the package.json script hook');
}

module.exports = config;
