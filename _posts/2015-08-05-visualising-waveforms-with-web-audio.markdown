---
layout:     post
title:      "Visualising Waveforms with Web Audio"
subtitle:   "Introducing the Analyser Node and the HTML5 canvas element"
date:       2015-07-29 12:00:00
author:     "Aqilah Misuary"
header-img: "img/postheader06.png"
---

Welcome to another segment on **web audio**! Previously we posted a simple [tutorial](http://sonoport.github.io/2015/07/29/onwards-web-audio-journey/) on how to use **oscillators**, **filters** and **gain nodes**. That tutorial will come in handy here as we're about to go one step further, which is to have basic visualisation of waveforms using web audio. A good reference would be [this](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API), however when we first started it was difficult to understand most of that because we basically dived in straight into web audio without really understanding any of the basics yet. So to prevent that, you might want to read our previous web audio articles [here](sonoport.github.io) before moving on.

So...are you ready? Lets start!

###<span style="color:darkblue">Simplifying the code</span>

Taken from the previous [tutorial](http://sonoport.github.io/2015/07/29/onwards-web-audio-journey/), to make sound we ended up with this code:

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

Now that was to show you how to use the oscillator, filter and gain nodes. For this tutorial, we won't be using those so lets simplfy this code even more. Minus the filter and gain nodes, we'll just create sound using a oscillator node.

```
// Create the Audio Context

var context = new AudioContext();

// Create your oscillator

var osc = context.createOscillator();

osc.frequency.value = 250;

// Play the sound inside of Chrome

function playSound() {
    osc.connect(context.destination);
    osc.start(0);
    osc.stop(3);
}

playSound();
```

You may test this code out at [JSFiddle](http://jsfiddle.net/).
The reason why we are simplifying the code is so that you won't get confused once we integrate the _Analyser Node_, data collection methods and HTML5 __Canvas Element__.

###<span style="color:darkblue">Using the AnalyserNode</span>

Now before we get to the exciting part, I would like to introduce you to the [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) which is essential in helping us visualising our audio waveforms. 

**<span style="color:darkblue">So what is an AnalyserNode?</span>** 
<blockquote>It is an AudioNode that passes the audio stream unchanged from the input to the output, but allows you to take the generated data, process it, and create audio visualizations.</blockquote>

Our audio source is our oscillator node, and the analyser node extracts the frequency, waveform, and other data from the original oscillator node. 
To do this, we must create the analyser node using the [AudioContext.createAnalyser()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createAnalyser) method.

**<span style="color:darkblue">Creating the analyser node</span>**

```
var context = new AudioContext();
var analyser = context.createAnalyser();
```

**<span style="color:darkblue">The Connections</span>**

```
osc.connect(analyser);
analyser.connect(context.destination);
```
An interesting thing to take note is that you do not have to connect the analyser node to any output for it to work. It will work as long as the input is connect to the source directly or via another node. For now, we are connecting it to the `context.destination` so that we will be able to hear our oscillator.

<blockquote>The analyser node will then capture audio data using a Fast Fourier Transform (fft) in a certain frequency domain, depending on what you specify as the AnalyserNode.fft property value (if no value is specified, the default is 2048.)</blockquote>

This brings us to...

**<span style="color:darkblue">Analyser Node's Data Collection Methods</span>**

There are different methods for capturing various types of data.

To capture frequency data, we use:

- [AnalyserNode.getFloatFrequencyData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatFrequencyData)

- [AnalyserNode.getByteFrequencyData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteFrequencyData)

To capture waveform data, we use:

- [AnalyserNode.getByteTimeDomainData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteTimeDomainData)

- [AnalyserNode.getFloatTimeDomainData()](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getFloatTimeDomainData)

The `AnalyserNode.getFloatFrequencyData()` will return a `Float32Array` typed array. `Float32Array` represents an array of 32-bit floating point numbers (corresponding to the C float data type) in the platform byte order. More infomation on that [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array). 

However, the rest of the methods `AnalyserNode.getByteFrequencyData()`, `AnalyserNode.getByteTimeDomainData()` and `AnalyserNode.getFloatTimeDomainData()` returns a Uint8Array, which is an array of 8-bit unsigned integers. More infomation on that [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array).

Let say you are dealing with the fft size of 2048 (which is the default) and we are using the `AnalyserNode.frequencyBinCount` method and returning its value:

```
analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount; 
var dataArray = new Uint8Array(bufferLength);
```

What is happening here is that we are creating a new variable, `bufferLength` and transfering data from the `AnalyserNode.frequencyBinCount` method to it. Then we take that `bufferLength` and convert it into a `Uint8Array` data type which is now located in the variable `dataArray`.

That was just the process of converting the data. To actually retrieve the data and copy it into our array, we must call the data collection method we want, with the array passed as it's argument.

Like this:
```
analyser.getByteTimeDomainData(dataArray); 
```

Now then we have the audio data captured in our array and we can move on to using it to visualise our waveform, which brings us to...

###<span style="color:darkblue">The HTML5 canvas Element</span>

Once again, a good reference would be [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas). 

**<span style="color:darkblue">So what is the HTML5 canvas element?</span>**

<blockquote>Added in HTML5, the HTML canvas element can be used to draw graphics via scripting in JavaScript. For example, it can be used to draw graphs, make photo compositions, create animations, or even do real-time video processing or rendering.</blockquote>

The HTML 5 canvas element is really fun to play with and I don't think I would want to squeeze in all the tutorials in one blog post so here are some links for you to check out!

**<span style="color:darkblue">Web Articles</span>**

- [w3schools.com](http://www.w3schools.com/html/html5_canvas.asp)
- [Html5CanvasTutorials.com](http://www.html5canvastutorials.com/)
- [TutorialsPoint.com](http://www.tutorialspoint.com/html5/html5_canvas.htm)
- [Article on impressive HTML5 canvas experiments](http://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210)

**<span style="color:darkblue">Video Tutorials</span>**

- [Video Tutorial by Adam Khoury](https://www.youtube.com/watch?v=RV3SaSH8lw0)
- [Learning HTML5 canvas features step by step](https://www.youtube.com/watch?v=28Tf52k1wM8)
- [Introduction to HTML5 Canvas Animation](https://www.youtube.com/watch?v=VS1mD9Z0h-Q)

It's really a lot to take in, I would recommend you to take your time learning the basics and experiment around with the `<canvas>` element until you are comfortable with it before moving on with the rest of the tutorial here as it might be hard (but not impossible) to understand if you do not have any previous knowledge.

Are you ready?

<br>
<br>
<button type="button" id="myAnalyzerButton" class="btn btn-success btn-lg">Click for Analyzer!</button>

<!-- Scripts & Styles -->

<body>
  <h1>Oscillator</h1>
  <canvas class="visualizer";id="myCanvas";width="640" height="100"></canvas>
</body>

<script language="javascript" type="text/javascript" src="js/analyzer-node.js"></script>





