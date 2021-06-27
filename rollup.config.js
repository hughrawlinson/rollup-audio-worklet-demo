import webWorkerLoader from "rollup-plugin-web-worker-loader";

export default {
  input: "index.js",
  output: {
    file: "site/index.bundled.js",
    name: "RollupAudioWorkletDemo",
    format: "cjs",
  },
  plugins: [webWorkerLoader()],
};
