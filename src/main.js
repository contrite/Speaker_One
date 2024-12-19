// This is the High level JS runtime for Rive
// https://rive.app/community/doc/web-js/docvlgbnS1mp

Number.prototype.map = function (in_min, in_max, out_min, out_max) {
  return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};


let musicBoolean_Input;

const riveInstance = new rive.Rive({
  src: "speaker.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();
    // Inputs number set in the Rive File
    const inputs = riveInstance.stateMachineInputs("State Machine 1");

   musicBoolean_Input = inputs.find((i) => i.name === "MusicBoolean");

    init();
  },
});

const riveInstance2 = new rive.Rive({
  src: "speaker.riv",
  canvas: document.getElementById("canvas2"),
  autoplay: true,
  artboard: "Artboard",
  stateMachines: "State Machine 1",

  onLoad: () => {
    riveInstance.resizeDrawingSurfaceToCanvas();
    // Inputs number set in the Rive File
    const inputs = riveInstance.stateMachineInputs("State Machine 1");

   musicBoolean_Input = inputs.find((i) => i.name === "MusicBoolean");

    init();
  },
});

// Mr.doob FPS Stats
// javascript:(function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()

let cone;
let glowWhite;
let glowPurple;
let glowOrange;
let Center_Group;

// let joystick1;

// Set up Audio

let audio;
let audioContext, audioData, sourceNode, analyserNode;
let manager;
let minDb, maxDb;

const createAudio = () => {
  audio = document.createElement("audio");

  audio.src = "Track1.mp3";

  audioContext = new AudioContext();

  sourceNode = audioContext.createMediaElementSource(audio);
  sourceNode.connect(audioContext.destination);

  analyserNode = audioContext.createAnalyser();
  analyserNode.fftSize = 512;
  analyserNode.smoothingTimeConstant = 0.9;
  sourceNode.connect(analyserNode);

  minDb = analyserNode.minDecibels;
  maxDb = analyserNode.maxDecibels;

  audioData = new Float32Array(analyserNode.frequencyBinCount);
};

window.addEventListener("mouseup", () => {
  if (!audioContext) createAudio();
  if (audio.paused) {
    musicBoolean_Input.value = true;
    audio.play();
  } else {
    musicBoolean_Input.value = false;
    audio.pause();

    // Reset Circles Scale

    Center_Group.scaleX = 1;
    Center_Group.scaleY = 1;
    glowWhite.scaleX = 1;
    glowWhite.scaleY = 1;

    glowPurple.scaleX = 1;
    glowPurple.scaleY = 1;
    glowOrange.scaleX = 1;
    glowOrange.scaleY = 1;


    Center_Group.scaleX = 1;
    Center_Group.scaleY = 1;
  }
});

function init() {
  // Set circles
  Center_Group = riveInstance.artboard.node("Center_Group");
  glowWhite = riveInstance.artboard.node("glowWhite");
  glowPurple = riveInstance.artboard.node("glowPurple");
  glowOrange = riveInstance.artboard.node("glowOrange");
  Center_Group = riveInstance.artboard.node("Center_Group");

  Center_Group2 = riveInstance2.artboard.node("Center_Group");
  glowWhite2 = riveInstance2.artboard.node("glowWhite");
  glowPurple2 = riveInstance2.artboard.node("glowPurple");
  glowOrange2 = riveInstance2.artboard.node("glowOrange");
  Center_Group2 = riveInstance2.artboard.node("Center_Group");

  // Start the first frame request
  window.requestAnimationFrame(gameLoop);
}

let lastTime = 0;

function gameLoop(time) {
  if (!lastTime) {
    lastTime = time;
  }
  const elapsedTimeMs = time - lastTime;
  const elapsedTimeSec = elapsedTimeMs / 1000;
  lastTime = time;

  // Set Audio 
  if (audio != undefined) {
    if (audio.paused) {
    } else {
      analyserNode.getFloatFrequencyData(audioData);

      let num0 = audioData[37];
      let num0_1 = audioData[20];
      let num0_2 = audioData[24];
      let num1 = audioData[30];
      let num2 = audioData[36];

      console.log(num2);
      

      let scaleValue0 = num0.map(-140, -30, 0.6, 1.4);
      let scaleValue0_1 = num0_1.map(-140, -30, 0, 2);
      let scaleValue0_2 = num0_2.map(-140, -30, 0, 2);
      let scaleValue1 = num1.map(-140, -30, 0.6, 1.4);
     

      let yPosition1 = num2.map(-140, -30, 0, -100);

      Center_Group.scaleX = scaleValue0*0.8;
      Center_Group.scaleY = scaleValue0*0.8;

      glowOrange.scaleX = scaleValue0_1*0.9;
      glowOrange.scaleY = scaleValue0_1*0.9;

      glowPurple.scaleX = scaleValue1;
      glowPurple.scaleY = scaleValue1;

      Center_Group2.scaleX = scaleValue0*0.8;
      Center_Group2.scaleY = scaleValue0*0.8;

      glowPurple2.scaleX = scaleValue0_1*0.9;
      glowPurple2.scaleY = scaleValue0_1*0.9;

      glowOrange2.scaleX = scaleValue1;
      glowOrange2.scaleY = scaleValue1;
      // glowWhite.scaleX = scaleValue0_2;
      // glowWhite.scaleY = scaleValue0_2;

      //handleJOY1.y = yPosition1;
   
    }
  }

  window.requestAnimationFrame(gameLoop);
}
