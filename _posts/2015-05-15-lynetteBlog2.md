---
layout: post
title: WebAudio with Oscillators

---
**AudioNodes**: Processing modules for audio signal

- Performs basic audio operations
- Linked via inputs and outputs chain
- Contains effects eg. Filters, Reverb, Delay
- *Audio Sources Nodes*:
	- OscillatorNode
	- AudioBuffer
	- AudioBufferSourceNode
	- MediaElecmentAudioSourceNode
	- MediaStreamAudioSourceNode

- *Audio Effects Nodes*:
	- BiquadFilterNode
	- ConvolverNode
	- DelayNode
	- DynamicsCompressorNode
	- GainNode
	- StereoPannerNode
	- WaveShaperNode
	- PeriodicWave

- *Audio Destinations*:
	- AudioDestinationNode
	- MediaStreamAudioDestinationNode


**Connecting AudioNodes**

- first create AudioContext to build the audio graph (linkage of AudioNodes)
- provide versions for different browsers

```
var audioContext = new AudioContext();
```
or

```
var audioContext = new (window.AudioContext || window.webkitAudioContext)();
```

- connecting nodes together: the node that you want to connect is given as the argument of the connect method
- eg:

```
source = audioContext.createMediaStreamSource(stream);
source.connect(analyser);
analyser.connect(distortion);
distortion.connect(biquadFilter);
```

**OscillatorNode**

- `oscillator = audioContext.createOscillator();`
- represents an audio source generating a periodic waveform
- emits sound at time specified by `start()`


**OscillatorType**

- Sine: a sine wave
- Square: a square wave of duty period 0.5
- Sawtooth: a sawtooth wave
- Triangle: a triangle wave
- Custom: a custom periodic wave


**Output of AudioNodes**

- default output is device speakers

```
var audioContext = new AudioContext();
var oscillator = audioContext.createOscillator();
oscillator.connect(audioContext.destination);
```

**Parameters**

- AudioParam interface: an audio-related parameter, usually a parameter of an AudioNode
- a list of events
- can be set to a specific value or change in value, scheduled to happen at a specific time and following a specific pattern
- two kinds of AudioParam: a-rate and k-rate parameters
- `a-rate AudioParam` takes the current audio parameter value for each sample frame of the audio signal
- `k-rate AudioParam` uses the same initial audio parameter value for the whole block processed (128 sample frames)

**Attribute 1:** `frequency`

- `a-rate` AudioParm
- frequency of periodic waveform in Hz
- default value is 440
- also operates in the `BiquadFilterNode`, in Hz, `k-rate`

**Attribute 2:** `detune`

- `a-rate` AudioParm
- a detuning value (in Cents) which will offset the `frequency` by the given amount
- default value is 0
- ranges from -1200 to 1200

**computedFrequency**

- both `frequency` and `detune` are `a-rate` parameters, used together to determine a `computedFrequency` value

**One-Shot behaviour**

- a sound or short audio clip
- uses the `AudioBuffer` interface
- used in drum machines, sequencers and 3D games etc
- can be played using oscillators (in the form of notes or tunes)
- `AudioBufferSourceNodes`: create a node, attach a buffer, set loop boolean value, connect to a node on the graph that will lead to destination, call noteOn or noteGrainOn, and noteOff

LINKS:

- [WebAudio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)
- [AudioParam](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam)
- [oscillatorNode Interface](http://webaudio.github.io/web-audio-api/#the-oscillatornode-interface)
- [Playing musical notes on the web](http://blog.chrislowis.co.uk/2013/06/05/playing-notes-web-audio-api.html)
- [One-shot audio in games - Field Runners](http://www.html5rocks.com/en/tutorials/webaudio/fieldrunners/)
- [WebAudio Summary](https://docs.webplatform.org/wiki/apis/webaudio)
