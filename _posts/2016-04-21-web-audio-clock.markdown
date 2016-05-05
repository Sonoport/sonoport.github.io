---
layout:     post
title:      "Understanding The Web Audio Clock"
subtitle:   "A gentle summary of it"
date:       2016-04-21 12:05:00
author:     "Aqilah Misuary"
header-img: "/img/glowsky.jpg"
---

Hey everybody! It's been awhile since the last post! This week I'm going to tackle one of the most confusing aspect of web audio (at least for me) which is the web audio clock. You might have heard of this legendary web audio tutorial by Chris Wilson called [A Tale of Two Clocks - Scheduling Web Audio with Precision](http://www.html5rocks.com/en/tutorials/audio/scheduling/) which I have been reading since last year. Yeah that's true, please understand I came from zero knowledge of web programming and just decided to plunge into web audio like jumping off a cliff. It has been a really fun learning experience though, with the help of resources such as [Nodeschool](http://nodeschool.io/), [Udemy](https://www.udemy.com/) and [CodeAcademy](https://www.codecademy.com/), I'm still far from being an excellent coder but slowly but surely.

Anyways I read that tutorial multiple times (you could probably understand it faster than I did) until I've finally grasped the concept. Another wonderful learning resource would be [William Turner's Introduction to the Web Audio API](https://app.pluralsight.com/library/courses/web-audio-api-introduction/) which is not free because it's Pluralsight but I really recommend it if you learn better by watching videos.

So lets start!

<h2>The audioContext time</h2>

The Web Audio API lets you access the audio subsystem's hardware clock through its `audioContext.currentTime` property and this is running the moment you instantiated the audioContext.

`var audioContext = new AudioContext()`

<p data-height="122" data-theme-id="dark" data-slug-hash="vGrMWN" data-default-tab="result" data-user="aqilahmisuary" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/aqilahmisuary/pen/vGrMWN/">AudioContext Time</a> by Aqilah Misuary (<a href="http://codepen.io/aqilahmisuary">@aqilahmisuary</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

This clock can be used to schedule audio events or parameters using the `start()`, `stop()` or `setValueAtTime()` methods.

Some developers (unfortunately me when I first started learning) have used the methods this way.

```
var osc = audioContext.createOscillator();
osc.frequency.value = 200;
osc.connect(audioContext.destination);

osc.start(0);
osc.stop(0.5);
```

Which is not good practice as it should've been

```
osc.start(audioContext.currentTime);
osc.stop(audioContext.currentTime + 0.5);
```

Since 0 might have already passed by the time the function is triggered.

The precision of the Web Audio API's timing clock is different from the browser's built-in `setTimeout()` and `setInterval()` methods. This is because those methods use the same thread as the rest of the DOM whereas the web audio clock operates on a separate thread. This is why if you use `setTimeOut()` to directly schedule notes and try to quickly resize the window, the timing gets messed up. 

Therefore to solve this we have to make the Javascript timer methods collaborate with the web audio clock.

How do we do that? 

We need to have a system where we have intervals of `setTimeout()` being fired and each time it does that, it triggers a function that schedules future individual notes. Everytime it's fired, the `setTimeout()` timer will have to check if there's any notes that needs to be scheduled based on the current tempo. Using this, it will also give us flexibility to change tempo on the fly.

<h2>Scheduling notes into the future</h2>

This is the core of the scheduler function. 

```
var nextNotetime = audioContext.currentTime;

function scheduler() {

    while(nextNotetime < audioContext.currentTime + 0.1) {

        nextNotetime += 0.5;
    }

    window.setTimeout(scheduler, 50.0);
}

scheduler();
```

What's happening here is that the `scheduler()` is a recursive function that is checking if any notes needs to be scheduled and it is doing so 10 ms before the `audioContext.currentTime` catches up. So in this case if there are notes that needs to be scheduled, it will then schedule them. 

Another easier way to do this without using recursion is to use `setInterval()`. So the `scheduler()` function is being invoked every 50ms to check for the `nextNotetime`.

```
function scheduler() {

    while(nextNotetime < audioContext.currentTime + 0.1) {

        nextNotetime += 0.5;
        nextNote.innerHTML = nextNotetime;
    }
}

window.setInterval(scheduler, 50.0);
```

In the end it's up to you to use the method that would be easier for you to understand. 

<p data-height="266" data-theme-id="dark" data-slug-hash="VadJoN" data-default-tab="result" data-user="aqilahmisuary" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/aqilahmisuary/pen/VadJoN/">Scheduler Function (with Sound)</a> by Aqilah Misuary (<a href="http://codepen.io/aqilahmisuary">@aqilahmisuary</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

<h2>Using this information to play sound</h2>

Firstly we create our `playSound()` function so that we can play the oscillator sound when ever it's triggered.

```
function playSound(time) {
  
  var osc = audioContext.createOscillator();
  osc.connect(audioContext.destination);
  osc.frequency.value = 200;
  osc.start(time);
  osc.stop(time + 0.1);
  
};
```
Then we insert it into our `scheduler()` function so that the sound will be playing every `nextNotetime`.

```
function scheduler() {

    while(nextNotetime < audioContext.currentTime + 0.1) {
        
        nextNotetime += 0.5;
        nextNote.innerHTML = nextNotetime;
        playSound(nextNotetime);
    }

   timerID = window.setTimeout(scheduler, 50.0);
};
```
See it in action on Codepen below.

<p data-height="339" data-theme-id="dark" data-slug-hash="ONEKVM" data-default-tab="result" data-user="aqilahmisuary" data-embed-version="2" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/aqilahmisuary/pen/ONEKVM/">Scheduler Function (with Sound)</a> by Aqilah Misuary (<a href="http://codepen.io/aqilahmisuary">@aqilahmisuary</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

As you can see the `audioContext.currentTime` will keep on running even when you press stop. When you start the `nextNotetime` again, it will continue from where the `audioContext.currentTime` is currently at.

From this understanding of how we can manipulate the web audio clock, I created a simple [sequencer](http://aqilahmisuary.github.io/sequencer/) to demonstrate the technique involved.

Do email me at aqilah@sonoport.com if you have any feedback on how we can improve these tutorials. That's it for now. Cheers!

<script src="js/webaudioclock.js"></script>
