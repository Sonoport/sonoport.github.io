
//1ST EXAMPLE: Ball leaves trails

var canvas3 = document.getElementById('canvas3');
var ctx3 = canvas3.getContext('2d');
var raf3;
var running3 = false;

var ball3 = {
  x3: 500,
  y3: 200,
  vx3: 16,
  vy3: 4,
  radius3: 200,
  color: 'gold',
  draw3: function() {
    ctx3.beginPath();
    ctx3.arc(this.x3, this.y3, this.radius3, 0, Math.PI*2, true);
    ctx3.closePath();
    ctx3.fillStyle = this.color;
    ctx3.fill();
  }
};

function draw3() {
  //ctx3.clearRect(0,0, canvas3.width, canvas3.height);
  ball3.draw3();
  ball3.x3 += ball3.vx3;
  ball3.y3 += ball3.vy3;

  if (ball3.y3 + ball3.vy3 > canvas3.height || ball3.y3 + ball3.vy3 < 0) {
  ball3.vy3 = -ball3.vy3;
  
} 
if (ball3.x3 + ball3.vx3 > canvas3.width || ball3.x3 + ball3.vx3 < 0) {
  ball3.vx3 = -ball3.vx3;
  
}
  raf3 = window.requestAnimationFrame(draw3);
};

canvas3.addEventListener('mousemove', function(e){
  if (!running3) {
    //clear();
    ball3.x3 = e.clientX;
    ball3.y3 = e.clientY;
    ball3.draw3();
  }
});


canvas3.addEventListener("mouseover",function(e){
  if (!running3) {
    raf3 = window.requestAnimationFrame(draw3);
    running3 = true;
    
  }
 
});

canvas3.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf3);
  running3 = false;
  ctx3.clearRect(0,0, canvas3.width, canvas3.height);
  
});

//2ND EXAMPLE: Ball runs out of the canvas

var canvas4 = document.getElementById('canvas4');
var ctx4 = canvas4.getContext('2d');
var raf4;
var running4 = false;

var ball4 = {
  x4: 300,
  y4: 200,
  vx4: 16,
  vy4: 4,
  radius4: 200,
  color: 'gold',
  draw4: function() {
    ctx4.beginPath();
    ctx4.arc(this.x4, this.y4, this.radius4, 0, Math.PI*2, true);
    ctx4.closePath();
    ctx4.fillStyle = this.color;
    ctx4.fill();
  }
};

function draw4() {
  ctx4.clearRect(0,0, canvas4.width, canvas4.height);

  ball4.draw4();
  ball4.x4 += ball4.vx4;
  ball4.y4 += ball4.vy4;

  if (ball4.y4 + ball4.vy4 > 600 + canvas4.height) {

  ball4.x4 =300;
  ball4.y4 =200;
  
} 

if (ball4.x4 + ball4.vx4 > 600 + canvas4.width) {

 ball4.x4 =300;
 ball4.y4 =200;
  
}
  raf4 = window.requestAnimationFrame(draw4);
};

//canvas4.addEventListener('mousemove', function(e){
 // if (!running4) {
    //clear();
  //  ball4.x4 = e.clientX;
  //  ball4.y4 = e.clientY;
  //  ball4.draw4();
 // }
//});


canvas4.addEventListener("mouseover",function(e){
  if (!running4) {
    raf4 = window.requestAnimationFrame(draw4);
    running4 = true;
    ball4.draw4();
  }
 
});

canvas4.addEventListener("mouseout",function(e){
  window.cancelAnimationFrame(raf4);
  running4 = false;
  ctx4.clearRect(0,0, canvas4.width, canvas4.height);
  document.getElementById("canvas4").reset();
  
});

ball4.draw4();
