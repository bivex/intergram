const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  devtool: 'source-map',
  entry: {
    widget: path.join(__dirname, 'src', 'widget', 'widget-index.jsx'),
    chat: path.join(__dirname, 'src', 'chat', 'chat-index.jsx'),
  },
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: '[name].js',
    publicPath: '/js/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      react: 'preact/compat',
      'react-dom': 'preact/compat'
    }
  }
};
