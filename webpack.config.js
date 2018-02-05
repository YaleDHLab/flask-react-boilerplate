const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack'); 
const path = require('path');

const paths = {
  src: path.resolve(__dirname, 'src'),
  build: path.resolve(__dirname, 'build')
}

const uglifyConfig = {
  sourceMap: false,
  warnings: false,
  mangle: true,
  minimize: true
}

const htmlConfig = {
  template: path.join(paths.src, 'index.html'),
  minify : {
    collapseWhitespace: true
  }
}

const common = {
  devServer: {
    contentBase: path.join(__dirname, 'build'),
  },
  entry: path.join(paths.src, 'index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.(ts)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'awesome-typescript-loader',
          options: {
            useCache: false,
          }
        }
      },
      {
        test: /\.(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([paths.build]),
    new HtmlWebpackPlugin(htmlConfig),
    new ExtractTextPlugin('styles.[contenthash].css'),
  ]
};

const devSettings = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
  output: {
    path: paths.build,
    filename: 'bundle.[hash].js',
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin([paths.build]),
  ]
}

const prodSettings = {
  devtool: 'source-map',
  output: {
    path: paths.build,
    filename: 'bundle.[hash].js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.DefinePlugin({ 'process.env': {
      NODE_ENV: JSON.stringify('production')
    }}),
    new webpack.optimize.UglifyJsPlugin(uglifyConfig),
    new OptimizeCssAssetsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ]
}

/**
* Exports
**/

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

if (TARGET === 'start') {
  module.exports = merge(common, devSettings)
}

if (TARGET === 'build' || !TARGET) {
  module.exports = merge(common, prodSettings)
}