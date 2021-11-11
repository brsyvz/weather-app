const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'scripts/bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // {
      //   test: /\.css$/i,
      //   use: ["style-loader", "css-loader"],
      // },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]',
        },
      },

      {
        test: /\.(pdf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'resume/[name][ext][query]',
        },
      },

      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader',
        // options: {
        //   outputPath: "../fonts",
        // }
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/styles.[contenthash].css',
    }),
    new Dotenv(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'weather app',
      favicon: './src/favicon.png',
      meta: {
        description: 'weather information',
        author: 'Baris Yavuz',
        keywords: 'weather, weather now, weather in my city',
      },
      // meta: {
      //   'http-equiv': 'Content-Security-Policy',
      //   content: 'upgrade-insecure-requests',
      // },
    }),
  ],
};
