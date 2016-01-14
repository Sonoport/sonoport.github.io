window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var mixGain = audioContext.createGain();
var filterGain = audioContext.createGain();

var kickButton = document.querySelector('#kickButton');
var snareButton = document.querySelector('#snareButton');
var hihatButton = document.querySelector('#hihatButton');
var mixButton = document.querySelector('#mixButton');

//SOUNDS

function kick() {

    var osc = audioContext.createOscillator();
    var osc2 = audioContext.createOscillator();
    var gainOsc = audioContext.createGain();
    var gainOsc2 = audioContext.createGain();

    osc.type = "triangle";
    //osc.frequency.value = 40;
    //gainOsc.gain.value = 0;

    osc2.type = "sine";
    //osc2.frequency.value = 80;
    //gainOsc2.gain.value = 0;

    gainOsc.gain.setValueAtTime(1, audioContext.currentTime);
    //gainOsc.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.001);
    gainOsc.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    gainOsc.connect(audioContext.destination);

    gainOsc2.gain.setValueAtTime(1, audioContext.currentTime);
    //gainOsc2.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.001);
    gainOsc2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    gainOsc2.connect(audioContext.destination);

    osc.frequency.setValueAtTime(120, audioContext.currentTime);
    //osc.frequency.linearRampToValueAtTime(0, audioContext.currentTime + 0.001);
    osc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    osc2.frequency.setValueAtTime(50, audioContext.currentTime);
    //osc.frequency.linearRampToValueAtTime(0, audioContext.currentTime + 0.001);
    osc2.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);

    osc.connect(gainOsc);
    osc2.connect(gainOsc2);
    gainOsc2.connect(mixGain);
    gainOsc.connect(mixGain);

    mixGain.gain.value = 1;

    osc.start(audioContext.currentTime);
    osc2.start(audioContext.currentTime);

    osc.stop(audioContext.currentTime + 0.5);
    osc2.stop(audioContext.currentTime + 0.5);

};

function snare() {

    var osc3 = audioContext.createOscillator();
    var gainOsc3 = audioContext.createGain();

    filterGain.gain.setValueAtTime(1, audioContext.currentTime);
    filterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    osc3.type = "triangle";
    osc3.frequency.value = 100;
    gainOsc3.gain.value = 0;

    gainOsc3.gain.setValueAtTime(0, audioContext.currentTime);
    //gainOsc3.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.001);
    gainOsc3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    osc3.connect(gainOsc3);
    gainOsc3.connect(mixGain);

    mixGain.gain.value = 1;

    osc3.start(audioContext.currentTime);
    osc3.stop(audioContext.currentTime + 0.2);

    var node = audioContext.createBufferSource(),
        buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate),
        data = buffer.getChannelData(0);

    var filter = audioContext.createBiquadFilter();
    filter.type = "highpass";
    //filter.frequency.value = 1000;
    filter.frequency.setValueAtTime(100, audioContext.currentTime);
    filter.frequency.linearRampToValueAtTime(1000, audioContext.currentTime + 0.2);


    for (var i = 0; i < 4096; i++) {
        data[i] = Math.random();
    }
    node.buffer = buffer;
    node.loop = true;
    node.connect(filter);
    filter.connect(filterGain);
    filterGain.connect(mixGain);
    node.start(audioContext.currentTime);
    node.stop(audioContext.currentTime + 0.2);

};


function hihat() {

    var gainOsc4 = audioContext.createGain();
    var fundamental = 40;
    var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

    var bandpass = audioContext.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;

    var highpass = audioContext.createBiquadFilter();
    highpass.type = "highpass";
    highpass.frequency.value = 7000;


    ratios.forEach(function(ratio) {

        var osc4 = audioContext.createOscillator();
        osc4.type = "square";
        osc4.frequency.value = fundamental * ratio;
        osc4.connect(bandpass);

        osc4.start(audioContext.currentTime);
        osc4.stop(audioContext.currentTime + 0.05);
        
    });

    //gainOsc4.gain.value = 0;

    gainOsc4.gain.setValueAtTime(1, audioContext.currentTime);
    gainOsc4.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    //osc4.connect(bandpass); 
    bandpass.connect(highpass);
    highpass.connect(gainOsc4);
    gainOsc4.connect(mixGain);
    
    mixGain.gain.value = 1;

    //osc4.start(audioContext.currentTime);
    //osc4.stop(audioContext.currentTime + 0.05);

};

//BUTTONS

kickButton.addEventListener('click', function() {

    interval(function() {
        kick(); 
    }, 300, 10);

});

snareButton.addEventListener('click', function() {

    interval(function() {
        snare(); 
    }, 300, 10);

});

hihatButton.addEventListener('click', function() {

    interval(function() {
        hihat(); 
    }, 300, 10);

});

mixButton.addEventListener('click', function() {

    interval(function() {
        kick(); 
    }, 600, 10);
    interval(function() {
        snare(); 
    }, 1200, 5);
        interval(function() {
        //hitom(); 
        //kick();
    }, 300, 20);
                interval(function() {
        //lowtom(); 
    }, 100, 60);
         interval(function() {
        hihat(); 

    }, 200, 30);

});


