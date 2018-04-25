const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: [
    'babel-polyfill',    
    './src/index.js'
  ],
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname + "/dist")
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './',
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify('q6natzu49b9njnxwv9w7gbxs'),
      URL: JSON.stringify('https://api.gettyimages.com/v3/search/images?'),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: [
          'file-loader'
          ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      }
    ]
  }
};
