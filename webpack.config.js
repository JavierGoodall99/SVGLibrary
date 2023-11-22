const path = require("path");

module.exports = {
  mode: "production", // Set 'development' or 'production' here as needed
  entry: "./src/components/EmbeddableWidget.tsx",
  output: {
    filename: "widget.js",
    path: path.resolve(__dirname, "dist"),
    library: "EmbeddableWidget",
    libraryTarget: "umd",
    globalObject: "this",
  },
  module: {
    rules: [
        {
          test: /\.tsx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react", "@babel/preset-typescript"],
              },
            },
            {
              loader: "ts-loader",
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
};
