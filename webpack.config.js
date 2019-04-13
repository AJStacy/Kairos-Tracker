const { resolve } = require('path');

const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const IfPlugin = require('if-webpack-plugin')

const rootPath = (path) => resolve(__dirname, path);

module.exports = env => ({
  mode: env.production ? 'production' : 'development',

  entry: {
    'dynamic-yield.client': rootPath('src/index.ts'),
  },

  output: {
    path: rootPath('dist'),

    library: 'DynamicYieldClient',

    libraryExport: 'default',

    libraryTarget: 'umd',

    globalObject: 'this',
  },

  resolve: {
    alias: {
      '~': resolve(__dirname, 'src'),
    },

    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loaders: [
          'babel-loader'
        ],
      },
    ],
  },

  plugins: [
    new IfPlugin(env.withAnalysis, new BundleAnalyzerPlugin()),
  ]
});
