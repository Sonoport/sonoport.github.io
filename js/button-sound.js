// Create the Audio Context

var context = new AudioContext();

// Create your oscillator, filter and gain node by declaring them as variables

var button = document.getElementById("myButton");

button.addEventListener('click', function() {
	var osc = context.createOscillator();
	
	var filter = context.createBiquadFilter();
	filter.type = 'lowpass';
	filter.frequency.value = 250;
	
	var oscGain = context.createGain();
	oscGain.value = 0.3;
	
	// Connect the nodes together
	
	function makeConnection() {
	    osc.connect(filter);
	    filter.connect(oscGain);
	}
	
	// Play the sound inside of Chrome
	
	function playSound() {
	    oscGain.connect(context.destination);
	    osc.start(context.currentTime);
	    osc.stop(context.currentTime + 3);
	}

makeConnection();
playSound();
});
