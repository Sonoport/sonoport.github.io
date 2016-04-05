(function() {
    function createAudioContext(desiredSampleRate) {
        var AudioCtor = window.AudioContext || window.webkitAudioContext;
        desiredSampleRate = typeof desiredSampleRate === 'number' ? desiredSampleRate : 44100;
        var context = new AudioCtor();
        // Check if hack is necessary. Only occurs in iOS6+ devices
        // and only when you first boot the iPhone, or play a audio/video
        // with a different sample rate
        if (/(iPhone|iPad)/i.test(navigator.userAgent) && context.sampleRate !== desiredSampleRate) {
            var buffer = context.createBuffer(1, 1, desiredSampleRate);
            var dummy = context.createBufferSource();
            dummy.buffer = buffer;
            dummy.connect(context.destination);
            dummy.start(0);
            dummy.disconnect();
            context.close();
            // dispose old context
            context = new AudioCtor();
        }
        return context;
    }
    var audioContext = new createAudioContext();
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

        osc.type = 'triangle';
        osc2.type = 'sine';

        gainOsc.gain.setValueAtTime(1, audioContext.currentTime);
        gainOsc.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        gainOsc.connect(audioContext.destination);
        gainOsc2.gain.setValueAtTime(1, audioContext.currentTime);
        gainOsc2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        gainOsc2.connect(audioContext.destination);
        osc.frequency.setValueAtTime(120, audioContext.currentTime);
        osc.frequency.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        osc2.frequency.setValueAtTime(50, audioContext.currentTime);

        //Connections
        osc.connect(gainOsc);
        osc2.connect(gainOsc2);
        gainOsc2.connect(mixGain);
        gainOsc.connect(mixGain);

        mixGain.gain.value = 1;

        osc.start(audioContext.currentTime);
        osc2.start(audioContext.currentTime);
        osc.stop(audioContext.currentTime + 0.5);
        osc2.stop(audioContext.currentTime + 0.5);
    }

    function snare() {

        var osc3 = audioContext.createOscillator();
        var gainOsc3 = audioContext.createGain();

        filterGain.gain.setValueAtTime(1, audioContext.currentTime);
        filterGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        osc3.type = 'triangle';
        osc3.frequency.value = 100;

        gainOsc3.gain.value = 0;
        gainOsc3.gain.setValueAtTime(0, audioContext.currentTime);
        gainOsc3.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        //Connections
        osc3.connect(gainOsc3);
        gainOsc3.connect(mixGain);

        mixGain.gain.value = 1;

        osc3.start(audioContext.currentTime);
        osc3.stop(audioContext.currentTime + 0.2);

        var node = audioContext.createBufferSource(),
            buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate),
            data = buffer.getChannelData(0);

        var filter = audioContext.createBiquadFilter();

        filter.type = 'highpass';
        filter.frequency.setValueAtTime(100, audioContext.currentTime);
        filter.frequency.linearRampToValueAtTime(1000, audioContext.currentTime + 0.2);

        for (var i = 0; i < 4096; i++) {
            data[i] = Math.random();
        }

        node.buffer = buffer;
        node.loop = true;

        //Connections
        node.connect(filter);
        filter.connect(filterGain);
        filterGain.connect(mixGain);

        node.start(audioContext.currentTime);
        node.stop(audioContext.currentTime + 0.2);

    }

    function hihat() {

        var gainOsc4 = audioContext.createGain();
        var fundamental = 40;
        var ratios = [
            2,
            3,
            4.16,
            5.43,
            6.79,
            8.21
        ];
        var bandpass = audioContext.createBiquadFilter();
        bandpass.type = 'bandpass';
        bandpass.frequency.value = 10000;
        var highpass = audioContext.createBiquadFilter();
        highpass.type = 'highpass';
        highpass.frequency.value = 7000;
        ratios.forEach(function(ratio) {
            var osc4 = audioContext.createOscillator();
            osc4.type = 'square';
            osc4.frequency.value = fundamental * ratio;
            osc4.connect(bandpass);
            osc4.start(audioContext.currentTime);
            osc4.stop(audioContext.currentTime + 0.05);
        });

        gainOsc4.gain.setValueAtTime(1, audioContext.currentTime);
        gainOsc4.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

        bandpass.connect(highpass);
        highpass.connect(gainOsc4);
        gainOsc4.connect(mixGain);

        mixGain.gain.value = 1;
    }

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
        draw2();
    });

    //INTERVALS
    function interval(func, wait, times) {
        var interv = function(w, t) {
            return function() {
                if (typeof t === 'undefined' || t-- > 0) {
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
    }
    mixGain.connect(audioContext.destination);
    mixGain.gain.value = 0;
    filterGain.gain.value = 0;

    //EXAMPLE SOUNDS
    var kickMixGain = audioContext.createGain();
    var kickOsc = audioContext.createOscillator();
    var kickOsc2 = audioContext.createOscillator();
    var kickGainOsc = audioContext.createGain();
    var kickGainOsc2 = audioContext.createGain();

    kickOsc.type = 'triangle';
    kickOsc.frequency.value = 40;
    kickGainOsc.gain.value = 1;
    kickOsc2.type = 'sine';
    kickOsc2.frequency.value = 80;
    kickGainOsc2.gain.value = 1;

    //Connections
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
    var myCanvas = canvas.getContext('2d');
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

        var sliceWidth = WIDTH * 1 / bufferLength;
        var x = 0;

        for (var i = 0; i < bufferLength; i++) {
            var v = dataArray[i] / 128;
            var y = v * HEIGHT / 2;
            if (i === 0) {
                myCanvas.moveTo(x, y);
            } else {
                myCanvas.lineTo(x, y);
            }
            x += sliceWidth;
        }
        myCanvas.lineTo(WIDTH, HEIGHT / 2);
        myCanvas.stroke();
    }

    canvas.addEventListener('mouseover', function() {
        kickMixGain.gain.value = 0.8;
        kickMixGain.connect(audioContext.destination);
        draw();
    });

    canvas.addEventListener('mouseout', function() {
        kickMixGain.gain.value = 0;
    });

    //GENERATING NOISE
    var noiseButton = document.getElementById('noiseButton');
    noiseButton.addEventListener('click', function() {
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
    }

    //SOUND OF SIX SQUARE WAVES
    var waveGain = audioContext.createGain();
    waveGain.gain.value = 0.1;
    var fundamental = 40;
    var ratios = [
        2,
        3,
        4.16,
        5.43,
        6.79,
        8.21
    ];

    function wave() {

        ratios.forEach(function(ratio) {
            var osc4 = audioContext.createOscillator();
            osc4.type = 'square';
            osc4.frequency.value = fundamental * ratio;
            osc4.start(audioContext.currentTime);
            osc4.stop(audioContext.currentTime + 0.5);
            osc4.connect(waveGain);
            waveGain.connect(audioContext.destination);
        });
    }
    var wavez = document.getElementById('sixWaves');
    wavez.addEventListener('click', function() {
        wave();
    });

    function wave2() {

        ratios.forEach(function(ratio) {
            var osc4 = audioContext.createOscillator();
            var bandpass = audioContext.createBiquadFilter();
            bandpass.type = 'bandpass';
            bandpass.frequency.value = 10000;
            osc4.type = 'square';
            osc4.frequency.value = fundamental * ratio;
            //waveGain.gain.setValueAtTime(1, audioContext.currentTime);
            //waveGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
            osc4.start(audioContext.currentTime);
            osc4.stop(audioContext.currentTime + 0.5);
            osc4.connect(bandpass);
            bandpass.connect(waveGain);
            waveGain.connect(audioContext.destination);
        });
    }
    var wavez = document.getElementById('bandWaves');
    wavez.addEventListener('click', function() {
        wave2();
    });

    //PERCUSSIVE SHOT FOR WAVE EXAMPLE
    function shortWave() {

        ratios.forEach(function(ratio) {

            var osc4 = audioContext.createOscillator();
            var bandpass = audioContext.createBiquadFilter();

            bandpass.type = 'bandpass';
            bandpass.frequency.value = 10000;
            osc4.type = 'square';
            osc4.frequency.value = fundamental * ratio;
            waveGain.gain.setValueAtTime(1, audioContext.currentTime);
            waveGain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);

            osc4.start(audioContext.currentTime);
            osc4.stop(audioContext.currentTime + 0.05);

            //Connections
            osc4.connect(bandpass);
            bandpass.connect(waveGain);
            waveGain.connect(audioContext.destination);
        });
    }

    var wave3 = document.getElementById('shortWaves');

    wave3.addEventListener('click', function() {
        shortWave();
    });

    //TESTING REQUESTANIMATIONFRAME FOR SCHEDULING
    var newBoxes = document.getElementById('container1');
    var newBoxes2 = document.getElementById('container2');
    var newBoxes3 = document.getElementById('container3');
    var newBoxes4 = document.getElementById('container4');
    var newBoxes5 = document.getElementById('container5');
    var fps = 6;


    //DRAW BOXES
    function createBox(instrument) {

        box = document.createElement('div');
        box.style.width = '50px';
        box.style.height = '50px';
        box.style.background = 'white';
        box.style.border = '3px solid black';
        box.style.position = 'relative';
        box.style.float = 'left';
        box.style.fontWeight = 'bold';
        box.style.fontSize = 'Small';
        box.style.fontFamily = 'freight-text-pro, Times New Roman, serif';


        // if (instrument === hihat) {

        //     hihat();
        //     box.innerHTML = '<div id="hihatDiv">Hi-Hat</div>';
        //     newBoxes.appendChild(box);
        //     newBoxes.style.width = '900px';
        //     newBoxes.style.height = '60px';
        //     newBoxes.style.position = 'relative';
        //     newBoxes.style.border = '10px solid white';
        //     newBoxes.style.display = 'in-line';

        // } else if (instrument === kick) {

        //     kick();
        //     box.innerHTML = '<div class=\'test\'>Kick</div>';
        //     newBoxes2.appendChild(box);
        //     newBoxes2.style.width = '900px';
        //     newBoxes2.style.height = '60px';
        //     newBoxes2.style.position = 'relative';
        //     newBoxes2.style.display = 'in-line';
        //     newBoxes2.style.border = '10px solid white';

        // } else if (instrument === snare) {

        //     snare();
        //     box.innerHTML = '<div class=\'test\'>Snare</div>';
        //     newBoxes3.appendChild(box);
        //     newBoxes3.style.width = '900px';
        //     newBoxes3.style.height = '60px';
        //     newBoxes3.style.position = 'relative';
        //     newBoxes3.style.display = 'in-line';
        //     newBoxes3.style.border = '10px solid white';
        // };

        switch (true) {
            case instrument === hihat:
                hihat();
                box.innerHTML = '<div id="hihatDiv">Hi-Hat</div>';
                newBoxes.appendChild(box);
                newBoxes.style.width = '900px';
                newBoxes.style.height = '60px';
                newBoxes.style.position = 'relative';
                newBoxes.style.border = '10px solid white';
                newBoxes.style.display = 'in-line';
                break;
            case instrument === kick:
                kick();
                box.innerHTML = '<div class=\'test\'>Kick</div>';
                newBoxes2.appendChild(box);
                newBoxes2.style.width = '900px';
                newBoxes2.style.height = '60px';
                newBoxes2.style.position = 'relative';
                newBoxes2.style.display = 'in-line';
                newBoxes2.style.border = '10px solid white';
                break;
            case instrument === snare:
                snare();
                box.innerHTML = '<div class=\'test\'>Snare</div>';
                newBoxes3.appendChild(box);
                newBoxes3.style.width = '900px';
                newBoxes3.style.height = '60px';
                newBoxes3.style.position = 'relative';
                newBoxes3.style.display = 'in-line';
                newBoxes3.style.border = '10px solid white';
                break;
        }

    };

    function draw2() {

        var Timer = setTimeout(function() {

            requestAnimationFrame(draw2);

            var elements = container1.getElementsByTagName('div').length;
            if (elements % 2 == 0 || elements == 0) {
                createBox(hihat);
            }
            if (elements == 0 || elements == 12) {
                createBox(kick);
            }
            if (elements == 6 || elements == 18) {
                createBox(snare);
                createBox(kick);
            }
            while (newBoxes.hasChildNodes() && elements > 20) {
                newBoxes.removeChild(newBoxes.firstChild);
            }
            while (newBoxes2.hasChildNodes() && elements > 20) {
                newBoxes2.removeChild(newBoxes2.firstChild);
            }
            while (newBoxes3.hasChildNodes() && elements > 20) {
                newBoxes3.removeChild(newBoxes3.firstChild);
            }
        }, 1000 / fps);

        var stopIt = document.getElementById('stopButton');

        stopIt.addEventListener('click', function() {
            clearTimeout(Timer);
        });
    }

    // Check if page is loaded in Wordpress
    if (window.location.href === 'http://www.soundesign.info/2016/04/02/synthesising-sounds-with-web-audio-api/') {

        console.log('Loaded in Wordpress');

    } else {

        console.log('Page is not loaded in Wordpress');
    }

}());