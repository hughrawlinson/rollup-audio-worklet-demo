function funcToSource(fn, sourcemapArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var source = fn.toString();
    var lines = source.split('\n');
    lines.pop();
    lines.shift();
    var blankPrefixLength = lines[0].search(/\S/);
    var regex = /(['"])__worker_loader_strict__(['"])/g;
    for (var i = 0, n = lines.length; i < n; ++i) {
        lines[i] = lines[i].substring(blankPrefixLength).replace(regex, '$1use strict$2') + '\n';
    }
    if (sourcemap) {
        lines.push('\/\/# sourceMappingURL=' + sourcemap + '\n');
    }
    return lines;
}

function createURL(fn, sourcemapArg) {
    var lines = funcToSource(fn, sourcemapArg);
    var blob = new Blob(lines, { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function createInlineAudioWorkletFactory$1(fn, sourcemapArg) {
    var url;
    return async function AudioWorkletFactory(audioContext, options) {
        url = url || createURL(fn, sourcemapArg);
        return await audioContext.audioWorklet.addModule(url, options);
    };
}

var kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

function isNodeJS() {
    return kIsNodeJS;
}

function createInlineAudioWorkletFactory(fn, sourcemapArg) {
    if (isNodeJS()) {
        throw new Error('rollup-plugin-web-worker-loader does not support Audio Worklet in Node.JS');
    }
    return createInlineAudioWorkletFactory$1(fn, sourcemapArg);
}

var WorkerFactory = /*#__PURE__*/createInlineAudioWorkletFactory(/* rollup-plugin-web-worker-loader */function () {
(function () {
  '__worker_loader_strict__';

  const a = () => {
    console.log('haha hi');
  };

  // Example copied from MDN: https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletNode
  a();

  // white-noise-processor.js
  class WhiteNoiseProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
      const output = outputs[0];
      output.forEach((channel) => {
        for (let i = 0; i < channel.length; i++) {
          channel[i] = Math.random() * 2 - 1;
        }
      });
      return true;
    }
  }

  registerProcessor("white-noise-processor", WhiteNoiseProcessor);

}());
}, null);
/* eslint-enable */

const audioContext = new AudioContext();
WorkerFactory(audioContext);

async function runAudio(){
  const whiteNoiseNode = new AudioWorkletNode(
    audioContext,
    "white-noise-processor"
  );
  whiteNoiseNode.connect(audioContext.destination);
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  runAudio();
});
