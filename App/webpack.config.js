const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const deps = require('./package.json').dependencies;
const path = require('path');

// Define ENV_MODE directly here since webpack.config.js can't import ES6 modules
const ENV_MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};

module.exports = (_, argv) => ({
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath:
      argv.mode === ENV_MODE.DEVELOPMENT
        ? 'http://localhost:8081/'
        : 'https://kicks-app-two.vercel.app/', // Ensure the public path matches the parent app's address
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.scss'],
  },

  devServer: {
    port: 8081, // Parent app runs on a different port
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(gif|svg|jpg|png|jpeg)$/,
        loader: 'file-loader',
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'parentApp', // Name of the parent app
      remotes: {
        home:
          argv.mode === ENV_MODE.DEVELOPMENT
            ? 'home@http://localhost:8080/home-app.js'
            : 'home@https://kicks-home.vercel.app/home-app.js', // Reference your deployed microfrontend
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: './src/index.html',
    }),
    new Dotenv(),
  ],
});
