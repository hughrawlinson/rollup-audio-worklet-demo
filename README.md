# Rollup Audio Worklet Demo

This repo serves as a demonstration of how to import and package audio worklets using Rollup.

The use case is for packages that wish to internally use the Audio Worklet API, and are unable to ask all consuming web apps to serve a bundle file directly.

This hack uses a modified [rollup-plugin-web-worker-loader] to encode the bundled Audio Worklet as a blob that can be included in a main package bundle. Specifically, the included bundle was generated using this patch: [hughrawlinson/rollup-plugin-web-worker-loader#1](https://github.com/hughrawlinson/rollup-plugin-web-worker-loader/pull/1). I hope to develop this further and have it merged into upstream.

The demo is shown in index.html, and should work in browsers that support AudioWorklet.

[rollup-plugin-web-worker-loader]: https://www.npmjs.com/package/rollup-plugin-web-worker-loader

### A note on running against an `npm link` copy of rollup-plugin-web-worker-loader

rollup-plugin-web-worker-loader has a peerdependency on rollup. However, npm link doesn't resolve peerdependencies by default.

```sh
# rather than call rollup as usual
rollup -c rollup.config.js
# you need to invoke node with --preserve-symlinks
node --preserve-symlinks ./node_modules/.bin/rollup -c rollup.config.js
```

This is only necessary to build with a local version of a package with peerdependencies, and won't be necessary in most AudioWorklet cases.

For more info see [this blog post](https://www.chevtek.io/you-can-finally-npm-link-packages-that-contain-peer-dependencies/).
