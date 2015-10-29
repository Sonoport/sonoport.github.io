window.AudioContext = window.AudioContext || window.webkitAudioContext;

var audioContext = new AudioContext();
var delay = audioContext.createDelay();
var leftDelay = audioContext.createDelay();
var rightDelay = audioContext.createDelay();
var feedback = audioContext.createGain();
var merger = audioContext.createChannelMerger(2);


function october() {
    playP(0, 58, 0.2); //Day 1
    playP(0.2, 113, 0.2); //Day 2
    playP(0.4, 128, 0.2); // Day 3
    playP(0.6, 110, 0.2); // Day 4
    playP(0.8, 139, 0.2); // Day 5
    playP(1.0, 139, 0.2); // Day 6
    playP(1.2, 106, 0.2); // Day 7
    playP(1.4, 69, 0.2); // Day 8
    playP(1.6, 78, 0.2); // Day 9
    playP(1.8, 81, 0.2); // Day 10
    playP(2.0, 75, 0.2); // Day 11
    playP(2.2, 98, 0.2); // Day 12
    playP(2.4, 114, 0.2); // Day 13
    playP(2.6, 97, 0.2); // Day 14
    playP(2.8, 74, 0.2); // Day 15
    playP(3.0, 90, 0.2); // Day 16
    playP(3.2, 92, 0.2); // Day 17
    playP(3.4, 79, 0.2); // Day 18
    playP(3.6, 130, 0.2); // Day 19
    playP(3.8, 95, 0.2); // Day 20
    playP(4.0, 98, 0.2); // Day 21
    playP(4.2, 87, 0.2); // Day 22
    playP(4.4, 89, 0.2); // Day 23
    playP(4.6, 185, 0.2); // Day 24
    playP(4.8, 123, 0.2); // Day 25
    playP(5.0, 137, 0.2); // Day 26
    playP(5.2, 131, 0.2); // Day 27
    playP(5.4, 91, 0.2); // Day 28
};


function september() {
    playP(0, 57, 0.2); //Day 1
    playP(0.2, 74, 0.2); //Day 2
    playP(0.4, 79, 0.2); // Day 3
    playP(0.6, 76, 0.2); // Day 4
    playP(0.8, 81, 0.2); // Day 5
    playP(1.2, 88, 0.2); // Day 6
    playP(1.4, 75, 0.2); // Day 7
    playP(1.6, 89, 0.2); // Day 8
    playP(1.8, 79, 0.2); // Day 9
    playP(2.0, 98, 0.2); // Day 10
    playP(2.2, 144, 0.2); // Day 11
    playP(2.4, 73, 0.2); // Day 12
    playP(2.6, 124, 0.2); // Day 13
    playP(2.8, 121, 0.2); // Day 14
    playP(3.0, 128, 0.2); // Day 15
    playP(3.2, 96, 0.2); // Day 16
    playP(3.4, 77, 0.2); // Day 17
    playP(3.6, 71, 0.2); // Day 18
    playP(3.8, 61, 0.2); // Day 18
    playP(4.0, 121, 0.2); // Day 19
    playP(4.2, 81, 0.2); // Day 20
    playP(4.4, 74, 0.2); // Day 21
    playP(4.6, 76, 0.2); // Day 22
    playP(4.8, 80, 0.2); // Day 23
    playP(5.0, 173, 0.2); // Day 24
    playP(5.2, 248, 0.2); // Day 25
    playP(5.4, 93, 0.2); // Day 26
    playP(5.8, 66, 0.2); // Day 27
    playP(6.0, 126, 0.2); // Day 28
    playP(5.2, 162, 0.2); // Day 29
    playP(5.4, 131, 0.2); // Day 30

}

