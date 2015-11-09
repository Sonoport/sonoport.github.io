window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var sound;
var osc;
var currentTime;

var oscArray = [];

var globalGain = audioContext.createGain();

globalGain.gain.value = 0.2;
globalGain.connect(audioContext.destination);

function makeOsc() {
  osc = audioContext.createOscillator();
  osc.type = 'square';
  osc.frequency.value = 440;

  return osc;
}

function playLinearRamp() {
  currentTime = audioContext.currentTime;

  osc = makeOsc();

  // Make a gain node
  var gain = audioContext.createGain();

  osc.connect(gain);

  gain.connect(globalGain);

  // Set value first
  gain.gain.setValueAtTime(0.01, currentTime);

  // Attack
  gain.gain.linearRampToValueAtTime(0.9, currentTime + 2);

  // Decay
  gain.gain.linearRampToValueAtTime(0.1, currentTime + 5);

  osc.start();

  oscArray.push(osc);

  return gain;

}


function playExpRamp() {
  currentTime = audioContext.currentTime;

  osc = makeOsc();

  // Set value first
  osc.frequency.setValueAtTime(440, currentTime);

  // Attack
  osc.frequency.exponentialRampToValueAtTime(5000, currentTime + 2);

  // Decay
  osc.frequency.exponentialRampToValueAtTime(200, currentTime + 3);
  // osc.frequency.cancelScheduledValues(currentTime + 2.5);

  osc.connect(globalGain);
  osc.start();

  oscArray.push(osc);

  console.log(oscArray);

}

function playValCurve() {
  currentTime = audioContext.currentTime;

  osc = makeOsc();

  // Curve Array values
  var waveArray = new Float32Array(5);
  waveArray[0] = 200;
  waveArray[1] = 700;
  waveArray[2] = 2000;
  waveArray[3] = 100;
  waveArray[4] = 440;

  // Curve audioparam method
  osc.frequency.setValueCurveAtTime(waveArray, currentTime + 2, 4);

  osc.connect(globalGain);
  osc.start();

  oscArray.push(osc);

  console.log(oscArray);
}

function playSetTarget() {
  currentTime = audioContext.currentTime;

  var osc = makeOsc();

  // Set value first
  osc.frequency.setValueAtTime(440, currentTime);

  // Target audioparam method
  osc.frequency.setTargetAtTime(880, currentTime + 1, 0.2);

  osc.connect(globalGain);
  osc.start();

  oscArray.push(osc);

  console.log(oscArray);
}


function cancelEvents() {
  oscArray.forEach(function(e) {
    e.frequency.cancelScheduledValues(audioContext.currentTime);
  });
}

function stopSound() {
  oscArray.forEach(function(e) {
    e.stop();
  });
}

var linearButton = document.getElementById("linear");
linearButton.addEventListener('click', playLinearRamp);

var expButton = document.getElementById("exp");
expButton.addEventListener('click', playExpRamp);

var curvButton = document.getElementById("curv");
curvButton.addEventListener('click', playValCurve);

var targButton = document.getElementById("targ");
targButton.addEventListener('click', playSetTarget);

var stopButton = document.getElementById("stop");
stopButton.addEventListener('click', stopSound);

var cancelButton = document.getElementById("cancel");
cancelButton.addEventListener('click', cancelEvents);
