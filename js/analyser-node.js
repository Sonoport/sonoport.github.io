// Create the Audio Context

var context = new AudioContext();
var analyser = context.createAnalyser();
var WIDTH = 300;
var HEIGHT = 300;

function playSound() {
    var osc = context.createOscillator();
    osc.frequency.value = 60;
    osc.type = 'square';
    
    analyserGain = context.createGain();
    analyserGain.gain.value = 0.065;

    osc.start(context.currentTime);
    osc.stop(context.currentTime + 3);

    osc.connect(analyser);   
    analyser.connect(analyserGain); /*Connect oscillator to analyser node*/
    analyserGain.connect(context.destination);
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
  
  myCanvas.fillStyle = 'rgb(68, 127, 192)';
  myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
  myCanvas.lineWidth = 2;
  myCanvas.strokeStyle = 'rgb(255, 255, 255)';
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


























