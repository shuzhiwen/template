const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    client: "./dist/client-ssr",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
  externals: {
    react: "React",
    "react-dom": "ReactDOM",
  },
};
