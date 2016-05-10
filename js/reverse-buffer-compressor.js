var context = new AudioContext();;
var url = "https://dl.dropboxusercontent.com/u/30075450/Always%20In%20My%20Head%20-%20Coldplay.mp3";
var source = null;
var myAudioBuffer = null;
var analyser = context.createAnalyser();
var compressor = context.createDynamicsCompressor();
var canvas = document.querySelector('.visualizer');
var myCanvas = canvas.getContext("2d");
var WIDTH = 1000;
var HEIGHT = 300;

analyser.fftSize = 2048;
var bufferLength = analyser.frequencyBinCount;
var dataArray = new Uint8Array(bufferLength);

analyser.getByteTimeDomainData(dataArray); 
myCanvas.clearRect(0, 0, WIDTH, HEIGHT);

canvas.width = 1000;

function draw() {
  drawVisual = requestAnimationFrame(draw);
  analyser.getByteTimeDomainData(dataArray);
  
  myCanvas.fillStyle = '255,255,255, 0.1';
  myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
  myCanvas.lineWidth = 2;
  myCanvas.strokeStyle = 'rgb(255,255,255)';
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



function loadSound(url) {
    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        context.decodeAudioData(request.response, function (buffer) {
            myAudioBuffer = buffer;
            playSound(myAudioBuffer);
        });
    }
    request.send();
 
}

function playSound(myAudioBuffer) {
  
    source = context.createBufferSource();
    source.buffer = myAudioBuffer;
		Array.prototype.reverse.call(myAudioBuffer.getChannelData(0));
    Array.prototype.reverse.call(myAudioBuffer.getChannelData(1));
    source.connect(analyser);
    analyser.connect(context.destination);
    source.start();
    
    draw();
      
}

function showValue(threshold) { 
  
  document.getElementById("range").innerHTML=threshold;
  console.log("threshold: " + threshold);
  compressor.threshold.value = threshold;
  
}

function showValue2(knee) {
  
	 document.getElementById("range2").innerHTML=knee;
   console.log("knee: " + knee);
   compressor.knee.value = knee;
  
}

function showValue3(ratio) {
  
  document.getElementById("range3").innerHTML=ratio;
  console.log("ratio: " + ratio);
  compressor.ratio.value = ratio;
  
}

function showValue4(reduction) {
  
  document.getElementById("range4").innerHTML=reduction;
  console.log("reduction: " + reduction);
  compressor.ratio.value = reduction;
  compressor.reduction.value = reduction;
  
}

  compressor.attack.value = 0;
  compressor.release.value = 0.25;


function addCompressor() {
  
  source.connect(compressor);
  compressor.connect(analyser);
  
}

function removeCompressor() {
  
  compressor.disconnect(analyser);
  source.connect(analyser);

}

function stopSound() {
    //if (source) {
      source.stop();
      source.disconnect(analyser);
   // }
}

analyser.connect(context.destination);
