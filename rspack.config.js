// rspack.config.js

import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

/** @type {import('webpack').Configuration} */
export default {
  mode: "development",
  devtool: false,
  output: {
    filename: "[name].js",
    clean: true,
    chunkFormat: "commonjs",
  },
  entry: {
    main: "./src/index.js",
  },
  target: false,
  plugins: [
    function (compiler) {
      const { ProvidePlugin } = compiler.webpack;

      new ProvidePlugin({
        Foo: [require.resolve("./src/foo.js"), "Foo"],
      }).apply(compiler);
    },
  ],
};
