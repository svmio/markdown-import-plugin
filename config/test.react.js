const {DefinePlugin, ProgressPlugin} = require("webpack")
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MarkdownImportPlugin = require('../dist')

const path = require('path')

const pluginOption = {
  test: /\.md$/i,
  exportType: 'react',
  liveFence: 'jsx',
  liveWrap: require.resolve('../example/react/wrap.js')
}

module.exports = {
  entry: '/example/react/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "../dist/example/react")
  },
  stats: "errors-warnings",
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {test: /\.tsx?$/i, use: 'ts-loader'},
      {test: /\.css$/i, use: ['style-loader', 'css-loader']},
      {test: /\.scss$/i, use: ['style-loader', 'css-loader', 'sass-loader']}
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: `chunk-vendors`,
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: `chunk-common`,
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      },
    },
    usedExports: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.md']
  },
  plugins: [
    new DefinePlugin({
      '__VUE_OPTIONS_API__': true,
      '__VUE_PROD_DEVTOOLS__': false
    }),
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: "/example/index.html"}),
    new MarkdownImportPlugin(pluginOption)
  ]
}
