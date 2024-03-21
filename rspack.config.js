// rspack.config.js

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** @type {import('webpack').Configuration} */
export default {
  mode: "development",
  output: {
    filename: "[name].js",
    clean: true,
    chunkFormat: "commonjs",
  },
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: [/node_modules/],
        loader: "builtin:swc-loader",
        options: {
          jsc: {
            target: "es2019",
            parser: {
              syntax: "typescript",
            },
          },
        },
        type: "javascript/auto",
      },
    ],
  },
  devServer: {
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
  },
  target: false,
  plugins: [
    function (compiler) {
      const { EntryPlugin, ProvidePlugin } = compiler.webpack;

      new EntryPlugin(compiler.context, require.resolve("./src/entry.js"), {
        name: void 0,
      }).apply(compiler);

      new ProvidePlugin({
        WebSocket: [require.resolve("./src/WebSocket/index.js"), "default"],
      }).apply(compiler);
    },
  ],
};
