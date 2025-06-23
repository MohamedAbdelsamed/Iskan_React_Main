const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const webpack = require('webpack');
const dotenv = require('dotenv');
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });
const CompressionPlugin = require('compression-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  entry: './src/index.js',
 output: {
  path: path.resolve(__dirname, 'dist'),
  filename: '[name].[contenthash].js', // or [name].js if contenthash not needed in dev
  chunkFilename: '[name].[contenthash].js',
  clean: true,
},

  mode: 'development', // or 'production'
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
         
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
     static: [
    {
      directory: path.resolve(__dirname, 'dist'),
    },
    {
      directory: path.resolve(__dirname, 'public'),
      publicPath: '/', // this makes /images/ work!
    },
  ],
  historyApiFallback: true,
    port: 3000,
    hot: true,
    open: true,
  },
  plugins: [
     new ModuleFederationPlugin({
  name: "host_app",
  filename: "remoteEntry.js", // 🔥 Add this line to serve /remoteEntry.js
  remotes: {
    microfrontend1: `microfrontend1@${process.env.REACT_APP_REMOTE_URL1}`,
    microfrontend2: `microfrontend2@${process.env.REACT_APP_REMOTE_URL2}`,
    microfrontend3: `microfrontend3@${process.env.REACT_APP_REMOTE_URL3}`,
    microfrontend4: `microfrontend4@${process.env.REACT_APP_REMOTE_URL4}`,
  },
  exposes: {
    './i18n': './src/i18',
  },
  shared: {
    react: { singleton: true, requiredVersion: '^19.1.0' },
    'react-dom': { singleton: true, requiredVersion: '^19.1.0' },
    'react-i18next': { singleton: true, requiredVersion: '^13.0.0' },
    i18next: { singleton: true, requiredVersion: '^23.0.0' },
  }
}),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),

    new webpack.DefinePlugin({
    'process.env.REACT_APP_ENV': JSON.stringify(process.env.REACT_APP_ENV),
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  new CompressionPlugin(),
  new BundleAnalyzerPlugin()

  ],
};
