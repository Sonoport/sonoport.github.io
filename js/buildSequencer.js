var context = new AudioContext();

var osc1 = context.createOscillator();
osc1.type = 'square';

var osc2 = context.createOscillator();
osc2.type = 'square';

var envelope = context.createGain();

var oscMix1 = context.createGain();
var oscMix2 = context.createGain();

var lowpassFilter = context.createBiquadFilter();
lowpassFilter.type = 'lowpass';
lowpassFilter.frequency.value = 150;

function makeConnection() {
	osc1.connect(oscMix1);
	osc2.connect(oscMix2);

	oscMix1.connect(context.destination);
	oscMix2.connect(context.destination);
}

function gainStage(mix1val, mix2val) {
	this.oscMix1.value = mix1val;
	this.oscMix2.value = mix2val;
}

var Sequencer = new Sequencer();

Sequencer.prototype = {

	_init: function(start, dur) {
		osc1.start(context.currentTime + start);
		osc2.start(context.currentTime + start);
		
		osc1.stop(context.currentTime + start + dur);
		osc2.stop(context.currentTime + start + dur);
	}
	for 
}

makeConnection();
gainStage(0.2, 0.3);

sequence(0.1, 0.4);





