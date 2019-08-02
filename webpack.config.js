// webpack.config.js
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: ['@babel/polyfill', './app/app.jsx'],
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  watch: 'true',
  watchOptions: {
    ignored: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: [/(node_modules|bower_components)/, /\.ejs$/],
        use: {
          loader: 'file-loader',
          options: { name: '[name].[ext]' },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin([{ from: './app/images/favicon.ico' }]),
    new HtmlWebpackPlugin({ template: './app/index.html' }),
  ],
};
