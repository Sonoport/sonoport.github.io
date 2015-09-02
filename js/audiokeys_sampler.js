window.context  = new AudioContext();
window.keyboard = new AudioKeys({
  polyphony: 4,
});

var button1 = document.getElementById('Play-Sampler-Button');
var button2 = document.getElementById('Play-Sampler-Button2')

var mute = true;
button1.addEventListener('click', buttonClickHandler);
button2.addEventListener('click', buttonClickHandler);

function buttonClickHandler() {
  mute = !mute;
  if (!mute) {
    button1.innerHTML = "Press to stop";
    button2.innerHTML = "Press to stop";
  }
  else {
    button1.innerHTML = "Click for Sampler";
    button2.innerHTML = "Click for Sampler";
  }
}

/* Get sounds from DropBox */

/* Kick */
var kickBuffer;

var getKick = new XMLHttpRequest();
getKick.open("GET", "https://dl.dropboxusercontent.com/u/428242181/Kick.wav", true);
getKick.responseType = "arraybuffer";

getKick.onload = function() {
  context.decodeAudioData(getKick.response, function(buffer) {
    kickBuffer = buffer;
  });
}

getKick.send(); 

/* Snare */
var snareBuffer;

var getSnare = new XMLHttpRequest();
getSnare.open("GET", "https://dl.dropboxusercontent.com/u/428242181/Snare.wav", true);
getSnare.responseType = "arraybuffer";

getSnare.onload = function() {
  context.decodeAudioData(getSnare.response, function(buffer) {
    snareBuffer = buffer;
  });
}

getSnare.send(); 

/* HiHat */
var hiHatBuffer;

var getHiHat = new XMLHttpRequest();
getHiHat.open("GET", "https://dl.dropboxusercontent.com/u/428242181/HiHatCL.wav", true);
getHiHat.responseType = "arraybuffer";

getHiHat.onload = function() {
  context.decodeAudioData(getHiHat.response, function(buffer) {
    hiHatBuffer = buffer;
  });
}

getHiHat.send(); 

/* Tom */
var tomBuffer;

var getTom = new XMLHttpRequest();
getTom.open("GET", "https://dl.dropboxusercontent.com/u/428242181/Tom.wav", true);
getTom.responseType = "arraybuffer";

getTom.onload = function() {
  context.decodeAudioData(getTom.response, function(buffer) {
    tomBuffer = buffer;
  });
}

getTom.send(); 


/* Create sound playback functions */

function playKick() {
  var _playKick = context.createBufferSource();
  _playKick.buffer = kickBuffer;
  _playKick.connect(delayOne);
  _playKick.connect(context.destination);
  _playKick.start(context.currentTime);
}

function playSnare() {
  var _playSnare = context.createBufferSource();
  _playSnare.buffer = snareBuffer;
  _playSnare.connect(delayTwo);
  _playSnare.connect(context.destination);
  _playSnare.start(context.currentTime);
}

function playHiHat() {
  var _playHiHat = context.createBufferSource();
  _playHiHat.buffer = hiHatBuffer;
  _playHiHat.connect(delayOne);
  _playHiHat.connect(context.destination);
  _playHiHat.start(context.currentTime);
}

function playTom() {
  var _playTom = context.createBufferSource();
  _playTom.buffer = tomBuffer;
  _playTom.connect(delayOne);
  _playTom.connect(context.destination);
  _playTom.start(context.currentTime);
}


/* Play sounds using AudioKeys */

keyboard.down( function(note) {
  if (mute) return; 

  if (note.keyCode === 65) {
    playKick();
  }
  else if (note.keyCode === 71) {
    playSnare();
  }
  else if (note.keyCode === 80) {
    playHiHat();
  }
  else if (note.keyCode === 74) {
    playTom();
  }
});

var delayOne;
var delayTwo;

function myDelay(/*_delayTime, feedback*/) {

  var delay = context.createDelay();
  delay.delayTime.value = 0;

  var _feedback = context.createGain();
  _feedback.gain.value = 0;

  var filter = context.createBiquadFilter();
  filter.frequency.value = 4000;


  filter.connect(delay);

  delay.connect(_feedback);

  _feedback.connect(filter);

  delay.connect(context.destination);


  document.getElementById('DelayTime').addEventListener('input', function() {
    delay.delayTime.value = this.value;

    console.log('DelayTime', this.value);
  });

  document.getElementById('Feedback').addEventListener('input', function() {
    _feedback.gain.value = this.value;

    console.log('Feedback', this.value);
  }); 

  return filter;

}

delayOne = myDelay();
delayTwo = myDelay();

// var delayOne = myDelay(0.3, 0.2);
// delayOne.connect(context.destination);

// // var delayTwo = myDelay(0.3, 0.5);
// delayTwo.connect(context.destination);