function august() {
    playP(0, 57, 0.2); //Day 1
    playP(0.2, 48, 0.2); //Day 2
    playP(0.4, 33, 0.2); // Day 3
    playP(0.6, 42, 0.2); // Day 4
    playP(0.8, 53, 0.2); // Day 5
    playP(1.2, 52, 0.2); // Day 6
    playP(1.4, 54, 0.2); // Day 7
    playP(1.6, 54, 0.2); // Day 8
    playP(1.8, 51, 0.2); // Day 9
    playP(2.0, 57, 0.2); // Day 10
    playP(2.2, 53, 0.2); // Day 11
    playP(2.4, 53, 0.2); // Day 12
    playP(2.6, 59, 0.2); // Day 13
    playP(2.8, 48, 0.2); // Day 14
    playP(3.0, 51, 0.2); // Day 15
    playP(3.2, 47, 0.2); // Day 16
    playP(3.4, 48, 0.2); // Day 17
    playP(3.6, 53, 0.2); // Day 18
    playP(3.8, 57, 0.2); // Day 19
    playP(4.0, 64, 0.2); // Day 20
    playP(4.2, 71, 0.2); // Day 21
    playP(4.4, 76, 0.2); // Day 22
    playP(4.6, 71, 0.2); // Day 23
    playP(4.8, 71, 0.2); // Day 24
    playP(5.0, 76, 0.2); // Day 25
    playP(5.2, 75, 0.2); // Day 26
    playP(5.4, 63, 0.2); // Day 27
    playP(5.8, 64, 0.2); // Day 28
    playP(6.0, 69, 0.2); // Day 29
    playP(5.2, 61, 0.2); // Day 30
    playP(5.4, 54, 0.2); // Day 31

}




function playP(delay, pitch, duration) {
    var startTime = audioContext.currentTime + delay;
    var endTime = startTime + duration;
    var oscillatorPSI = audioContext.createOscillator();
    var oscillatorPSI2 = audioContext.createOscillator();
    //var oscillator3 = audioContext.createOscillator();

    var gain = audioContext.createGain();
    var oscGain1 = audioContext.createGain();
    var oscGain2 = audioContext.createGain();
    //var oscGain3 = audioContext.createGain();

    leftDelay.delayTime.value = 0.4;
    rightDelay.delayTime.value = 0.4;

    leftDelay.connect(rightDelay);
    leftDelay.connect(merger, 0, 0);
    rightDelay.connect(merger, 0, 1);
    merger.connect(gain);

    oscillatorPSI.connect(oscGain1);
    oscillatorPSI2.connect(oscGain2);
    // oscillator3.connect(oscGain3);
    oscGain1.connect(feedback);
    oscGain2.connect(feedback);
    //oscGain3.connect(feedback);
    feedback.connect(leftDelay);
    rightDelay.connect(feedback);

    feedback.gain.value = 0.1;
    leftDelay.connect(rightDelay);
    gain.connect(audioContext.destination);

    gain.gain.value = 0.2;
    oscGain1.gain.value = 0.1;
    oscGain2.gain.value = 0.2;

    oscGain1.gain.setValueAtTime(oscGain1.gain.value, context.currentTime);
    oscGain1.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.1);
    //oscGain1.gain.linearRampToValueAtTime(0, context.currentTime + 1);

    oscGain2.gain.setValueAtTime(oscGain2.gain.value, context.currentTime);
    oscGain2.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.1);
    //oscGain2.gain.linearRampToValueAtTime(0, context.currentTime + 1);

    feedback.gain.setValueAtTime(feedback.gain.value, context.currentTime);
    feedback.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.1);
    //feedback.gain.linearRampToValueAtTime(0, context.currentTime + 1);

    //oscGain3.gain.value = 0.1;

    oscillatorPSI.start(startTime);
    oscillatorPSI2.start(startTime);
    //oscillator3.start(startTime)

    oscillatorPSI.stop(endTime);
    oscillatorPSI2.stop(endTime);
    //oscillator3.stop(endTime)

    oscillatorPSI.frequency.value = pitch * 10;
    oscillatorPSI2.frequency.value = pitch * 2;
    //oscillator3.frequency.value = pitch * 100;

}