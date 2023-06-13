const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

let babelOptions =  {
  "presets": ["env"]
};

module.exports = {
  entry:
  {
    tests: ['babel-polyfill', './tests.ts'],
    effectFramesGenerator: ['babel-polyfill', './effectFramesGenerator.ts'],
    missileFramesGenerator: ['babel-polyfill', './missileFramesGenerator.ts'],
    itemImageGenerator: ['babel-polyfill', './itemImageGenerator.ts'],
    itemImageFramesGenerator: ['babel-polyfill', './itemImageFramesGenerator.ts'],
    outfitImageGenerator: ['babel-polyfill', './outfitImageGenerator.ts'],
    otbEditor: ['babel-polyfill', './otbEditor.ts']
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'js')
  },
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        }
      ]
    }]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'],
      minChunks: function (module, count) {
        // creates a common vendor js file for libraries in node_modules
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    new CopyPlugin([
      { from: './node_modules/gif.js/dist/gif.worker.js', to: 'gif.worker.js' },
    ]),
  ]
};
