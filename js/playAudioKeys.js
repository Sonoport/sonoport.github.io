 window.context  = new AudioContext();

 window.keyboard = new AudioKeys({
  polyphony: 1,
  rows: 1,
  priority: 'last'
});

      // var oneRowLayout = true;
      // var image1 = document.querySelector('#image1');
      // var image2 = document.querySelector('#image2');

      // var polyphony = document.querySelector('#polyphony');
      // var priority = document.querySelector('#priority');

      // document.querySelector('#row-select').addEventListener('change', function(e) {
      //   oneRowLayout = !oneRowLayout;
      //   image1.style.display = oneRowLayout ? 'block' : 'none';
      //   image2.style.display = oneRowLayout ? 'none' : 'block';
      //   keyboard.set('rows', oneRowLayout ? 1 : 2);
      // });

      // polyphony.addEventListener('change', function(e) {
      //   keyboard.set('polyphony', +e.target.value);
      // });

      // priority.addEventListener('change', function(e) {
      //   keyboard.set('priority', e.target.value);
      // });

 var oscillators = {};

 var button = document.getElementById('AudioKeysButton');
 var mute = true;
 
 button.addEventListener('click', function() {
  mute = !mute;
  if (!mute) {
    button.innerHTML = "Press to stop";
  }
  else {
    button.innerHTML = "Click for AudioKeys";
  }
});



 keyboard.down( function(note) {
  if (mute) return;  

  var osc = context.createOscillator();
  var gain = context.createGain();
  var filter = context.createBiquadFilter();

  osc.frequency.value = note.frequency;
  osc.type = 'square';

  filter.type = 'lowpass';
  filter.frequency.value = 250;

  gain.gain.value = 0;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  filter.frequency.exponentialRampToValueAtTime(550, context.currentTime + 0.8);
  filter.frequency.exponentialRampToValueAtTime(200, context.currentTime + 0.2);

  gain.gain.linearRampToValueAtTime(0.5, context.currentTime);
  gain.gain.linearRampToValueAtTime(note.velocity / 127, context.currentTime + 0.1);

  osc.start(0);
  oscillators[note.note] = {
    oscillator: osc,
    gain: gain
  };
});


 keyboard.up( function(note) {
  if (mute) return;
  if(oscillators[note.note]) {
    oscillators[note.note].gain.gain.linearRampToValueAtTime(oscillators[note.note].gain.gain.value, context.currentTime);
    oscillators[note.note].gain.gain.linearRampToValueAtTime(0, context.currentTime + 0.7);
    oscillators[note.note].oscillator.stop(context.currentTime + 0.8);
    delete oscillators[note.note];
  }
});