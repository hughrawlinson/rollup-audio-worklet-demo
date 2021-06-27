import MyAudioWorklet from "audio-worklet:./worklet.js";

const audioContext = new AudioContext();
MyAudioWorklet(audioContext);

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