---
layout:     post
title:      "Applying Web Audio API with the HTML5 Canvas Element"
subtitle:   "Part I: First we draw the ball. Then we move the ball."
date:       2015-09-23 12:05:00
author:     "Aqilah Misuary"
header-img: "/img/colourballz.jpg"
---
Hey everyone welcome back to our web audio series! This week we're going to have some fun playing around with Web Audio API and the HTML5 Canvas element! Remember a few weeks back we did a tutorial on [visualising waveforms with Web Audio API](http://sonoport.github.io/visualising-waveforms-with-web-audio.html)? We've barely scratched the surface of how amazingly powerful the HTML5 Canvas can be. This [article](http://artatm.com/2012/01/23-truly-amazing-and-unbelievable-html5-canvas-and-javascript-experiments/) has several great examples. For this week, we're going to learn on how we can integrate Web Audio API with simple web animations created using the HTML5 Canvas element.

An example of that would be this: Hover your mouse below to trigger the animation.

<div class="canvas"><canvas id="canvas" width="800" height="523"></canvas></div>

<p><h1>Part I: Drawing & Animating the ball</h1></p>

Are you ready? Let's recap on what is the HTML5 Canvas!

</h4>"Added in HTML5, the HTML canvas element can be used to draw graphics via scripting in JavaScript. For example, it can be used to draw graphs, make photo compositions, create animations, or even do real-time video processing or rendering."</h4>
[Source](http://diveintohtml5.info/canvas.html)

So the `<canvas>` element is basically a rectangle on our page that lets us draw stuff on it using Javascript. In HTML, the `<canvas>` tag is mostly used to define the width & height. Drawings on the canvas itself are created using Javascript where we use drawing functions & methods which is also known as the [Canvas 2D API](http://www.w3.org/TR/2dcontext/).

Let's start by learning how to draw a ball.

First we have to create a `<canvas>` context. On our HTML it would look like this.

```js
<canvas id="canvas" width="300" height="225"></canvas>
```

We included this `canvas` with an ID attribute so that we can find it in the [DOM](http://www.w3.org/DOM/). Then we add this line of code which initialises its 2d context for drawing. The drawing context is where all the drawing methods and properties can be defined.

```js
var ctx = canvas.getContext('2d');
```

We start by first creating a ball object, which will contain all the methods and variables specific to the ball.

```js
var ball = {
  x: 500,
  y: 200,
  vx: 16,
  vy: 4,
  radius: 200,
  color: 'gold',
```
Then we start drawing the ball.

```js
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};
```
**<span>HTML canvas beginPath() Method</span>**

It begins a path, or resets the current path.

**<span>HTML canvas arc() Method</span>**

It creates an arc/curve (used to create circles, or parts of circles).

<table border="1" style="width:100%">
   <tr>
    <td><b>Parameters</b></td>
    <td><b>Description</b></td>
  </tr>
  <tr>
    <td>x</td>
    <td>The x-coordinate of the center of the circle</td>
  </tr>
  <tr>
    <td>y</td>
    <td>The y-coordinate of the center of the circle</td>
  </tr>
  <tr>
    <td>r</td>
    <td>The radius of the circle</td>
  </tr>
  <tr>
    <td>sAngle</td>
    <td>The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)</td>
  </tr>
  <tr>
    <td>eAngle</td>
    <td>The ending angle, in radians</td>
  </tr>
  <tr>
    <td>counterclockwise</td>
    <td>Optional. Specifies whether the drawing should be counterclockwise or clockwise. False is default, and indicates clockwise, while true indicates counter-clockwise.</td>
  </tr>
</table>

**<span>HTML canvas closePath() Method</span>**

The `closePath()` method creates a path from the current point back to the starting point.

**<span>HTML canvas fillStyle() Method</span>**

The fillStyle property sets or returns the color, gradient, or pattern used to fill the drawing.

**<span>HTML canvas fill() Method</span>**

The `fill()` method fills the current drawing path.

Another method that would be useful would also be `fillRect()`,

**<span>HTML canvas fillRect() Method</span>**

The `fillRect()` method draws a filled rectangle. The default color of the fill is black.

Once we have drawn the ball, it's time to create the `animate()` function!

```js
function animate() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {
  ball.vy = -ball.vy;
  play();
} else {
  stop();
}
if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {
  ball.vx = -ball.vx;
  play();
}
  raf = window.requestAnimationFrame(animate);
};
```
Don't worry if you can't understand what's going on in the code, I will explain to you what happens line by line.

This line of code clears the trail that the ball leaves when ever it moves around.

```js
ctx.clearRect(0,0, canvas.width, canvas.height);
```

Without it, our animation would look like this.

<div class="canvas"><canvas id="canvas3" width="800" height="523"></canvas></div>

The next line we shall call our `draw()` function. This is to ensure that our ball gets re-drawn every time our `animate()` function is called.

```js
ball.draw();
```

Now we're going to add velocity to the ball. Every time our `animate()` function is called, the coordinates of the ball changes.

```js
ball.x += ball.vx;
ball.y += ball.vy;
```

Another way to understand how this works is to see this awesome [example](http://cssdeck.com/labs/lets-make-a-bouncing-ball-in-html5-canvas) by Kushagra Agarwal. He has a detailed explaination on how to add velocity and acceleration to the ball.

Moving on from that, don't forget to add boundaries or else our ball will run out of the canvas like this.

<div class="canvas"><canvas id="canvas4" width="800" height="523"></canvas></div>

So if you don't want to say goodbye to your ball, we must add these codes.

```js
if (ball.y + ball.vy > canvas.height || ball.y + ball.vy < 0) {

  // If the ball goes beyond the canvas height,
  // move the ball the opposite direction.
  ball.vy = -ball.vy;

}
if (ball.x + ball.vx > canvas.width || ball.x + ball.vx < 0) {

  // If the ball goes beyond the canvas width,
  // move the ball the opposite direction.
  ball.vx = -ball.vx;
}
```

These codes ensure that if the ball goes beyond the canvas boundaries, its direction will be inverted.

For reference, the canvas grid or coordinate space looks like this.

<img src="/img/canvascoordinates.png">

If you need help understanding what some of those operators mean click [here](http://www.tutorialspoint.com/computer_programming/computer_programming_operators.htm).

For the last line of code in our `animate()` function, we call the `window.requestAnimationFrame()` method.

```js
var raf = window.requestAnimationFrame(animate);
```

This [requestAnimationFrame method](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) tells the browser that we want to perform an animation and requests the browser to call the `animate()` function to update the animation before the repaint. We then store this inside the variable `raf`.

Why do we need to store it inside a variable?

This is because in order to stop the animation, we have to call [cancelAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/cancelAnimationFrame).

```js
window.cancelAnimationFrame(raf);
```

By now you might notice that the animation only occurs when you hover your mouse over the canvas element. This is due to the `EventTarget.addEventListener()` method which attachs an event handler to a specified element.

```js
canvas.addEventListener("mouseover",function(){
  if (!running) {
    window.requestAnimationFrame(animate);
    running = true;
  }
});

canvas.addEventListener("mouseout",function(){
  window.cancelAnimationFrame(raf);
  running = false;
});
```

Now it's time for you try playing around with the code! See if you are able to make the ball move faster or slower!

<p data-height="436" data-theme-id="0" data-slug-hash="vNKaGp" data-default-tab="result" data-user="aqilahmisuary" class='codepen'>See the Pen <a href='http://codepen.io/aqilahmisuary/pen/vNKaGp/'>Bouncing Ball (No Sound)</a> by Aqilah Misuary (<a href='http://codepen.io/aqilahmisuary'>@aqilahmisuary</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

[Click here](http://sonoport.github.io/web-audio-and-canva-partII.html) for Part II!

Thank you for following Sonoport's webaudio API tutorials! For any feedback/questions please email me at *aqilah@sonoport.com*.

<script src="js/canva.js"></script>
<script src="js/canvasexamples.js"></script>
<link rel="stylesheet" href="css/canva.css">


















