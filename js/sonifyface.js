var capture;
var ctracker;

window.AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext;

function setup() {

    capture = createCapture(VIDEO);
    capture.size(500, 500);
    capture.id("videoCanvas");
    capture.parent('videoCanvas');

    var canvas = createCanvas(500, 500);

    canvas.id("canvas");
    canvas.parent('canvas');
    //canvas.size(500,500);

    console.log(capture);
    console.log(capture.elt);


    ctracker = new clm.tracker();
    ctracker.init(pModel);
    ctracker.start(capture.elt);

    //noStroke();

}

function draw() {

    var p = ctracker.getCurrentPosition();

    //eyebrows
    var a1 = p[19];
    var a2 = p[20];
    var a3 = p[21];
    var a4 = p[22];
    var a5 = p[18];
    var a5 = p[17];
    var a6 = p[16];
    var a7 = p[15];

    var b1 = p[0];
    var b2 = p[1];
    var b3 = p[2];
    var b4 = p[3];
    var b5 = p[4];
    var b6 = p[5];
    var b7 = p[6];
    var b8 = p[7];
    var b9 = p[8];
    var b10 = p[9];
    var b11 = p[10];
    var b12 = p[11];
    var b13 = p[12];
    var b14 = p[13];

    var c1 = p[23];
    var c2 = p[63];
    var c3 = p[24];
    var c4 = p[64];
    var c5 = p[25];
    var c6 = p[65];
    var c7 = p[26];
    var c8 = p[66];
    var c9 = p[23];
    var c10 = p[27];
    var c11 = p[30];
    var c12 = p[68];
    var c13 = p[29];
    var c14 = p[67];
    var c15 = p[28];
    var c16 = p[70];
    var c17 = p[31];
    var c18 = p[69];
    var c19 = p[32];

    var d1 = p[33];
    var d2 = p[41];
    var d3 = p[62];
    var d4 = p[34];
    var d5 = p[35];
    var d6 = p[36];
    var d7 = p[42];
    var d8 = p[37];
    var d9 = p[43];
    var d10 = p[38];
    var d11 = p[39];
    var d12 = p[40];

    var e1 = p[44];
    var e2 = p[45];
    var e3 = p[46];
    var e4 = p[47];
    var e5 = p[48];
    var e6 = p[49];
    var e7 = p[50];
    var e8 = p[51];
    var e9 = p[52];
    var e10 = p[53];
    var e11 = p[54];
    var e12 = p[55];
    var e13 = p[56];
    var e14 = p[57];
    var e15 = p[58];
    var e16 = p[59];
    var e17 = p[60];
    var e18 = p[61];



    if (a1) {

        ellipse(a1[0], a1[1], 5, 5);
        ellipse(a2[0], a2[1], 5, 5);
        ellipse(a3[0], a3[1], 5, 5);
        ellipse(a4[0], a4[1], 5, 5);
        ellipse(a5[0], a5[1], 5, 5);
        ellipse(a6[0], a6[1], 5, 5);
        ellipse(a7[0], a7[1], 5, 5);

        ellipse(b1[0], b1[1], 5, 5);
        ellipse(b2[0], b2[1], 5, 5);
        ellipse(b3[0], b3[1], 5, 5);
        ellipse(b4[0], b4[1], 5, 5);
        ellipse(b5[0], b5[1], 5, 5);
        ellipse(b6[0], b6[1], 5, 5);
        ellipse(b7[0], b7[1], 5, 5);
        ellipse(b8[0], b8[1], 5, 5);
        ellipse(b9[0], b9[1], 5, 5);
        ellipse(b10[0], b10[1], 5, 5);
        ellipse(b11[0], b11[1], 5, 5);
        ellipse(b12[0], b12[1], 5, 5);
        ellipse(b13[0], b13[1], 5, 5);
        ellipse(b14[0], b14[1], 5, 5);

        ellipse(c1[0], c1[1], 5, 5);
        ellipse(c2[0], c2[1], 5, 5);
        ellipse(c3[0], c3[1], 5, 5);
        ellipse(c4[0], c4[1], 5, 5);
        ellipse(c5[0], c5[1], 5, 5);
        ellipse(c6[0], c6[1], 5, 5);
        ellipse(c7[0], c7[1], 5, 5);
        ellipse(c8[0], c8[1], 5, 5);
        ellipse(c9[0], c9[1], 5, 5);
        ellipse(c10[0], c10[1], 5, 5);
        ellipse(c11[0], c11[1], 5, 5);
        ellipse(c12[0], c12[1], 5, 5);
        ellipse(c13[0], c13[1], 5, 5);
        ellipse(c14[0], c14[1], 5, 5);
        ellipse(c15[0], c15[1], 5, 5);
        ellipse(c16[0], c16[1], 5, 5);
        ellipse(c17[0], c17[1], 5, 5);
        ellipse(c18[0], c18[1], 5, 5);
        ellipse(c19[0], c19[1], 5, 5);

        ellipse(d1[0], d1[1], 5, 5);
        ellipse(d2[0], d2[1], 5, 5);
        ellipse(d3[0], d3[1], 5, 5);
        ellipse(d4[0], d4[1], 5, 5);
        ellipse(d5[0], d5[1], 5, 5);
        ellipse(d6[0], d6[1], 5, 5);
        ellipse(d7[0], d7[1], 5, 5);
        ellipse(d8[0], d8[1], 5, 5);
        ellipse(d9[0], d9[1], 5, 5);
        ellipse(d10[0], d10[1], 5, 5);
        ellipse(d11[0], d11[1], 5, 5);
        ellipse(d12[0], d12[1], 5, 5);

        ellipse(e1[0], e1[1], 5, 5);
        ellipse(e2[0], e2[1], 5, 5);
        ellipse(e3[0], e3[1], 5, 5);
        ellipse(e4[0], e4[1], 5, 5);
        ellipse(e5[0], e5[1], 5, 5);
        ellipse(e6[0], e6[1], 5, 5);
        ellipse(e7[0], e7[1], 5, 5);
        ellipse(e8[0], e8[1], 5, 5);
        ellipse(e9[0], e9[1], 5, 5);
        ellipse(e10[0], e10[1], 5, 5);
        ellipse(e11[0], e11[1], 5, 5);
        ellipse(e12[0], e12[1], 5, 5);
        ellipse(e13[0], e13[1], 5, 5);
        ellipse(e14[0], e14[1], 5, 5);
        ellipse(e15[0], e15[1], 5, 5);
        ellipse(e16[0], e16[1], 5, 5);
        ellipse(e17[0], e17[1], 5, 5);
        ellipse(e18[0], e18[1], 5, 5);

    };

    blendMode(ADD);
    image(capture, 0, 0, 500, 500);
    filter('INVERT');

};


// function collectElements() {

// }

// var osc = audioContext.createOscillator();
// var gain = audioContext.createGain();
// var currentTime = audioContext.currentTime;

// gain.gain.value = 0.6;

// osc.frequency.value = b3[0];
// osc.connect(gain);
// gain.connect(audioContext.destination);

// osc.start(currentTime);










