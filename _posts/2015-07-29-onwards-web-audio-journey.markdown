---
layout:     post
title:      "Onwards with our Web Audio Journey"
subtitle:   "Oscillators, Filters and Gain Nodes"
date:       2015-07-29 12:00:00
author:     "Tommy Roberson"
header-img: "img/postheader04.png"
---

To help guide you on your web audio journey our first segment will be about the Audio Context, how to create Oscillators, Filters, and Gain. 

Inside of the API, everything is a node! NODE! NODE! node... What is a node? Think of it as a tree. At the base of the tree (the trunk of the tree?) is the.

`Audio Context` 

The Audio Context is the system within which all of our signals, control or audio, will be routed. To invoke functions they will be called from the Audio Context object. 

To create the Audio Context inside of JavaScript, at the beginning top of your JavaScript file declare it as a new variable - 

`var context = new Audio Context();`

To create an oscillator, you must use the function 

`context.createOscillator`

We create an oscillator using the `createOscillator` function of the Audio Context object!

This will also be how we create our filter node and our gain node.

`context.createBiQuadFilter` and `context.createGain`

So, our initial code setup should be as follows  

<pre><code>// Create the Audio Context

var context = new AudioContext(); 

// Create your oscillator, filter and gain node by declaring them as variables 

var osc = context.createOscillator();

var filter = context.createBiquadFilter();
filter.type = 'lowpass';
filter.frequency.value = 250;

var oscGain = context.createGain();
oscGain.value = 0.3; </code></pre>

The properties `filter.type`, `filter.frequency.value`, and `oscGain.value` are self explanatory. The filter type should be input as a string as either 'highpass' or 'lowpass', frequency value is any number value between 0 and 20,000 (the audible frequency range of the human ear), and the oscGain value is the amplitude or loudness of the sound, and should be equal to a floating value between 0.0 and 1.0. 

__!!A word of caution!!__ It is not safe to use values at 1.0 or above for oscGain.value, In fact I recommend you stick to values 0.5 and below. Anything above and you run the risk of damaging your speakers (or worse!) your ears. Take it from someone who has experienced messing around unknown amplitude values... It hurts! 

When dealing with any audio signal, you must always be aware of where your signal is going and at what amplitudes it is throughout each gain stage (the discrete stages of signal amplification). 

_This code can bite!_

The next step is to create two simple functions, one that will connect our signals (or nodes) together. The next function will output them to your computer's speakers and play the sine oscillator for a duration of 3 seconds.

This code is as follows -

<pre><code>
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
</code></pre>

The line `oscGain.connect(context.destination)` is where you connect the final signal to the computer's speakers, known here as the _destination_. The `osc.start` and `osc.stop` functions begin and end the signal respectively, and take number values defined in seconds as arguments. 

---
Lastly, we must call the functions for our browser to execute them - 

<code>makeConnection();
playSound();
</code>

In total, the entire script should look as follows - 

<pre><code>// Create the Audio Context

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
</code></pre>

