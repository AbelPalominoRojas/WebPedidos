"use strict";

const webpack = require('webpack');
const  {VueLoaderPlugin} = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const path = require("path");


module.exports={
  entry:{
    vendor:'./src/vendor.js',
    app:'./src/app.js'
  },
  output:{
    path:path.resolve(__dirname, 'dist'),
    filename:'./js/[name]-bundle.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
          },
        },
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        }
      })
    ],
  },
  module:{
    rules:[
        {
          test:/\.js$/,
          exclude:/node_modules/,
          use:{
            loader:'babel-loader'
          }
        },
        {
          test:/\.vue$/,
          loader:'vue-loader'
        },
        {
          test:/\.(sa|sc|c)ss$/,
          use:[
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: process.env.NODE_ENV === 'development',
                }
              },
              {
                loader:'css-loader'
              },
              {
                loader: 'sass-loader',
                options: {
                  minimize: true
                }
              }
          ]
        },
        {
          test :/\.(png|jpg|gif|svg)$/,
          exclude:/node_modules/,
          loader:'file-loader',
          options:{
            name:'[name].[etx]?[hash]',
            outputPath: '../img'
          }

        },
        {
            test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
            use: [{
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/webfonts',
                publicPath: '../webfonts' 

              }
            }]
        }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    },
    extensions:['*','.wasm', '.mjs','.js','.vue','.json'],
  },
  devServer:{
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  performance:{
    hints:false
  },
  devtool:'#eval-source-map',
  plugins:[
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename:'css/[name]-bundle.css',
        chunkFilename: '[id].css'
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new CopyWebpackPlugin([{
        from: 'node_modules/@fortawesome/fontawesome-free/webfonts',
        to: 'webfonts/'
      }]),
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          // proxy the Webpack Dev Server endpoint
          // (which should be serving on http://localhost:3100/)
          // through BrowserSync
          proxy: 'http://localhost:54330/',
          open: false
        }
      )
  ]  
};
