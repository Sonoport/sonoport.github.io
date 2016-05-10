<p>Web audio API example: load a sound file, reverse it and play/stop it on a button click.</p>

<button onclick="loadSound(url)">Load</button>
<button onclick="playSound(url, myAudioBuffer)">Play</button>
<button onclick="addCompressor()">Add Compressor</button>
<button onclick="removeCompressor()">Remove Compressor</button>
<button onclick="stopSound()">Stop</button>
<canvas class="visualizer";id="myCanvas";width="800" height="300"></canvas>

<p>
<div><input type="range" min="-100" max="100" value="0" step="1" onchange="showValue(this.value)" /> Threshold: <span id="range">0</span> 
</div>
<div><input type="range" min="-100" max="100" value="0" step="1" onchange="showValue2(this.value)" /> Knee: <span id="range2">0</span> 
</div>
<div><input type="range" min="1" max="100" value="0" step="1" onchange="showValue3(this.value)" /> Ratio: <span id="range3">0</span> 
</div>
<div><input type="range" min="-100" max="100" value="0" step="1" onchange="showValue4(this.value)" /> Reduction: <span id="range4">0</span> 
</div>
</p>
