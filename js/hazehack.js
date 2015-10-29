//AUDIO VARIABLES
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var noiseGain = context.createGain();
var sampleGain = context.createGain();
var oscillator = context.createOscillator();
var oscillator2 = context.createOscillator();
var delay = context.createDelay()
var leftDelay = context.createDelay()
var rightDelay = context.createDelay()
var feedback = context.createGain()
var merger = context.createChannelMerger(2)

var url = "https://dl.dropboxusercontent.com/u/30075450/Huatah.wav";
var source;
var myAudioBuffer;

var url2 = "https://dl.dropboxusercontent.com/u/30075450/Buay.wav";
var source2;
var myAudioBuffer2;

var url3 = "https://dl.dropboxusercontent.com/u/30075450/Aiyo.wav";
var source3;
var myAudioBuffer3;

var url4 = "https://dl.dropboxusercontent.com/u/30075450/Wahlaueh.wav";
var source4;
var myAudioBuffer4;

var url5 = "https://dl.dropboxusercontent.com/u/30075450/Jialat.wav";
var source5;
var myAudioBuffer5;

function play() {;
    loadXMLDoc();
};


function stop() {
    noiseGain.gain.value = 0;

}

function loadXMLDoc() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://www.nea.gov.sg/api/WebAPI?dataset=psi_update&keyref=781CF461BB6606ADBC7C75BF9D4F60DBB6B4C035E6FD9C16", true);
    //xhr.setRequestHeader("Content-Type","text/xml");
    xhr.onload = function() {
        

            if(xhr.status === 200) {
                myFunction(xhr);
            }

        
    };
    //xhr.open("GET", "http://www.nea.gov.sg/api/WebAPI?dataset=psi_update&keyref=781CF461BB6606ADBC7C75BF9D4F60DBB6B4C035E6FD9C16", true);
    xhr.send();
}

function loadXMLDoc2() {
    var xhr2 = new XMLHttpRequest();
    xhr2.open("GET", "http://www.nea.gov.sg/api/WebAPI/?dataset=12hrs_forecast&keyref=781CF461BB6606ADBC7C75BF9D4F60DBB6B4C035E6FD9C16", true);
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState === 4) {

            if(xhr2.status === 200){
            myFunction2(xhr2);
            }

        }
    }
    //xhr2.open("GET", "http://www.nea.gov.sg/api/WebAPI/?dataset=12hrs_forecast&keyref=781CF461BB6606ADBC7C75BF9D4F60DBB6B4C035E6FD9C16", true);
    xhr2.send();
}



function myFunction2(xml2) {
    var xmlDoc2 = xml2.responseXML;
    var x = xmlDoc2.getElementsByTagName("forecast")[0].childNodes[0].nodeValue;
    console.log(x);
    //document.getElementById("weather").innerHTML = "Forecast: " + x;

    var w = xmlDoc2.getElementsByTagName("wxmain")[0].childNodes[0].nodeValue;

    var img = new Image();
    img.style.height = 'auto';
    img.style.width = '600px';
    var div = document.getElementById('weather');


    switch (w) {
        case "FD":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/singaporefairday.jpeg';
            div.appendChild(img);
            break;

        case "FN":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/night.jpg';
            div.appendChild(img);
            break;

        case "PC":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/partlycloudy.jpg';
            div.appendChild(img);
            break;

        case "CD":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/partlycloudy.jpg';
            div.appendChild(img);
            break;

        case "HZ":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/hazecity.jpg';
            div.appendChild(img);
            weather();
            break;

        case "WD":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/windy.jpeg';
            div.appendChild(img);
            break;

        case "RA":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/rain.jpeg';
            div.appendChild(img);
            break;

        case "PS":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/rainss.jpeg';
            div.appendChild(img);
            break;

        case "SH":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/hazecity.jpg';
            div.appendChild(img);
            //playSunny();
            break;

        case "TS":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/ThunderyShowers.jpeg';
            div.appendChild(img);
            break;

        default:
            console.log("It's broken!!");
    }


}

