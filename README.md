Repro for https://github.com/web-infra-dev/rspack/issues/5994.

### Rspack

```bash
pnpm install
./node_modules/.bin/rspack
node dist/main.js # SyntaxError: Identifier 'Foo' has already been declared
```

### Webpack

```bash
pnpm install
./node_modules/.bin/webpack --config rspack.config.js
node dist/main.js # [class Foo] 42
```