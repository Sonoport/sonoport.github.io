---
layout:     post
title:      "More on Web Audio API"
subtitle:   "So how do we make sound?"
date:       2015-07-06 12:00:00
author:     "Aqilah Misuary"
header-img: "img/postheader05.png"
---

Welcome to another blog post on **Web Audio API**! Previously we have complied a bunch of information that would be useful for anyone to start on web audio
[here](http://blog.sonoport.com/post/120993888887/learningwebaudioapi). If you are not sure what is Web Audio API, it would be useful to check that out first! For today's post we would like to delve a little deeper into web audio and find out more about the history behind it! Then we shall explain what is **AudioContext** and analyse a snippet of code so that anyone without much coding background would be able to understand it too. If this tutorial is too basic for more advanced developers, perhaps one should head over to [Tizen](https://developer.tizen.org/documentation/articles/advanced-web-audio-api-usage) where they have a wonderful tutorial on **Advanced Web Audio Usage**.

###Before Web Audio API there was the HTML audio element

The introduction of the `audio` element in HTML5 was important because it allowed us to have audio playback across different browsers without having to run plugins such as Flash or Quicktime. Previously, if one does not have those plugins installed, the audio or video content in the web page cannot be properly downloaded or displayed. This was one of the common issues in regards to audio and video as the required plugins may be missing, outdated, blocked or in conflict with another plugin or extension.

However even with the `audio` element, there were still huge limitations on using audio with sophisticated games or interactive applications such as: 

1. **No precise timing controls**

    To build various musical applications, it's very important to have consistent and precise timing of audio events. Not just having sounds to start and stop but to be able to schedule complex scenarios such as playing musical sequences or rhythms. This is now possible with Web Audio API. However, working the audio clock is still one of the least understood topics as it can be quite complex. A good explanation of it by Chris Wilson can be found [here](http://www.html5rocks.com/en/tutorials/audio/scheduling/).

2. **Limited number of sounds can played at once**

    It only allows single sound layering (polyphonic), a single audio stream can only be played once at a time.

3. **No reliable way to pre-buffer a sound**
    
    Audio streams can't be loaded unless triggered by a user touch event (`onmousedown`, `onmouseup`, `onclick`, or `ontouchstart`) and this is futher limited in Safari mobile browsers which does not support the `preload` attribute and will fail when an audio stream is played on page load.

4. **No way to apply real-time effects**

5. **No way to analyse sounds**

6. **Not all browsers support the same audio file format**

    This has been a really big issue that often made developers [angry](http://phoboslab.org/log/2011/03/the-state-of-html5-audio). 

In all there are workarounds for some of these issues however with the introduction of Web Audio API, it has solved most these problems and made audio on the web easier for developers to use. It's not all perfect though, as there are still [issues](https://github.com/WebAudio/web-audio-api/issues) being discovered.
    
###The goal of Web Audio API

> The goal of this API is to include capabilities found in modern game engines and some of the mixing, processing, and filtering tasks that are found in modern desktop audio production applications. The result is a versatile API that can be used in a variety of audio-related tasks, from games, to interactive applications, to very advanced music synthesis applications and visualizations.  - [Web Audio API](http://chimera.labs.oreilly.com/books/1234000001552) by [Boris Smus](https://twitter.com/borismus)

Sound effects in games are not straightforward, game engines have methods of placing sounds within the game environment which will modify and react accordingly to character interactions. An example of Web Audio API being applied for that would be this open source racing game for Linux called [Trigger Rally](https://triggerrally.com/). You can also read a blog post on it [here](http://creativejs.com/2012/03/trigger-rally-online-edition/). Another informative article would be [Developing Game Audio with the Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/games/) and you can also read the challenges that comes with it [here](http://www.html5rocks.com/en/tutorials/webaudio/fieldrunners/).

Audio related tasks found in modern desktop audio production applications? An example of that would be [mix.js](http://kevvv.in/mix/) or [hya.io](https://hya.io/#/main). These are basic audio tools that you can use to play around with mixing, processing or manipulating sounds on the web and the best part of it is that it's mostly open source. Lists of these examples are endless as there are new applications popping up every week from creative developers and more web audio projects being showcased on websites such as [Audiocrawl](http://audiocrawl.co/) or even our own Sonoport newsfeed on [Tumblr](blog.sonoport.com) and other social media accounts ([Facebook](https://www.facebook.com/sonoport), [Twitter](https://twitter.com/sonoport), [LinkedIn](https://www.linkedin.com/company/sonoport-asia-pte-ltd)).

###Let's get started!

- #####Making sound in the browser! 

    What is an **AudioContext**?

    It is an interface that represents an audio-processing graph built from audio   modules linked together, each represented by an **AudioNode**. These    **AudioNodes** defines how the audio stream flows from its source (eg. an audio     file) to its destination (eg. your speakers).

    Remember you can use [Jsfiddle](http://jsfiddle.net/) to test out these codes!

    Before we are able to do anything, we must first create an **AudioContext**

    `var audioContext = new AudioContext()`

    A single audio context can support multiple sound inputs and complex audio  graphs.

    Inside the **AudioContext** you are able to connect **AudioNodes**. There are   different types of **AudioNodes**:

    - Source nodes

    - Modification nodes

    - Analysis nodes

    - Destination nodes

    This line of code below creates an [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode).

    `var oscillator = audioContext.createOscillator()`

    It is a type of **AudioNode**   which is    categorised under source nodes. Other   than *oscillators*, source  nodes includes  other sound sources such as *audio  buffers*, *live audio inputs*, `<audio>` tags and *JS   processors*. You can read more about the other nodes [here](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).


    After you've created the sound source, it's time to connect it to your speakers! 
    
    `oscillator.connect(audioContext.destination)`

    **audioContext.destination** is a special node that is associated with the  default audio output of your system. It is categorised under destination    nodes.

    Here are we setting the properties of the [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode).

    `oscillator.type = 'sine'`

    `oscillator.frequency.value = 100`
    
    Most properties on Audio Nodes are instances of [AudioParam](https://   developer.mozilla.org/en-US/docs/Web/API/AudioParam).
    
    Now to start your oscillator!

    `oscillator.start(audioContext.currentTime)`

    `oscillator.stop(audioContext.currentTime + 5)` // stop after 5 seconds

    More info on the [OscillatorNode start method](https://developer.mozilla.org/en-    US/docs/Web/API/OscillatorNode/start) and [OscillatorNode stop method](https:// developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/stop).

    By the end of it your code should look like [this](http://jsfiddle.net/tsuLof5c/). 
    
This was based on the first tutorial lesson on the [Web Audio School](http://mmckegg.github.io/web-audio-school/) by [Matt McKegg](https://twitter.com/mattmckegg). The Web Audio School allows you to learn in a more interactive way with various topics on web audio. With these tutorials you should be able to grasp the basic web audio concepts to use in simple applications.

#####References

- [What is an API?](http://www.quora.com/What-is-an-API)
2. [Web Audio Github](http://webaudio.github.io/web-audio-api/)
3. [Fix common audio & video issues](https://support.mozilla.org/en-US/kb/fix-common-audio-and-video-issues)
4. [Overcoming iOS HTML5 audio limitations](http://www.ibm.com/developerworks/library/wa-ioshtml5/)
5. [The State of HTML5 Audio](http://phoboslab.org/log/2011/03/the-state-of-html5-audio)