function myFunction(xml) {

    var i;
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>Date</th><th>Time</th><th>PM2.5 Update</th><th>Air Quality</th></tr>";
    var x = xmlDoc.getElementsByTagName("channel");

    var psiVal = xmlDoc.getElementsByTagName("reading")[24].attributes.getNamedItem("value").nodeValue;
    console.log(psiVal);



    function clearCoor() {
        document.getElementById("demo1").innerHTML = "";
    }

    function airQuality() {
        var q;
        if (psiVal <= 50) {
            q = "Good";
            goodPSIglobal();
        } else if (psiVal <= 100) {
            q = "Moderate";
            moderatePSIglobal();
        } else if (psiVal <= 200) {
            q = "Unhealthy";
            unhealthyPSIglobal();
        } else if (psiVal <= 300) {
            q = "Very Unhealthy";
            badPSIglobal();
        } else if (psiVal > 300) {
            q = "Hazardous";
            verybadPSIglobal();
        } else {
            q = "Not Working";
        }
        return q;
    }



    // create a new javascript Date object
    var date = new Date();

    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            date.toDateString() +
            "</td><td>" +
            date.toLocaleTimeString() +
            "</td><td>" +
            x[i].getElementsByTagName("reading")[24].attributes.getNamedItem("value").nodeValue +
            "</td><td>" +
            airQuality() + "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}



function playSound() {

    oscillator.type = 'sine';

}

//GET HUAT AH SOUND FROM DROPBOX
function requestHuat() {
var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.send();
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
        myAudioBuffer = buffer;
        console.log(myAudioBuffer);
        source.buffer = myAudioBuffer;
        });

    };
}

function requestBuay() {
//GET BUAY TAHAN SOUND FROM DROPBOX
var request2 = new XMLHttpRequest();
    request2.open('GET', url2, true);
    request2.responseType = 'arraybuffer';
    request2.send();
    request2.onload = function() {
        context.decodeAudioData(request2.response, function(buffer) {
            myAudioBuffer2 = buffer;
            console.log(myAudioBuffer2);
            source2.buffer = myAudioBuffer2;
        });

    };
}

function requestAiyo() {
//GET AIYO SOUND FROM DROPBOX
var request3 = new XMLHttpRequest();
    request3.open('GET', url3, true);
    request3.responseType = 'arraybuffer';
    request3.send();
    request3.onload = function() {
        context.decodeAudioData(request3.response, function(buffer) {
            myAudioBuffer3 = buffer;
            console.log(myAudioBuffer3);
            source3.buffer = myAudioBuffer3;
        });

    };
}

function requestAiyoyo() {
//GET AIYOYO SOUND FROM DROPBOX
var request4 = new XMLHttpRequest();
    request4.open('GET', url4, true);
    request4.responseType = 'arraybuffer';
    request4.send();
    request4.onload = function() {
        context.decodeAudioData(request4.response, function(buffer) {
            myAudioBuffer4 = buffer;
            console.log(myAudioBuffer4);
            source4.buffer = myAudioBuffer4;
        });

    };
}

function requestJialat() {
//GET JIALAT SOUND FROM DROPBOX
var request5 = new XMLHttpRequest();
    request5.open('GET', url5, true);
    request5.responseType = 'arraybuffer';
    request5.send();
    request5.onload = function() {
        context.decodeAudioData(request5.response, function(buffer) {
            myAudioBuffer5 = buffer;
            console.log(myAudioBuffer5);
            source5.buffer = myAudioBuffer5;
        });

    };
}

oscillator.start(context.currentTime);
oscillator2.start(context.currentTime);
noiseGain.gain.value = 0;

leftDelay.delayTime.value = 0.1;
rightDelay.delayTime.value = 0.1;

