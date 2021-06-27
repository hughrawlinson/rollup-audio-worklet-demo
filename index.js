import MyAudioWorklet from "audio-worklet:./worklet.js";

async function runAudio(){
  const audioContext = new AudioContext();
  await MyAudioWorklet(audioContext);
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