// Create the Audio Context

var context = new AudioContext();
var analyser = context.createAnalyser();
var WIDTH = 300;
var HEIGHT = 300;

// Create your oscillator, filter and gain node by declaring them as variables

var osc = context.createOscillator();

osc.frequency.value = 500;

// Connect the nodes together

function makeConnection() {
    osc.connect(analyser);
}

// Play the sound inside of Chrome

function playSound() {
    analyser.connect(context.destination);
    osc.start(0);
    osc.stop(3);
}

var canvas = document.querySelector('.visualizer');
var myCanvas = canvas.getContext("2d");

analyser.fftSize = 2048;

var bufferLength = analyser.frequencyBinCount; 
/*an unsigned long value half that of the FFT size. 
This generally equates to the number of data values you will have to play with 
for the visualization*/

var dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray); 

console.log(dataArray);

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

var analyzerButton = document.getElementById("myAnalyzerButton")

analyzerButton.addEventListener('click', function(){
  var osc = context.createOscillator();
  makeConnection();
  playSound();
  draw();
})