leftDelay.connect(rightDelay);
leftDelay.connect(merger, 0, 0);
rightDelay.connect(merger, 0, 1);
merger.connect(noiseGain);

oscillator.connect(feedback);
oscillator2.connect(feedback);
feedback.connect(leftDelay);
rightDelay.connect(feedback);

feedback.gain.value = 0.6;
leftDelay.connect(rightDelay);
sampleGain.connect(context.destination);
noiseGain.connect(context.destination);

oscillator2.frequency.value = 50;



function weather() {
    play();
    noiseGain.gain.value = 0;
}


sampleGain.gain.value = 0.7;


document.getElementById('hazeslider').addEventListener('input', function() {


    oscillator.frequency.value = this.value;
    oscillator2.frequency.value = this.value * 1.5;
    console.log('PSI Level', this.value);
    noiseGain.gain.value = 0.5;
    noiseGain.gain.setValueAtTime(noiseGain.gain.value, context.currentTime);
    //noiseGain.gain.linearRampToValueAtTime( 0.5, context.currentTime + 1);
    //noiseGain.gain.linearRampToValueAtTime ( 0.0, context.currentTime + 2 );
    document.getElementById('showValue').innerHTML = "PSI Level: " + this.value;

});

playSound();


function time() {

    noiseGain.gain.setValueAtTime(noiseGain.gain.value, context.currentTime);
    noiseGain.gain.linearRampToValueAtTime(0.8, context.currentTime + 0.01);
    noiseGain.gain.linearRampToValueAtTime(0.0, context.currentTime + 0.5);

}

function goodPSIglobal() {

    console.log("PSI Level < 50");
    oscillator.frequency.value = 523.25;
    oscillator2.frequency.value = 329.63;

    requestHuat();
    source = context.createBufferSource();
    source.connect(sampleGain);
    source.start();
    
    time();
    alert("PSI Level is less than 50! Smell the fresh air!");
}

function moderatePSIglobal() {

    console.log("PSI Level 51-100");
    oscillator.frequency.value = 130.81;
    oscillator2.frequency.value = 164.81;
    
    requestBuay();
    source2 = context.createBufferSource();
    source2.connect(sampleGain);
    source2.start();

    time();
    alert("PSI Level is moderate! Avoid outdoor activities!");

}

function unhealthyPSIglobal() {

    console.log("PSI Level 101-200");
    oscillator.frequency.value = 369.99;
    oscillator2.frequency.value = 466.16;
    
    requestAiyo();
    source3 = context.createBufferSource();
    source3.connect(sampleGain);
    source3.start();

    time();
    alert("PSI Level is unhealthy! Wear a mask!");

}

function badPSIglobal() {

    console.log("PSI Level 201-300");
    oscillator.frequency.value = 554.37;
    oscillator2.frequency.value = 783.99;

    requestAiyoyo();
    source4 = context.createBufferSource();
    source4.connect(sampleGain);
    source4.start();

    time();
    alert("PSI Level is very unhealthy! You should stay indoors!");

}

function verybadPSIglobal() {

    console.log("PSI Level > 300");
    oscillator.frequency.value = 1108.73;
    oscillator2.frequency.value = 1174.66;

    requestJialat();
    source5 = context.createBufferSource();
    source5.connect(sampleGain);
    source5.start();

    time();
    alert("PSI Level is hazardous! Thank you Indonesia for 11 months of clean air! We appreciate it now");

}

function airQualityGlobal() {

    var q;
    if (psiVal <= 50) {
        q = "Good";
    } else if (psiVal <= 100) {
        q = "Moderate";
        moderatePSIglobal();
    } else if (psiVal <= 200) {
        q = "Unhealthy";
    } else if (psiVal <= 300) {
        q = "Very Unhealthy";
    } else if (psiVal > 300) {
        q = "Hazardous";
    } else {
        q = "Not Working";
    }
    return q;

}