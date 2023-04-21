const {DefinePlugin, ProgressPlugin} = require("webpack")
const {VueLoaderPlugin} = require('vue-loader')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const MarkdownImportPlugin = require('../dist')
const path = require('path')

const pluginOption = {
  test: /\.md$/i,
  exportType: 'vue',
  liveFence: 'vue',
  liveWrap: require.resolve('../example/vue/wrap.vue')
}

module.exports = {
  entry: '/example/vue/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, "../dist/example/vue")
  },
  stats: "errors-warnings",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {modules: false}]],
            plugins: ['@vue/babel-plugin-jsx']
          }
        }
      },
      {test: /\.vue$/i, use: 'vue-loader'},
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
    extensions: ['.vue', '.js', '.jsx','.md']
  },
  plugins: [
    new DefinePlugin({
      '__VUE_OPTIONS_API__': true,
      '__VUE_PROD_DEVTOOLS__': false
    }),
    new ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({template: "/example/index.html"}),
    new VueLoaderPlugin(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    new MarkdownImportPlugin(pluginOption)
  ]
}
