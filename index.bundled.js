'use strict';

var WorkerClass = null;

try {
    var WorkerThreads =
        typeof module !== 'undefined' && typeof module.require === 'function' && module.require('worker_threads') ||
        typeof __non_webpack_require__ === 'function' && __non_webpack_require__('worker_threads') ||
        typeof require === 'function' && require('worker_threads');
    WorkerClass = WorkerThreads.Worker;
} catch(e) {} // eslint-disable-line

function decodeBase64$1(base64, enableUnicode) {
    return Buffer.from(base64, 'base64').toString(enableUnicode ? 'utf16' : 'utf8');
}

function createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64$1(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    return function WorkerFactory(options) {
        return new WorkerClass(body, Object.assign({}, options, { eval: true }));
    };
}

function decodeBase64(base64, enableUnicode) {
    var binaryString = atob(base64);
    if (enableUnicode) {
        var binaryView = new Uint8Array(binaryString.length);
        for (var i = 0, n = binaryString.length; i < n; ++i) {
            binaryView[i] = binaryString.charCodeAt(i);
        }
        return String.fromCharCode.apply(null, new Uint16Array(binaryView.buffer));
    }
    return binaryString;
}

function createURL(base64, sourcemapArg, enableUnicodeArg) {
    var sourcemap = sourcemapArg === undefined ? null : sourcemapArg;
    var enableUnicode = enableUnicodeArg === undefined ? false : enableUnicodeArg;
    var source = decodeBase64(base64, enableUnicode);
    var start = source.indexOf('\n', 10) + 1;
    var body = source.substring(start) + (sourcemap ? '\/\/# sourceMappingURL=' + sourcemap : '');
    var blob = new Blob([body], { type: 'application/javascript' });
    return URL.createObjectURL(blob);
}

function createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg) {
    var url;
    return async function WorkerFactory(audioContext, options) {
        url = url || createURL(base64, sourcemapArg, enableUnicodeArg);
        return await audioContext.audioWorklet.addModule(url, options);
    };
}

var kIsNodeJS = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]';

function isNodeJS() {
    return kIsNodeJS;
}

function createBase64WorkerFactory(base64, sourcemapArg, enableUnicodeArg) {
    if (isNodeJS()) {
        return createBase64WorkerFactory$2(base64, sourcemapArg, enableUnicodeArg);
    }
    return createBase64WorkerFactory$1(base64, sourcemapArg, enableUnicodeArg);
}

var WorkerFactory = /*#__PURE__*/createBase64WorkerFactory('Lyogcm9sbHVwLXBsdWdpbi13ZWItd29ya2VyLWxvYWRlciAqLwooZnVuY3Rpb24gKCkgewogICd1c2Ugc3RyaWN0JzsKCiAgLy8gRXhhbXBsZSBjb3BpZWQgZnJvbSBNRE46IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9BdWRpb1dvcmtsZXROb2RlCgogIC8vIHdoaXRlLW5vaXNlLXByb2Nlc3Nvci5qcwogIGNsYXNzIFdoaXRlTm9pc2VQcm9jZXNzb3IgZXh0ZW5kcyBBdWRpb1dvcmtsZXRQcm9jZXNzb3IgewogICAgcHJvY2VzcyhpbnB1dHMsIG91dHB1dHMsIHBhcmFtZXRlcnMpIHsKICAgICAgY29uc3Qgb3V0cHV0ID0gb3V0cHV0c1swXTsKICAgICAgb3V0cHV0LmZvckVhY2goKGNoYW5uZWwpID0+IHsKICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoYW5uZWwubGVuZ3RoOyBpKyspIHsKICAgICAgICAgIGNoYW5uZWxbaV0gPSBNYXRoLnJhbmRvbSgpICogMiAtIDE7CiAgICAgICAgfQogICAgICB9KTsKICAgICAgcmV0dXJuIHRydWU7CiAgICB9CiAgfQoKICByZWdpc3RlclByb2Nlc3Nvcigid2hpdGUtbm9pc2UtcHJvY2Vzc29yIiwgV2hpdGVOb2lzZVByb2Nlc3Nvcik7Cgp9KCkpOwoK', null, false);
/* eslint-enable */

async function runAudio(){
  const audioContext = new AudioContext();
  await WorkerFactory(audioContext);
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
