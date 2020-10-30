const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/pages/index.js',
  devtool: 'inline-source-map',
  output: {
    filename: 'main.js',
    publicPath: './',
    path: path.resolve(__dirname, 'dist'),
  },

  devServer: {
    publicPath: '/',
    contentBase: path.join(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use:
          [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
          ],
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            "plugins": [
              ["@babel/plugin-proposal-class-properties", { "loose": true }]
            ]
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
    ],
  },

  plugins:
    [
      new HtmlWebpackPlugin(
        {
          template: './src/index.html',
        }),
      new MiniCssExtractPlugin(),
    ],
  // devtool: 'inline-source-map',
};
