import addMyWorkletModule from "audio-worklet:./worklet.js";

const audioContext = new AudioContext();
addMyWorkletModule(audioContext);

class MyWorkletNode extends AudioWorkletNode {
  constructor(audioContext) {
    super(audioContext, "white-noise-processor")
  }
}

async function runAudio(){
  const whiteNoiseNode = new MyWorkletNode(audioContext);
  whiteNoiseNode.connect(audioContext.destination);
}

const startButton = document.getElementById("start");
startButton.addEventListener("click", () => {
  runAudio();
});