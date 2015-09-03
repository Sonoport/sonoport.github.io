---
layout:     post
title:      "Audio Sampling and the Delay Node"
subtitle:   "Turning AudioKeys into a sampler and learning effects with the delay node"
date:       2015-09-02 12:05:00
author:     "Tommy Roberson"
header-img: "/img/norwaytunnel.jpg"
---

Hello again from the Sonoport team! Last week we did a tutorial on the [AudioKeys library](https://github.com/kylestetz/AudioKeys), utilizing it to make a qwerty keyboard syntheszier. Now, let's turn that synthesizer into a sampler, and add a delay effect to it. While simple in theory, we will see that audio playback in web audio is a bit more involved than creating oscillators.

Below is what we will build today. Use the **a, j, g and p keys** respectively to play with the drum samples. 

Click the button, then press the keys! 

<div class="button-container">
  <button type="button" id="Play-Sampler-Button2" class="btn btn-info btn-lg button-color">Click for Sampler</button>
</div>

###Delay Time Slider###

<input id="DelayTime" type="range" min="0" max="2" step="0.01" value="0.1"/>

###Feedback Slider###

<input id="Feedback" type="range" min="0" max="0.9" step="0.01" value="0.1"/>

First, let me explain how the webaudio API handles audio playback. When we want to play an audio file, we must *decode* that audio file. Our internet browser is only a piece of software that connects us to the world wide web, nothing more (well maybe a bit more...) and nothing less. Because the browser will not understand us when we say "Hey, Chrome, play this fat kick!", we need to speak to the browser in a language it can understand, the beautiful prose of binary. 

So please, sit back and begin typing - 00010010011000101001110000010011010100010...



___

###<span style="color:#94ABC1">XMLHttpRequest & decodeAudioData</span>###

Just kidding. Using the webaudio API, JavaScript will decode our digital audio data for us. But first, we must fetch our audio data from a server. 

This is where things get a little messy. You will need to either store your files on your own web server, or use a cloud storage provider that permits you to use an XMLHttpRequest. You can store them in a GitHub repository, however in this tutorial I will be using Dropbox. 

To create a Dropbox account head over to [here](https://www.dropbox.com/). To use a Dropbox account to request audio files we must place our audio files into a *public* folder. 

*If you created your Dropbox account after 2012, you will need a pro or business account to create a public folder*. 

Setting this up can be a bit of a task in and of itself, but it is really worth it if you want to start playing around with webaudio samples. Please visit this [link](https://www.dropbox.com/enable_public_folder) to create a public folder on your dropbox account if you do not already have one. 

So, enough talk, let's get to some code. 

First, let's setup our AudiContext as well as AudioKeys -

```
window.context  = new AudioContext();
window.keyboard = new AudioKeys({
  polyphony: 4,
  rows: 1,
});
```

Above we have created a context variable inside of the window object and assigned it to a new instance of the `AudioContext()`. We then did the same with `window.keybaord`, only we assigned it to a new instance of `AudioKeys` assigning polyphony to 4.
___
Stored on my Dropbox public folder are four files named Kick.wav, Tom.wav, Snare.wav and Hihat.wav. 

Below is how JavaScript receives the Kick.wav file from the server. 

```
var kickBuffer;

var getKick = new XMLHttpRequest();
getKick.open("GET", "https://dl.dropboxusercontent.com/u/428242181/Kick.wav", true);
getKick.responseType = "arraybuffer";
```

Whoa, what just happened. Let me explain. 

To access Dropbox (or your preferred server), create a `XMLHttpRequest()` object by assigning it to a variable and use the methods `.open` and `.responseType`. The `.open` method takes the arguments "GET", the URL of your file, and true. Don't worry about the first and last arguments, for now they will not change. Just know that you must stick the URL of your file inbetween them. Next, we use the method `.responseType` and assign it to the string "arraybuffer". 

```
getKick.onload = function() {
  context.decodeAudioData(getKick.response, function(buffer) {
    kickBuffer = buffer;
  });
}

getKick.send(); 
```

I know, more craziness. 

Here we use the .onload method and assign it to a function we want to run once we have received our audio data. This is where the web audio API will translate the 0s and 1s for us using `context.decodeAudioData`. This method takes two arguments, `getKick.response`, and a function that stores our newly decoded audio in a buffer inside of the browser. 

This is how sample playback in web audio works - 

We fetch the file, then we decode it, then we store it in a buffer where we can access it using a special node called the __AudioBufferSourceNode__. It is created by calling `context.createBufferSource`. We will create a function that will assign a variable to a new AudioBufferSourceNode, then input our decoded audio buffer into this AudioBufferSourceNode.  

```
function playKick() {
  var _playKick = context.createBufferSource();
  _playKick.buffer = kickBuffer;
  _playKick.connect(delayOne);
  _playKick.connect(context.destination);
  _playKick.start(context.currentTime);
}
```

This all looks correct, but there is something amiss here. Can you find it? 
___

###<span style="color:#8A736B">DelayNode</span>###

What is delayOne? This is our first *DelayNode*. 

The DelayNode delays an input signal by a time you specify, in seconds. You specify this time ammount using the DelayNode's audioparam DelayNode.delayTime. But this is not exactly what we want. It is not what most musicians would think of as a delay. This is because the DelayNode does exactly what it says it does, it *delays* the input signal. What we need is both a wet and a dry signal, as well as an argument for delay feedback. We do these using the GainNode interface. 

Below I have designed a simple function that takes two arguments, one is the ammount of delay we want in seconds, the second is the ammount of feedback we want, from 0 to 1. **Do not input values more than 1** You will destroy your speakers, and potentially your ears. I recommend not inputing values above 0.9.

```
function myDelay(_delayTime, feedback) {
    
    var delay = context.createDelay();
    delay.delayTime.value = _delayTime;

    var _feedback = context.createGain();
    _feedback.gain.value = feedback;

    var filter = context.createBiquadFilter();
    filter.frequency.value = 4000;

    
    filter.connect(delay);
    
    delay.connect(_feedback);
    
    _feedback.connect(filter);

    delay.connect(context.destination);
}
```

As seen above, create a DelayNode by assigning the variable `var delay = context.createDelay();`. Then assign your `delay.delayTime` to the function argument _delayTime. 

After that, create a feedback loop using a gain node, assigning the gain.value to the funciton argument named feedback. 
Then, for a nice dub delay effect, add a BiquadFilterNode to the delay. 

So, creating the function myDelay gives us control over how many delays we want and let's us assign different parts of our audio signal to different delays. 

For example, in the complete code below, There are two delay wet signals and one dry signal. The snare, tom and hihat, are sent to one delay and the Kick to it's own separate delay. 

```
window.context  = new AudioContext();
window.keyboard = new AudioKeys({
  polyphony: 4,
  rows: 1,
});

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


function myDelay(_delayTime, feedback) {
    
    var delay = context.createDelay();
    delay.delayTime.value = _delayTime;

    var _feedback = context.createGain();
    _feedback.gain.value = feedback;

    var filter = context.createBiquadFilter();
    filter.frequency.value = 4000;

    
    filter.connect(delay);
    
    delay.connect(_feedback);
    
    _feedback.connect(filter);

    delay.connect(context.destination);
}

var delayOne = myDelay(0.3, 0.2);
delayOne.connect(context.destination);

var delayTwo = myDelay(0.3, 0.5);
delayTwo.connect(context.destination);
```

The code above will work when you run it on your machine.

<script src="js/audiokeys.js"></script>
<script src="js/audiokeys_sampler.js"></script>


















