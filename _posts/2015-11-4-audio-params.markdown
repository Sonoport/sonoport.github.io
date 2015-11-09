---
layout:     post
title:      "Understanding AudioParams"
subtitle:   "Precision control of web audio nodes."
date:       2015-11-4 12:05:00
author:     "Tommy Roberson"
header-img: "/img/mixer.jpg"
---

Hello everyone from the Sonoport team. Today I would like to go into detail about AudioParams, which are a super neat and important part of web audio. We have seen them before, such as when we set the frequency value of a filter or the amplitude of a GainNode. All AudioParams have methods that we can use to manipulate their values. Using these methods, we can set envelopes and create more finite control structures of our audio signal using automation.

Let's first look at an example.

Say I want to add an envelope to a square wave:

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var osc = audioContext.createOscillator();
var currentTime = audioContext.currentTime;

osc.type = 'square';
osc.gain.value = 0.2;
osc.frequency.value = 0;

osc.connect(audioContext.destination)

osc.start(0);
osc.stop(4);

```

I do not advise you to run this any of this code as is, as your browser will run it upon page load. If you do, the sound will appear immediately, and if you didn't set your gain properly, you're gonna have a bad time.

I cannot stress this enough. When dealing with your audio signal **ALWAYS** use gain nodes and never set them above 1.0. **ALWAYS**. *Forever*. I blasted my ears the other day running this code and you know what?

I had a bad time.

Instead, use the buttons at the bottom of the page. There is also a link to a repository where you can download the js file and a jsfiddle so you can have fun tinkering inside of your own browser!
_____

Above, we have set up our *AudioContext*, assigned it the the variable `audioContext`, as well as created an Oscillator and assigned it to the variable `osc`, and assigned our audioContext.currentTime to the variable `currentTime`. We then initialize our oscillator's frequency value, `osc.frequency.value` at 0. The `.value` part of `osc.frequency` is our AudioParam!

Finally, we connect our oscillator to our audio output `osc.connect(audioContext.destination)`

Now, we will use the *AudioParam* methods **setValueAtTime** & **exponentialRampToValueAtTime**.


```
osc.frequency.setValueAtTime(440, currentTime)
osc.frequency.exponentialRampToValueAtTime(5000, currentTime + 1.0);

osc.frequency.exponentialRampToValueAtTime(200, currentTIme + 2.0)

```

So, let's analyze what we have just written.

The `setValueAtTime` AudioParam method will assign a specific numerical value at a specific point in time relative to the `AudioContext.currentTime`. The `exponentialRampToValueAtTime` AudioParam method will move a value exponentially to a certain number at a specified time relative to our initial `setValueAtTime` value.

I know that was a mouthful! But stay with me. It will (hopefully) all become clear in the code examples below.

The `setValueAtTime` simply sets an AudioParam *value* (the first argument) to be assigned at a specific *startTime* (the second argument). The AudioParam will be set to the assigned value a the assigned startTime. `exponentialRampToValueAtTime` ramps to a value (the first argument) exponentially until the specified endTime argument (the second argument). We also can use `linearRampToValueAtTime`, which has the same functionality except it operates *linearly* and not exponentially.

We cannot use the `exponentialRampToValueAtTime` method without first using the `setValueAtTime` method. The latter assigns a starting point that the former must use as a reference for it's own beginning.
_____

Another AudioParam method is `setValueCurveAtTime`. This method gives us another form of AudioParam automation. It accepts in array of values, and automates these values based on a beginning time argument and a duration time argument.

An example :

```
var waveArray = new Float32Array(5);
waveArray[0] = 200;
waveArray[1] = 700;
waveArray[2] = 2000;
waveArray[3] = 100;
waveArray[4] = 440;

osc.frequency.setValueCurveAtTime(waveArray, currentTime + 4, 4);

```
The above code will automate the frequency between these set values *evenly*, beginning after 4 seconds and lasting for 4 seconds. Add this code to our existing AudioParam example, and we should have something like this.

```
window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();

var globalGain = audioContext.createGain();

var currentTime = audioContext.currentTime;
var osc = audioContext.createOscillator();
console.log(osc);

osc.type = 'square';
osc.frequency.value = 0;

// Attack
osc.frequency.setValueAtTime(440, currentTime);
osc.frequency.exponentialRampToValueAtTime(5000, currentTime + 2);

// Decay
// osc.frequency.setValueAtTime(5000, currentTime + 3)
osc.frequency.exponentialRampToValueAtTime(200, currentTime + 3);

var waveArray = new Float32Array(5);
waveArray[0] = 200;
waveArray[1] = 700;
waveArray[2] = 2000;
waveArray[3] = 100;
waveArray[4] = 440;

osc.frequency.setValueCurveAtTime(waveArray, currentTime + 4, 4);

osc.connect(globalGain);
globalGain.connect(audioContext.destination);

osc.start(currentTime);
osc.stop(10);

```

The final two AudioParam methods are `setTargetAtTime` and `cancelScheduledValues`.

`setTargetAtTime` takes three arguments. The first is the target, the value that will be transitioned to. The second is the startTime, the time relative to `AudioContext.currentTime`, the transition will begin. The third is the timeConstant, or the duration of the transition.

So, if we write our code like this:

```
target.setValueAtTime(440, currentTime);

target.frequency.setTargetAtTime(880, currentTime + 1, 0.2);
```

Here, we are targeting the frequency value of an oscillator. First, use the `setValueAtTime` method to a frequency of 440 at the currentTime. This will let the `setTargetAtTime` method know at what value to start from. If you do not use `setValueAtTime` before any other AudioParam method, you will get errors and bugs and you will have a bad time.

Try the buttons to hear how each method sounds different, and see if you can follow along with the code examples above.

<button type="button" id="linear" class="btn btn-info btn-lg button-color" >linearRampToValueAtTime</button>
<br>
<br>
<button type="button" id="exp" class="btn btn-info btn-lg button-color" >exponentialRampToValueAtTime</button>
<br>
<br>
<button type="button" id="curv" class="btn btn-info btn-lg button-color" >setValueCurveAtTime</button>
<br>
<br>
<button type="button" id="targ" class="btn btn-info btn-lg button-color" >setTargetAtTime</button>
<br>
<br>
<button type="button" id="stop" class="btn btn-info btn-lg" style="background-color:red" >Stop All Sound</button>
<br>
<br>
<button type="button" id="cancel" class="btn btn-info btn-lg" style="background-color:red" >Cancel Events</button>

##JSFIDDLE##

<iframe width="100%" height="300" src="//jsfiddle.net/thomasroberson1/6rfg7d16/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<script src="js/audioParams.js"></script>
