---
layout:     post
title:      "Onwards with our Web Audio Journey"
subtitle:   "Oscillators, Filters and Gain Nodes"
date:       2015-07-29 12:00:00
author:     "Tommy Roberson"
header-img: "img/postheader04.png"
---

To help guide you on your web audio journey this segment will be about the Audio Context, how to create Oscillators, Filters, and Gain nodes. Previously we have complied a bunch of information that would be useful for anyone to start on web audio
[here](http://sonoport.github.io/2015/06/08/learning-web-audio-api/), then we went through through the basics of making sound and the brief history of Web Audio API [here](http://sonoport.github.io/2015/07/06/more-on-web-audio-api/), now for this post, we are going to talk more about...nodes!

Inside of the API, everything is a node! NODE! NODE! node... What is a node? A node, or specifically an AudioNode, is the unit of processing inside WebAudio. We as developers, have to connect these AudioNodes in various patterns to generate, process and analyse audio. Such a connected set of AudioNodes is called an AudioGraph. Think of it as a tree. At the base of the tree (the trunk of the tree?) is the.

`Audio Context`

The Audio Context is the system within which all of our signals, control or audio, will be routed. All corresponding functions will be called from the Audio Context object.

To create the Audio Context, you can use the AudioContext constructor. To play nicely with browsers which still have AudioContext vendor prefixed (ahem! Safari), we have to monkey-patch the constructor before calling it.

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
```

We create an oscillator using the `createOscillator` function of the Audio Context object.

`context.createOscillator`

Similarly, a filter (BiQuadFilter) and a Gain can be created from the AudioContext.

`context.createBiQuadFilter` and `context.createGain`

Now that we have created the Oscillator, Filter and Gain Nodes, we can initialize them to do specific thing. We initialize these Nodes by assigning values to their attributes. Some of these attributes are called parameters (AudioParams) and expose more grannular controls. We'll visit them in a future blog post.

```
// Create the Audio Context

var context = new AudioContext();

// Create your oscillator, filter and gain node by declaring them as variables

var osc = context.createOscillator();

var filter = context.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 250;

var oscGain = context.createGain();
oscGain.gain.value = 0.3;
```

The parameters `filter.type`, `filter.frequency.value`, and `oscGain.value` are self explanatory. The filter type should be input as a _String_ as either 'highpass' or 'lowpass', frequency value is any _Number_ value between 10Hz and 22,050 (or half of the sampling rate of the AudioContext), and the `oscGain.gain` value is the amplitude or loudness of the sound, and should be equal to a _Number_ between 0.0 and 1.0. 1.0 denoting full volume, and 0.0 denoting no sound.

__!!A word of caution!!__ It is not safe to use values at 1.0 or above for `oscGain.gain.value`, In fact I recommend you stick to values 0.5 and below. Anything above and you run the risk of damaging your speakers (or worse!) your ears. Take it from someone who has experienced messing around unknown amplitude values... It hurts!

When dealing with any audio signal, you must always be aware of where your signal is going and at what amplitudes it is throughout each stage.

_This code can bite!_

The next step is to create two simple functions, one that will connect our signals (or nodes) together. The next function will output them to your computer's speakers and play the sine oscillator for a duration of 3 seconds.

This code is as follows -

```
function makeConnection() {
    osc.connect(filter);
    filter.connect(oscGain);
}

// Play the sound inside of Chrome

function playSound() {
    oscGain.connect(context.destination);
    osc.start(0);
    osc.stop(3);
}

```

The line `oscGain.connect(context.destination)` is where you connect the final signal to the computer's speakers, known here as the _destination_. The `osc.start` and `osc.stop` functions begin and end the generation of the signal respectively, and take _Number_ values defined in seconds as their first argument. These values determine when the respective actions (starting and stopping of the oscillator) exactly take place. So here we'll start the oscillator at the 0th second, and stop it at the 3rd second.

This ability to precisely time the starting and stopping of nodes is one of the most important parts of WebAudio. However, we have to keep in mind that value of time passed as arguments to the `start` and `stop` methods is in the same time coordinate system as the AudioContext's `currentTime` attribute. Think of `currentTime` as a clock which is global to a specific AudioContext. You can schedule things precisely on that clock. Hence all timings have to defined in relation to that clock.

---
Lastly, we must call the functions for our browser to execute them -

```
makeConnection();
playSound();
```

In total, the entire script should look as follows -

```
// Create the Audio Context

var context = new AudioContext();

// Create your oscillator, filter and gain node by declaring them as variables

var osc = context.createOscillator();

var filter = context.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 250;

var oscGain = context.createGain();
oscGain.value = 0.3;


// Connect the nodes together

function makeConnection() {
    osc.connect(filter);
    filter.connect(oscGain);
}

// Play the sound inside of Chrome

function playSound() {
    oscGain.connect(context.destination);
    osc.start(0);
    osc.stop(3);
}

makeConnection();
playSound();
```

