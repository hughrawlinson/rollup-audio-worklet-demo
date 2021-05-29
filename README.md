# Rollup Audio Worklet Demo

This repo serves as a demonstration of how to import and package audio worklets using Rollup.

The use case is for packages that wish to internally use the Audio Worklet API, and are unable to ask all consuming web apps to serve a bundle file directly.

This hack uses a modified [rollup-plugin-web-worker-loader] to encode the bundled Audio Worklet as a blob that can be included in a main package bundle.

The demo is shown in index.html, and should work in browsers that support AudioWorklet.

[rollup-plugin-web-worker-loader]: https://www.npmjs.com/package/rollup-plugin-web-worker-loader
