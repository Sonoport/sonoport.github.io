
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var raf;
var running = false;

var ball = {
  x: 500,
  y: 200,
  vx: 16,
  vy: 4,
  radius: 200,
  color: 'gold',
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
};


//function clear() {
//  ctx.fillStyle = 'rgba(255,255,255,0.3)';
//  ctx.fillRect(0,0,canvas.width,canvas.height);
//}

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

//canvas.addEventListener('mousemove', function(e){
  //if (!running) {
    //clear();
    //ball.x = e.clientX;
    //ball.y = e.clientY;
    //ball.draw();
  //}
//};//);

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

//WEB AUDIO PART

var context = new AudioContext();

var oscillator = context.createOscillator();
oscillator.type = 'sine';
oscillator.start(0);

var gain = context.createGain();
var mixGain = context.createGain();
gain.gain.value = 0;



function getSample(url, cb) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'arraybuffer'
  request.onload = function() {
    context.decodeAudioData(request.response, cb)
  }
  request.send()
}

getSample('https://dl.dropboxusercontent.com/u/30075450/Greek%207%20Echo%20Hall.wav', function(impulse){
    
var convolver = context.createConvolver()
var buffer = context.createBufferSource()
convolver.buffer = impulse

// Connections 
oscillator.connect(gain);
gain.connect(convolver);
convolver.connect(mixGain);
gain.connect(mixGain);
mixGain.connect(context.destination);

});


function play() {
  oscillator.frequency.value = Math.random() * (1000 - 100) + 100;
  gain.gain.value = 0.7;
}

function stop() {
  gain.gain.value = 0;
}


//POPPING BALLS

// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

var canvas2 = document.getElementById('canvas2');
var context2 = canvas2.getContext('2d');


 function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;  
}

function clear2() {
 context2.fillStyle = 'black';
 context2.fillRect(0,0,canvas2.width,canvas2.height);
}

function animate2() {
    id = requestAnimFrame(animate2);
    draw2();
    pop();
}

function stopAnimate(){
  //clear2();
  cancelAnimationFrame(id);
}

function draw2() {

    context2.clearRect(0,0, canvas2.width, canvas2.height);

    var x = Math.random() * canvas2.width;
    var y = Math.random() * canvas2.height;
  
    context2.fillStyle = getRandomColor();
    context2.beginPath();
    context2.arc( x, y, 50, 0, Math.PI * 2, true );
    context2.closePath();
    context2.fill();

    

}

canvas2.addEventListener("mouseover",function(){
    animate2();
});

canvas2.addEventListener("mouseout",function(){
    stopAnimate();
});

//WEB AUDIO FOR POPPING
var frequencyOffset = 0

var oscillator3 = context.createOscillator(); // Create sound source  
var oscillator2 = context.createOscillator();
oscillator3.type = 'triangle';
oscillator2.type = 'sine';


var gainNode = context.createGain();
var gainNodeMix = context.createGain();


getSample2('https://dl.dropboxusercontent.com/u/30075450/Greek%207%20Echo%20Hall.wav', function(impulse2){
    
var convolver2 = context.createConvolver()
var buffer2 = context.createBufferSource()
convolver2.buffer = impulse2

/* Connections */
oscillator3.connect(gainNode);
oscillator2.connect(gainNode);

gainNode.connect(gainNodeMix);
gainNode.connect(convolver2);
convolver2.connect(gainNodeMix);

gainNodeMix.connect(context.destination);

});


function getSample2(url, cb) {
  var request = new XMLHttpRequest()
  request.open('GET', url)
  request.responseType = 'arraybuffer'
  request.onload = function() {
    context.decodeAudioData(request.response, cb)
  }
  request.send()
};

gainNode.gain.value = 0;

oscillator3.start(0);
oscillator2.start(0);

function pop() {
  //gainNode.gain.linearRampToValueAtTime(0.8, context.currentTime + 1);
  gainNode.gain.value = 0.8;
  // The sound should last for 100ms for optimal popping
  setTimeout(function() {
    gainNode.gain.value = 0;
  }, 100);
  oscillator3.frequency.value = Math.random() * (800 - 50) + 50;
  oscillator2.frequency.value = 90;
}

















