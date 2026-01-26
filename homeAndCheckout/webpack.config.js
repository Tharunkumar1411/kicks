const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require("dotenv-webpack");
const path = require("path");
const deps = require("./package.json").dependencies;

// Define ENV_MODE directly here since webpack.config.js can't import ES6 modules
const ENV_MODE = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production'
};

module.exports = (_, argv) => ({
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: argv.mode === ENV_MODE.DEVELOPMENT ? 'http://localhost:8080/' : 'https://kicks-home.vercel.app/',
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json", ".scss"],
  },

  devServer: {
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
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
      name: "home",
      filename: "home-app.js",
      exposes: {
        "./HomeApp": "./src/pages/Home/index.jsx",
        "./ProductApp": "./src/pages/Product/index.jsx",
        "./CartApp": "./src/pages/Cart/index.jsx",
        "./CheckoutApp": "./src/pages/Checkout/index.jsx",
        "./ProductListApp": "./src/pages/ProductList/index.jsx",
        "./cartStore": "./src/store/cart/index.js"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
        zustand: {
          singleton: true,
          requiredVersion: deps.zustand,
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
    new Dotenv({
      silent: true, // Don't fail if .env file is missing
      systemvars: true, // Load system environment variables (for Vercel)
    }),
  ],
});