//INTERVALS

function interval(func, wait, times) {
    var interv = function(w, t) {
        return function() {
            if (typeof t === "undefined" || t-- > 0) {
                setTimeout(interv, w);
                try {
                    func.call(null);
                } catch (e) {
                    t = 0;
                    throw e.toString();
                }
            }
        };
    }(wait, times);

    setTimeout(interv, wait);
};

mixGain.connect(audioContext.destination);
mixGain.gain.value = 0;
filterGain.gain.value = 0;

//EXAMPLE SOUNDS

    var kickMixGain = audioContext.createGain();

    var kickOsc = audioContext.createOscillator();
    var kickOsc2 = audioContext.createOscillator();
    var kickGainOsc = audioContext.createGain();
    var kickGainOsc2 = audioContext.createGain();

    kickOsc.type = "triangle";
    kickOsc.frequency.value = 40;
    kickGainOsc.gain.value = 1;

    kickOsc2.type = "sine";
    kickOsc2.frequency.value = 80;
    kickGainOsc2.gain.value = 1;

    kickOsc.connect(kickGainOsc);
    kickOsc2.connect(kickGainOsc2);
    kickGainOsc2.connect(kickMixGain);
    kickGainOsc.connect(kickMixGain);

    kickMixGain.gain.value = 0;

    kickOsc.start(audioContext.currentTime);
    kickOsc2.start(audioContext.currentTime);


//VISUALISING THE KICK WAVEFORM

    var canvas = document.getElementById('myCanvas');

    var analyser = audioContext.createAnalyser();
    var WIDTH = 600;
    var HEIGHT = 200;

    kickMixGain.connect(analyser);

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
  
  myCanvas.fillStyle = 'white';
  myCanvas.fillRect(0, 0, WIDTH, HEIGHT);
  myCanvas.lineWidth = 2;
  myCanvas.strokeStyle = 'black';
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
  
  myCanvas.lineTo(WIDTH, HEIGHT/2);
      myCanvas.stroke();
};

canvas.addEventListener("mouseover", function() {

    kickMixGain.gain.value = 0.8;
    kickMixGain.connect(audioContext.destination);
    draw();

    });

canvas.addEventListener("mouseout", function() {

    kickMixGain.gain.value = 0;
 

    });


//GENERATING NOISE

var noiseButton = document.getElementById('noiseButton');

noiseButton.addEventListener("click", function() {

noise();

});


function noise() {

    var node = audioContext.createBufferSource(),
        buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate),
        data = buffer.getChannelData(0);

    for (var i = 0; i < 4096; i++) {

        data[i] = Math.random();
    }

    node.buffer = buffer;
    node.loop = true;
    node.start(audioContext.currentTime);
    node.stop(audioContext.currentTime + 0.2);
    node.connect(audioContext.destination);
};

//SOUND OF SIX SQUARE WAVES

var waveGain = audioContext.createGain();
waveGain.gain.value = 0.1;

var fundamental = 40;
var ratios = [2, 3, 4.16, 5.43, 6.79, 8.21];

function wave() {

ratios.forEach(function(ratio) {

    var osc4 = audioContext.createOscillator();

    osc4.type = "square";
    osc4.frequency.value = fundamental * ratio;
  
    osc4.start(audioContext.currentTime);
    osc4.stop(audioContext.currentTime + 0.5);
  
    osc4.connect(waveGain);
    waveGain.connect(audioContext.destination);

    });
  
};

var wavez = document.getElementById('sixWaves');

wavez.addEventListener("click", function() {

    wave();
   
    });

function wave2() {

ratios.forEach(function(ratio) {

    var osc4 = audioContext.createOscillator();

    var bandpass = audioContext.createBiquadFilter();

    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;


    osc4.type = "square";
    osc4.frequency.value = fundamental * ratio;

    //waveGain.gain.setValueAtTime(1, audioContext.currentTime);
    //waveGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
  
    osc4.start(audioContext.currentTime);
    osc4.stop(audioContext.currentTime + 0.5);
  
    osc4.connect(bandpass);
    bandpass.connect(waveGain);
    waveGain.connect(audioContext.destination);

    });
  
};

var wavez = document.getElementById('bandWaves');

wavez.addEventListener("click", function() {

wave2();
   
    });

//PERCUSSIVE SHOT FOR WAVE EXAMPLE

function shortWave() {

ratios.forEach(function(ratio) {

    var osc4 = audioContext.createOscillator();

    var bandpass = audioContext.createBiquadFilter();

    bandpass.type = "bandpass";
    bandpass.frequency.value = 10000;


    osc4.type = "square";
    osc4.frequency.value = fundamental * ratio;

    waveGain.gain.setValueAtTime(1, audioContext.currentTime);
    waveGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
  
    osc4.start(audioContext.currentTime);
    osc4.stop(audioContext.currentTime + 0.05);
  
    osc4.connect(bandpass);
    bandpass.connect(waveGain);
    waveGain.connect(audioContext.destination);

    });
  
};

var wave3 = document.getElementById('shortWaves');

wave3.addEventListener("click", function() {

shortWave();
   
    });

