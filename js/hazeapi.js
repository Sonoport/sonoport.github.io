function play() {
    loadXMLDoc();
    gain.gain.value = 0.8;
};

function stop() {
    gain.gain.value = 0;
}

//testing some changes
//nonsense line of code
console.log("test");


function loadXMLDoc() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            myFunction(xhr);

        }
    }
    xhr.open("GET", "http://www.nea.gov.sg/api/WebAPI?dataset=psi_update&keyref=781CF461BB6606ADBC7C75BF9D4F60DBB6B4C035E6FD9C16", true);
    xhr.send();
}

function loadXMLDoc2() {
    var xhr2 = new XMLHttpRequest();
    xhr2.onreadystatechange = function() {
        if (xhr2.readyState == 4 && xhr2.status == 200) {
            myFunction2(xhr2);

        }
    }
    xhr2.open("GET", "http://www.nea.gov.sg/api/WebAPI/?dataset=12hrs_forecast&keyref=781CF461BB6606ADBC7C75BF9D4F60DBB6B4C035E6FD9C16", true);
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
            img.src = '/img/singaporefairday.jpg';
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
            img.src = '/img/cloudy.jpg';
            div.appendChild(img);
            break;

        case "HZ":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/hazy.jpg';
            div.appendChild(img);
            weather();
            break;

        case "WD":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/windy.jpg';
            div.appendChild(img);
            break;

        case "RA":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/rain.jpg';
            div.appendChild(img);
            break;

        case "PS":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/rainss.jpg';
            div.appendChild(img);
            break;

        case "SH":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/passingshowers.jpg';
            div.appendChild(img);
            playSunny();
            break;

        case "TS":
            document.getElementById("weather").innerHTML = "Forecast: " + x;
            console.log(w);
            img.src = '/img/ThunderyShowers.jpg';
            div.appendChild(img);
            break;

        default:
            console.log("It's broken!!");
    }


}

function myFunction(xml) {

    var i;
    var xmlDoc = xml.responseXML;
    var table = "<tr><th>Date</th><th>Time</th><th>PSI Update</th><th>Air Quality</th></tr>";
    var x = xmlDoc.getElementsByTagName("channel");

    var psiVal = xmlDoc.getElementsByTagName("reading")[13].attributes.getNamedItem("value").nodeValue;
    console.log(psiVal);

    function clearCoor() {
        document.getElementById("demo1").innerHTML = "";
    }

    function airQuality() {
        var q;
        if (psiVal <= 50) {
            q = "Good";
        } else if (psiVal <= 100) {
            q = "Moderate";
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

    console.log(airQuality());
    biquadFilter.frequency.value = psiVal;

    // create a new javascript Date object
    var date = new Date();

    for (i = 0; i < x.length; i++) {
        table += "<tr><td>" +
            date.toDateString() +
            "</td><td>" +
            date.toLocaleTimeString() +
            "</td><td>" +
            x[i].getElementsByTagName("reading")[13].attributes.getNamedItem("value").nodeValue +
            "</td><td>" +
            airQuality() + "</td></tr>";
    }
    document.getElementById("demo").innerHTML = table;
}

//AUDIO

var context = new AudioContext();
var whiteNoise = context.createBufferSource();
var gain = context.createGain();
var sunGain = context.createGain();
var noiseGain = context.createGain();
var biquadFilter = context.createBiquadFilter();
var url = "https://dl.dropboxusercontent.com/u/30075450/sunny1.wav";
var source;
var myAudioBuffer;

function playSound() {

    var bufferSize = 2 * context.sampleRate,
        noiseBuffer = context.createBuffer(1, bufferSize, context.sampleRate),
        output = noiseBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;
    whiteNoise.start(0);

    biquadFilter.type = "bandpass";

    gain.gain.value = 0;
    sunGain.gain.value = 0;




    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.send();
    request.onload = function() {
        context.decodeAudioData(request.response, function(buffer) {
            myAudioBuffer = buffer;
            console.log(myAudioBuffer);
            source = context.createBufferSource();
            source.buffer = myAudioBuffer;
            source.connect(sunGain);
            //sunGain.gain.value = 1;
            source.start();
        });

    };



    whiteNoise.connect(biquadFilter);
    biquadFilter.connect(noiseGain);
    sunGain.connect(gain);
    noiseGain.connect(gain);
    gain.connect(context.destination);

}

function goodPSI() {
    biquadFilter.frequency.value = 50;
    noiseGain.gain.value = 0.8;
    gain.gain.value = 1;

}

function moderatePSI() {
    biquadFilter.frequency.value = 100;
    noiseGain.gain.value = 0.8;
    gain.gain.value = 1;
}

function unhealthyPSI() {
    biquadFilter.frequency.value = 200;
    noiseGain.gain.value = 0.8;
    gain.gain.value = 1;
}

function badPSI() {
    biquadFilter.frequency.value = 300;
    noiseGain.gain.value = 0.8;
    gain.gain.value = 1;
}

function verybadPSI() {
    biquadFilter.frequency.value = 400;
    noiseGain.gain.value = 0.8;
    gain.gain.value = 1;
}

function weather() {
    gain.gain.value = 1;
    noiseGain.gain.value = 0;
    sunGain.gain.value = 1;
}

document.getElementById('hazeslider').addEventListener('input', function() {
    biquadFilter.frequency.value = this.value;
    console.log('Filter Frequency', this.value);
    gain.gain.value = 1;
    noiseGain.gain.value = 1;
    //sunGain.gain.value = 1;
    document.getElementById('showValue').innerHTML = "PSI Level: " + this.value;
});

/* Sunny Ambient Sound */
/*
 Create sound playback function 
function playSunny(myAudioBuffer) {
    source = context.createBufferSource();
    source.buffer = myAudioBuffer;
    source.connect(context.destination);
    source.start();
}

*/

playSound();