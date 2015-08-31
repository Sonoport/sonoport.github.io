---
layout:     post
title:      "Visualising Waveforms with Web Audio"
subtitle:   "Introducing the Analyser Node and the HTML5 canvas element"
date:       2015-08-05 12:05:00
author:     "Aqilah Misuary"
header-img: "img/postheader06.png"
---

Welcome to another segment on **web audio**! Previously we posted a simple [tutorial](http://sonoport.github.io/2015/07/29/onwards-web-audio-journey/) on how to use **oscillators**, **filters** and **gain nodes**. That tutorial will come in handy here as we're about to go one step further, which is to have basic visualisation of waveforms using web audio. A good reference would be [this](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API), however when we first started it was difficult to understand most of that because we basically dived in straight into web audio without really understanding any of the basics yet. So to prevent that, you might want to read our previous web audio articles [here](sonoport.github.io) before moving on.

So...are you ready? Lets start!

###<span style="color:#5680B0">Simplifying the code</span>

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

For the purposes of this tutorial, we will not use the BiQuadFilter node. Instead we'll just create sound using an oscillator node and a gain node.

```
// Create the Audio Context

var context = new AudioContext();

// Create your oscillator

var osc = context.createOscillator();

osc.frequency.value = 60;

// Play the sound inside of Chrome

function playSound() {
    var osc = context.createOscillator();
    osc.frequency.value = 60;
    osc.type = 'square';
    
    oscGain = context.createGain();
    oscGain.gain.value = 0.2;

    osc.start(context.currentTime);
    osc.stop(context.currentTime + 3);

    osc.connect(oscGain);   
    oscGain.connect(analyser); /*Connect oscillator to analyser node*/
    analyser.connect(context.destination);
}

playSound();
```
We will also drop the makeConnection function, and connect the oscillator to the analyzer inside of our `playSound` function.

You may test this code out at [JSFiddle](http://jsfiddle.net/).
The reason why we are simplifying the code is so that you won't get confused once we integrate the _Analyser Node_, data collection methods and HTML5 __Canvas Element__.

###<span style="color:#677786">Using the AnalyserNode</span>

Now before we get to the exciting part, I would like to introduce you to the [AnalyserNode](https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode) which is essential in helping us visualising our audio waveforms. 

**<span style="color:#CAA24E">So what is an AnalyserNode?</span>** 
<blockquote>It is an AudioNode that passes the audio stream unchanged from the input to the output, but allows you to take the generated data, process it, and create audio visualizations.</blockquote>

Our audio source is our oscillator node, and the analyser node extracts the frequency, waveform, and other data from the original oscillator node. 
To do this, we must create the analyser node using the [AudioContext.createAnalyser()](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createAnalyser) method.

**<span style="color:#CAA24E">Creating the analyser node</span>**

```
var context = new AudioContext();
var analyser = context.createAnalyser();
```

**<span style="color:#CAA24E">The Connections</span>**

```
osc.connect(analyser);
analyser.connect(context.destination);
```
An interesting thing to take note is that you do not have to connect the analyser node to any output for it to work. It will work as long as the input is connect to the source directly or via another node. For now, we are connecting it to the `context.destination` so that we will be able to hear our oscillator.

<blockquote>The analyser node will then capture audio data using a Fast Fourier Transform (fft) in a certain frequency domain, depending on what you specify as the AnalyserNode.fft property value (if no value is specified, the default is 2048.)</blockquote>

This brings us to...

**<span style="color:#B13830">Analyser Node's Data Collection Methods</span>**

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

###<span style="color:#307E91">The HTML5 canvas Element</span>

Once again, a good reference would be [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas). 

**<span style="color:#AAA09F">So what is the HTML5 canvas element?</span>**

<blockquote>Added in HTML5, the HTML canvas element can be used to draw graphics via scripting in JavaScript. For example, it can be used to draw graphs, make photo compositions, create animations, or even do real-time video processing or rendering.</blockquote>

The HTML 5 canvas element is really fun to play with and I don't think I would want to squeeze in all the tutorials in one blog post so here are some links for you to check out!

**<span style="color:#AAA09F">Web Articles</span>**

- [w3schools.com](http://www.w3schools.com/html/html5_canvas.asp)
- [Html5CanvasTutorials.com](http://www.html5canvastutorials.com/)
- [TutorialsPoint.com](http://www.tutorialspoint.com/html5/html5_canvas.htm)
- [Article on impressive HTML5 canvas experiments](http://code.tutsplus.com/articles/21-ridiculously-impressive-html5-canvas-experiments--net-14210)

**<span style="color:#AAA09F">Video Tutorials</span>**

- [Video Tutorial by Adam Khoury](https://www.youtube.com/watch?v=RV3SaSH8lw0)
- [Learning HTML5 canvas features step by step](https://www.youtube.com/watch?v=28Tf52k1wM8)
- [Introduction to HTML5 Canvas Animation](https://www.youtube.com/watch?v=VS1mD9Z0h-Q)

It's really a lot to take in, I would recommend you to take your time learning the basics and experiment around with the `<canvas>` element until you are comfortable with it before moving on with the rest of the tutorial here as it might be hard (but not impossible) to understand if you do not have any previous knowledge.

Are you ready?

As a continuation from the previous steps, we would already have the data ready for visualisation.

Now firstly we would need to clear the canvas of any previous drawings to get ready for display.

```
myCanvas.clearRect(0, 0, WIDTH, HEIGHT);
```

Then we define a function `draw()`

```
function draw() {
```

Here we are requesting `requestAnimationFrame` to keep looping the drawing function once it starts.

```
drawVisual = requestAnimationFrame(draw);
```

Then refering to the previous section on retrieving the data and copying it into our array, here is where we do it.

```
analyser.getByteTimeDomainData(dataArray);
```

After that we fill the canvas with a solid colour.
 
``` 
myCanvas.fillStyle = 'rgb(200, 200, 200)';
myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
```

Set the width of the line and stroke colour for the waveform, then start drawing the path.

```
myCanvas.lineWidth = 2;
    myCanvas.strokeStyle = 'rgb(0, 0, 0)';

    myCanvas.beginPath();
```

Set the width of each segment of the line drawn by dividing the canvas length by array length (which is the FrequencyBinCount defined earlier). Then we define a x variable to set the position to move for drawing each segment of the line.

```
  var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;
```

Here we make a loop, defining a small segment of the waveform for each point in the buffer at a certain height based on the data point value from the array, then moving the line across to the place where the next segment will be drawn.

```
  for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          myCanvas.moveTo(x, y);
        } else {
          myCanvas.lineTo(x, y);
        }

        x += sliceWidth;
      };
```

Then we finish the line on the middle, right hand side of the canvas and draw the stroke we defined. 

```
  myCanvas.lineTo(canvas.width, canvas.height/2);
      myCanvas.stroke();
    };
```

Finally we call the draw() function to start off the process.

```
draw();
```

So the whole canvas code we just did would look like this.

```
myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
  drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  
  myCanvas.fillStyle = 'rgb(200, 200, 200)';
  myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
  myCanvas.lineWidth = 2;
      myCanvas.strokeStyle = 'rgb(0, 0, 0)';

      myCanvas.beginPath();
  var sliceWidth = WIDTH * 1.0 / bufferLength;
      var x = 0;
  
  for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          myCanvas.moveTo(x, y);
        } else {
          myCanvas.lineTo(x, y);
        }

        x += sliceWidth;
      };
  
  myCanvas.lineTo(canvas.width, canvas.height/2);
      myCanvas.stroke();
    };

draw();
```

Then if we combine the web audio codes and the visualiser codes, we would get this.

```
// Create the Audio Context

var context = new AudioContext();
var analyser = context.createAnalyser();
var WIDTH = 300;
var HEIGHT = 300;

function playSound() {
    var osc = context.createOscillator();
    osc.frequency.value = 60;
    osc.type = 'square';
    
    oscGain = context.createGain();
    oscGain.gain.value = 0.2;

    osc.start(context.currentTime);
    osc.stop(context.currentTime + 3);

    osc.connect(oscGain);   
    oscGain.connect(analyser); /*Connect oscillator to analyser node*/
    analyser.connect(context.destination);
}

var canvas = document.querySelector('.visualizer');
var myCanvas = canvas.getContext("2d");

analyser.fftSize = 2048;

var bufferLength = analyser.frequencyBinCount; 
/*an unsigned long value half that of the FFT size. This generally equates to 
the number of data values you will have to play with for the visualization*/

var dataArray = new Uint8Array(bufferLength);

myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

function draw() {
  drawVisual = requestAnimationFrame(draw);
  
  analyser.getByteTimeDomainData(dataArray);
  
  myCanvas.fillStyle = 'rgb(230, 20, 210)';
  myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
  myCanvas.lineWidth = 2;
  myCanvas.strokeStyle = 'rgb(40, 95, 95)';
  myCanvas.beginPath();
  
  var sliceWidth = WIDTH * 1.0 / bufferLength;
  var x = 0;
  
  for(var i = 0; i < bufferLength; i++) {
   
        var v = dataArray[i] / 128.0;
        var y = v * HEIGHT/2;

        if(i === 0) {
          myCanvas.moveTo(x, y);
        } else {
          myCanvas.lineTo(x, y);
        }

        x += sliceWidth;
      };
  
  myCanvas.lineTo(canvas.width, canvas.height/2);
      myCanvas.stroke();
};

var analyserButton = document.getElementById("myAnalyserButton")

analyserButton.addEventListener('click', function() {
  playSound();
  draw();
});




```

One last bit of HTML to finish off the whole process. 

```
  <canvas class="visualizer";id="myCanvas";width="640" height="100"></canvas>
```

You can check out the whole code [here](http://jsfiddle.net/aqilahmisuary/ztf5a72h/#base).

<!-- Scripts & HTML -->


<h1>Oscillator</h1>
<canvas class="visualizer";id="myCanvas";width="640" height="100"></canvas>

<div class="button-container">
  <button type="button" id="myAnalyserButton" class="btn btn-info btn-lg button-color">Click for Analyser!</button>
</div>


<script language="javascript" type="text/javascript" src="js/analyser-node.js"></script>








