---
layout: post
title: Getting started with WebAudio

---

**Definitions**

**API**: Application Programming Interface.

- A set of routines, protocols, and tools for building software applications

**HTML**: HyperText Markup Language.

- Provides a standard for playing audio files
- Important methods: load(), play(), pause()
- Important attributes: autoplay, controls, loop, muted, preload, src

`<audio>` tag specifies a standard way to embed audio in a web page

**JavaScript**: A dynamic programming language, object-oriented, commonly used to create interactive effects within web browsers.

- embedded in HTML, within `<script>` tags

**AudioContext**: Managing and playing all sounds

- AudioContext connects sound sources to the sound destination
- Only needed once for each audio application created
- Executes the audio processing or decoding
- Contains AudioNodes

`var audioContext = new AudioContext()`

**SampleRate**: Number of samples of audio carried per second (Hz / kHz)

- `AudioContext.sampleRate`returns a floating point number representing sample rate used by ALL nodes
- Sample-rate of an AudioContext cannot be changed
- Sample-rate convertors are not supported

```
var audioContext = new AudioContext();
var mySampleRate = audioContext.sampleRate;
```

**Audio NodeGraph**: connected AudioNodes in a given AudioContext creates an audio routhing graph.

- represents an audio-processing graph built from linked AudioNodes
- houses the chain of AudioNodes

LINKS:

- [HTML Audio Tag](http://www.w3schools.com/htmL/html5_audio.asp)
- [AudioContext](http://www.html5rocks.com/en/tutorials/webaudio/intro/)
- [WebAudio Interfaces](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
- [Sample Rate 1](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext)
- [Sample Rate 2](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/sampleRate)

