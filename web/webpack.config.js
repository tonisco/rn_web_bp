const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")
const Dotenv = require("dotenv-webpack")

const appDirectory = path.resolve(__dirname, "../")

const babelLoaderConfiguration = {
  test: /\.js$|tsx?$/,
  // Add every directory that needs to be compiled by Babel during the build.
  include: [
    path.resolve(appDirectory, "web/index.web.js"),
    path.resolve(appDirectory, "service-worker.js"),
    path.resolve(appDirectory, "serviceWorkerRegistration.js"),
    path.resolve(appDirectory, "public"),
    path.resolve(appDirectory, "App.tsx"),
    path.resolve(appDirectory, "src"),
    path.resolve(appDirectory, "node_modules/react-native-uncompiled"),
  ],
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
      // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
      presets: ["module:metro-react-native-babel-preset"],
      // Re-write paths to import only the modules needed by the app
      plugins: ["react-native-web"],
    },
  },
}

const imageLoaderConfiguration = {
  test: /\.(gif|jpe?g|png)$/,
  include: [
    path.resolve(appDirectory, "web/favicon.ico"),
    path.resolve(appDirectory, "web/logo512.png"),
    path.resolve(appDirectory, "web/logo192.png"),
  ],
  use: {
    loader: "url-loader",
    options: {
      name: "[name].[ext]",
    },
  },
}

const jsonLoaderConfiguration = {
  test: /\.json$/,
  include: [path.resolve(appDirectory, "web")],
  use: {
    loader: "json-loader",
    options: {
      name: "[name].[ext]",
    },
  },
}

const plugins = [
  new HtmlWebpackPlugin({
    template: path.join(appDirectory, "web/index.html"),
  }),
  new CopyPlugin({
    patterns: [
      { from: "./public/favicon.ico", to: "" },
      { from: "./public/manifest.json", to: "" },
      { from: "./public/logo192.png", to: "" },
      { from: "./public/logo512.png", to: "" },
    ],
  }),
  new Dotenv({
    path: path.resolve(appDirectory, ".env"),
    systemvars: true,
  }),
]

if (process.env.NODE_ENV === "production") {
  plugins.push(
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./service-worker.js",
      swDest: "./sw.js",
    }),
  )
}

module.exports = {
  entry: {
    app: path.join(appDirectory, "web/index.web.js"),
  },
  output: {
    path: path.resolve(appDirectory, "web/build"),
    clean: true,
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".web.tsx", ".web.ts", ".tsx", ".ts", ".web.js", ".js"],
    alias: {
      "react-native$": "react-native-web",
    },
  },
  devServer: {
    open: true,
    port: 3000,
  },
  module: {
    rules: [
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      jsonLoaderConfiguration,
    ],
  },
  plugins,
}
