//global volume
volume = 0.1


//dynamically created buttons
white_keys = ["C", "D", "E", "F", "G", "A", "B", "C2"]
black_keysA = ["C#", "D#"]
black_keysB = ["F#", "G#", "A#"]
voiceButtons = ["sin", "triangle", "square", "sawtooth"]


//create keyboard keys
white_keys.forEach(function addWhiteKey() {
  e = document.createElement("div")
  e.classList.add("WhiteKey")
  e.style.backgroundColor = "white"
  e.style.width = 50+"px"
  e.style.height = 200+"px"
  e.style.borderRadius = 5+"%"
  e.style.top = 60+"px"
  e.style.left = 50+"px"
  root.appendChild(e)
})

black_keysA.forEach(function addBlackKey() {
  e = document.createElement("div")
  e.classList.add("BlackKey")
  e.style.backgroundColor = "black"
  e.style.width = 25+"px"
  e.style.height = 130+"px"
  e.style.borderRadius = 5+"%"
  e.style.left = -334+"px"
  e.style.top = -10+"px"
  root.appendChild(e)
})

black_keysB.forEach(function addBlackKey() {
  e = document.createElement("div")
  e.classList.add("BlackKey")
  e.style.backgroundColor = "black"
  e.style.width = 25+"px"
  e.style.height = 130+"px"
  e.style.borderRadius = 5+"%"
  e.style.left = -282+"px"
  e.style.top = -10+"px"
  root.appendChild(e)
})

voiceButtons.forEach(function addButton() {
  e = document.createElement("div")
  e.classList.add("voiceButton")
  e.style.backgroundColor = "black"
  e.style.width = 20+"px"
  e.style.height = 12.5+"px"
  e.style.borderRadius =0+"px"
  e.style.left = -435+"px"
  e.style.top = -146+"px"
  root.appendChild(e)
})


//
let audioContext = new (window.AudioContext || window.webkitAudioContext)();


//global keyboard on and off buttons
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');


//function to start the oscillator
f=0;
acceso=0;
startBtn.onclick = function () {
  if(acceso == 0){

    acceso = 1

    //nodes
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    oscillator.frequency.setValueAtTime(0, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    gainNode.gain.setValueAtTime(volume, audioContext.currentTime); //set volume 

    oscillator.start();

    document.querySelector(".monitor").textContent = "PLAY"
    document.querySelector(".shift_pos2").textContent = "--o--"
    document.querySelector(".shift_pos3").textContent = "SINE"
    document.querySelector(".monitor_bpm").textContent=bpm+"bpm"

  }
};

    
stopBtn.onclick = function () { //turn off everything and reset values to default

  acceso = 0
  oscillator.stop();

  document.querySelector(".monitor").textContent = ""
  document.querySelector(".shift_pos2").textContent = ""
  document.querySelector(".shift_pos3").textContent = ""
  document.querySelector(".monitor_bpm").textContent = ""
  shift = 1
  oscillator.type = "sine"
  
  document.querySelector(".monitor_bpm").textContent=""
  bpm = 60
  if (intervalId)
      clearInterval(intervalId);

  stopBuffer();
  buffAcceso = 0;
  vocal = 0;

  volume = 0.1;
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime);

  transpose_status = 0;
};


//monitor and sound management
document.querySelectorAll(".WhiteKey").forEach(
  function(e, i) {
    e.onclick = function() {
        changefw(i)
    }
  }
)

function changefw(i){
 if(buffAcceso==0 && vocal==0 && acceso){ //sound from oscillator
    if(i == 0){
      f = Math.floor((440/Math.pow(2, 9/12))*shift)
      document.querySelector(".monitor").textContent = f+"Hz - C"
    }
    if(i == 1){
      f = Math.floor(440/Math.pow(2, 7/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - D"
    }
    if(i == 2){
      f = Math.floor(440/Math.pow(2, 5/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - E"
    }
    if(i == 3){
      f = Math.floor(440/Math.pow(2, 4/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - F"
    }
    if(i == 4){
      f = Math.floor(440/Math.pow(2, 2/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - G"
    }
    if(i == 5){
      f = 440*shift
      document.querySelector(".monitor").textContent = f+"Hz - A"
    }
    if(i == 6){
      f = Math.floor(440*Math.pow(2, 2/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - B"
    }
    if(i == 7){
      f = Math.floor(440*Math.pow(2, 3/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - C2"
    }
    oscillator.frequency.value = f
  }
  if(buffAcceso==1 && acceso){ //sound from buffer for drumkit
    if(i == 0){
      document.querySelector(".monitor").textContent = "hi-hat 1"
      buffTest = 0
    }
    if(i == 1){
      document.querySelector(".monitor").textContent = "hi-hat 2"
      buffTest = 1
   }
   if(i == 2){
      document.querySelector(".monitor").textContent = "hi-hat 3"
      buffTest = 2
   }
   if(i == 3){
      document.querySelector(".monitor").textContent = "kick 1"
      buffTest = 3
   }
   if(i == 4){
      document.querySelector(".monitor").textContent = "kick 2"
      buffTest = 4
   }
   if(i == 5){
      document.querySelector(".monitor").textContent = "tom 1"
      buffTest = 5
   }
   if(i == 6){
      document.querySelector(".monitor").textContent = "tom 2"
      buffTest = 6
   }
   if(i == 7){
      document.querySelector(".monitor").textContent = "snare"
      buffTest = 7
   }
   stopBuffer()
   Buffer()
  }
  if(vocal && acceso){ //sound from buffer for voice
    if(i == 0){
      document.querySelector(".monitor").textContent = "C"
      buffTest = 0
    }
    if(i == 1){
      document.querySelector(".monitor").textContent = "D"
      buffTest = 1
   }
   if(i == 2){
      document.querySelector(".monitor").textContent = "E"
      buffTest = 2
   }
   if(i == 3){
      document.querySelector(".monitor").textContent = "F"
      buffTest = 3
   }
   if(i == 4){
      document.querySelector(".monitor").textContent = "G"
      buffTest = 4
   }
   if(i == 5){
      document.querySelector(".monitor").textContent = "A"
      buffTest = 5
   }
   if(i == 6){
      document.querySelector(".monitor").textContent = "B"
      buffTest = 6
   }
   if(i == 7){
      document.querySelector(".monitor").textContent = "C2"
      buffTest = 7
   }
   stopBuffer()
   Buffer()
  }
}

document.querySelectorAll(".BlackKey").forEach( //same for black keys
  function(e, i) {
    e.onclick = function() {
        changefb(i)
    }
  }
)

function changefb(i){
 if(acceso && buffAcceso==0){ //sound from oscillator
    if(i == 0){
      f = Math.floor((440/Math.pow(2, 8/12))*shift)
      document.querySelector(".monitor").textContent = f+"Hz - C#"
    }
    if(i == 1){
      f = Math.floor(440/Math.pow(2, 6/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - D#"
   }
   if(i == 2){
      f = Math.floor(440/Math.pow(2, 3/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - F#"
    }
    if(i == 3){
      f = Math.floor(440/Math.pow(2, 1/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - G#"
    }
    if(i == 4){
      f = Math.floor(440*Math.pow(2, 1/12)*shift)
      document.querySelector(".monitor").textContent = f+"Hz - A#"
    }
    oscillator.frequency.value = f
  }
  if(vocal && acceso){
    if(i == 0){
      document.querySelector(".monitor").textContent = "C#"
      buffTest = 8
    }
    if(i == 1){
      document.querySelector(".monitor").textContent = "D#"
      buffTest = 9
   }
   if(i == 2){
      document.querySelector(".monitor").textContent = "F#"
      buffTest = 10
   }
   if(i == 3){
      document.querySelector(".monitor").textContent = "G#"
      buffTest = 11
   }
   if(i == 4){
      document.querySelector(".monitor").textContent = "A#"
      buffTest = 12
   }
   stopBuffer()
   Buffer()
 }
}


//select type of oscillator (sine, triangle, square, sawtooth); Note: this is not related to the "VOICE" button you see on the keyboard which selects the buffer with vocal samples.
document.querySelectorAll(".voiceButton").forEach(
  function(e, i) {
    e.onclick = function() {
      voiceSelect(i)
   }
  }
)

function voiceSelect(i){
 if(acceso && buffAcceso==0 && vocal==0){ 
   if(i == 0){
    oscillator.type = "sine";
    document.querySelector(".shift_pos3").textContent = "SINE"
   }
   if(i == 1){
    oscillator.type = "triangle";
    document.querySelector(".shift_pos3").textContent = "TRIANGLE"
   }
   if(i == 2){
    oscillator.type = "square";
    document.querySelector(".shift_pos3").textContent = "SQUARE"
   }
   if(i == 3){
    oscillator.type = "sawtooth";
    document.querySelector(".shift_pos3").textContent = "SAWTOOTH"
   }
  
 }
}


//transpose the octaves while using the oscillator
function shifting_right() {
  if(acceso && buffAcceso==0 && vocal==0){
    if(transpose_status >= 2)
      transpose_status == 2
    else
      transpose_status = transpose_status + 1
    transposition()
  }
}
function shifting_left() {
  if(acceso && buffAcceso==0 && vocal==0){
    if(transpose_status <= -2)
      transpose_status == -2
    else
      transpose_status = transpose_status - 1
    transposition()
  }
}

left.onclick = shifting_left
right.onclick = shifting_right

shift = 1
transpose_status = 0
function transposition(){ 
  if(transpose_status == 0){
    shift = 1
    document.querySelector(".shift_pos2").textContent = "--o--"} //visual part for the monitor
  if(transpose_status == 1){
    shift = 2
    document.querySelector(".shift_pos2").textContent = "---o-"} 
  if(transpose_status == 2){
    shift = 4
  document.querySelector(".shift_pos2").textContent = "----o"}
  if(transpose_status == -1){
    shift = 1/2
    document.querySelector(".shift_pos2").textContent = "-o---"}
  if(transpose_status == -2){
    shift = 1/4
    document.querySelector(".shift_pos2").textContent = "o----"}
}



//metronome
let audioCtx;
let intervalId;

function playTick() {
    const osc = audioCtx.createOscillator();
    const envelope = audioCtx.createGain();

    osc.frequency.value = 1000; //tick pitch
    //envelope.gain.setValueAtTime(1, audioContext.currentTime);
    envelope.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
    envelope.gain.setValueAtTime(volume, audioCtx.currentTime);

    osc.connect(envelope);
    envelope.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.05);
}


set.onclick = function startMetronome() {
    
  const interval = 60000 / bpm; //ms per beat

  if(acceso){
    if(!audioCtx)
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    stopMetronome();         
    intervalId = setInterval(playTick, interval);
    render()
  }
}

function stopMetronome() {
    if (intervalId)
      clearInterval(intervalId);
}

pause.onclick = stopMetronome;


bpm = 60
ms_from_bpm=1000
timerId = null


function render() {
  if(acceso)
   document.querySelector(".monitor_bpm").textContent=bpm+"bpm" //change bpm on monitor
}


document.getElementById("bpm_inc").onclick= //change speed of metronome
  function(){
   if(acceso){ 
    bpm = Math.min(bpm + 1, 140)
    ms_from_bpm = 60000/bpm
    clearInterval(timerId)
    timerId = setInterval(nextTime, ms_from_bpm);
    render()
   }
}

document.getElementById("bpm_dec").onclick=
  function(){
   if(acceso){
    bpm = Math.max(10, bpm - 1)
    ms_from_bpm = 60000/bpm
    clearInterval(timerId)
    timerId= setInterval(nextTime, ms_from_bpm)
    render()
 }
}

function nextTime() {
   render() 
}



//buffer
let bufferSource = null;

function createSoundBuffer() {
    const bufferSize = audioContext.sampleRate * 1; //1 second buffer
    console.log(audioContext.sampleRate); 
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
  //drum sound 
  if(buffAcceso==1){ //hi-hat
    if(buffTest==0){
      for (let i = 0; i < bufferSize; i++) {

        const noise = Math.random() * 2 - 1;
        const decay = Math.exp(-i / (audioContext.sampleRate * 0.1)); 
        
        data[i] = noise * decay;
      }
    }
    if(buffTest==1){
      for (let i = 0; i < bufferSize; i++) {

        const noise = Math.random() * 2 - 1;
        const decay = Math.exp(-i / (audioContext.sampleRate * 0.05)); 

        data[i] = noise * decay;
      }
    }
    if(buffTest==2){
      for (let i = 0; i < bufferSize; i++) {

        const noise = Math.random() * 2 - 1;
        const decay = Math.exp(-i / (audioContext.sampleRate * 0.01)); 

        data[i] = noise * decay;
      }
    }
    if(buffTest==3){ //kick
    
      const sampleRate = audioContext.sampleRate;

      const startFreq = 60;     
      const endFreq = 40;        
      const duration = bufferSize / sampleRate; 

      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;

        // Exponential pitch sweep (gives the "thump")
        const freq = startFreq * Math.pow(endFreq / startFreq, t / duration);
        const sine = Math.sin(2 * Math.PI * freq * t);

        // Amplitude envelope (fast attack, slow-ish decay)
        const amp = Math.exp(-t * 20);  // tweak this decay

        data[i] = sine * amp;
      }
    }
    if(buffTest==4){
    
      const sampleRate = audioContext.sampleRate;

      const startFreq = 120;     // starting pitch
      const endFreq = 40;        // pitch drops to this
      const duration = bufferSize / sampleRate; 

      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;

        // Exponential pitch sweep (gives the "thump")
        const freq = startFreq * Math.pow(endFreq / startFreq, t / duration);
        const sine = Math.sin(2 * Math.PI * freq * t);

        // Amplitude envelope (fast attack, slow-ish decay)
        const amp = Math.exp(-t * 20);  // tweak this decay

        data[i] = sine * amp;
      }
    }
    if(buffTest==5){ //tom
      for (let i = 0; i < bufferSize; i++) {

        // Envelope to shape the tom sound (fast attack, medium decay)
        const attack = Math.min(1, i / (audioContext.sampleRate * 0.02));  // Attack in 20ms
        const decay = Math.exp(-i / (audioContext.sampleRate * 0.3));     // Slower decay (300ms)
        const sustain = 0.2;  // Low sustain for tom decay

        // Combine attack, decay, and sustain to create the tom envelope
        const envelope = attack * decay * sustain;

        // Pitch modulation (tom sound has a low fundamental pitch)
        // Apply a sinusoidal tone at around 80-150Hz (typical for toms)
        const pitch = Math.sin(2 * Math.PI * 130 * i / audioContext.sampleRate) * decay;

        // Apply the pitch and envelope to the noise
        data[i] = (envelope + pitch) * decay;
      }
    }
    if(buffTest==6){
      for (let i = 0; i < bufferSize; i++) {

        // Envelope to shape the tom sound (fast attack, medium decay)
        const attack = Math.min(1, i / (audioContext.sampleRate * 0.02));  // Attack in 20ms
        const decay = Math.exp(-i / (audioContext.sampleRate * 0.3));     // Slower decay (300ms)
        const sustain = 0.2;  // Low sustain for tom decay

        // Combine attack, decay, and sustain to create the tom envelope
        const envelope = attack * decay * sustain;

        // Pitch modulation (tom sound has a low fundamental pitch)
        // Apply a sinusoidal tone at around 80-150Hz (typical for toms)
        const pitch = Math.sin(2 * Math.PI * 150 * i / audioContext.sampleRate) * decay;

        // Apply the pitch and envelope to the noise
        data[i] = (envelope + pitch) * decay;
      }
    }
    if(buffTest==7){ //snare

      const startFreq = 300;     // Starting frequency (higher for snare)
      const endFreq = 270;       // Slightly lower frequency for pitch decay
      const noiseDecayRate = 15; // Faster decay for the noise component
      const noiseAmp = 0.8;      // Amplitude of the noise component

      for (let i = 0; i < bufferSize; i++) {
           
        const t = i / audioContext.sampleRate;

        // Tonal component (sine wave)
        const freq = startFreq * Math.pow(endFreq / startFreq, t); // Exponential decay of pitch
        const sine = Math.sin(2 * Math.PI * freq * t);

        // White noise component (snare crackle)
        const noise = (Math.random() * 2 - 1); // White noise between -1 and 1

        // Amplitude envelope for the sine wave (quick decay)
        const amp = Math.exp(-t * 20); // Rapid decay for the tonal component

        // Amplitude envelope for the noise (faster decay)
        const noiseAmpEnvelope = Math.exp(-t * noiseDecayRate);

        // Combine sine and noise with their respective envelopes
        data[i] = (sine * amp) + (noise * noiseAmp * noiseAmpEnvelope);
      }
    }
  }
  if(vocal==1){ //voice samples
    if(buffTest==0){
      
        loadWavIntoBuffer("C3.wav", data)

    }
    if(buffTest==1){
      
       loadWavIntoBuffer("D3.wav", data)

    }
    if(buffTest==2){
      
       loadWavIntoBuffer("E3.wav", data)

    }
    if(buffTest==3){
      
       loadWavIntoBuffer("F3.wav", data)

    }
    if(buffTest==4){
      
       loadWavIntoBuffer("G3.wav", data)

    }
    if(buffTest==5){
      
       loadWavIntoBuffer("A3.wav", data)

    }
    if(buffTest==6){
      
       loadWavIntoBuffer("B3.wav", data)

    }
    if(buffTest==7){
      
       loadWavIntoBuffer("C4.wav", data)

    }
    if(buffTest==8){
      
       loadWavIntoBuffer("Cs3.wav", data)

    }
    if(buffTest==9){
      
       loadWavIntoBuffer("Ds3.wav", data)

    }
    if(buffTest==10){
      
       loadWavIntoBuffer("Fs3.wav", data)

    }
    if(buffTest==11){
      
       loadWavIntoBuffer("Gs3.wav", data)

    }
    if(buffTest==12){
      
       loadWavIntoBuffer("As3.wav", data)

    }
  }
  return buffer;
}

async function loadWavIntoBuffer(url, targetBuffer, envelope = {}) {
  const {
    attack = 0.1,   
    decay = 0.05,    
    sustain = 0.9, //sustain amplitude (0–1)
    release = 0.1,   
    sampleRate = audioContext.sampleRate
  } = envelope;

  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const decoded = await audioContext.decodeAudioData(arrayBuffer);
  const sourceData = decoded.getChannelData(0);

  const length = Math.min(targetBuffer.length, sourceData.length);

  // Convert times to samples
  const attackSamp  = Math.floor(attack  * sampleRate);
  const decaySamp   = Math.floor(decay   * sampleRate);
  const releaseSamp = Math.floor(release * sampleRate);

  const sustainStart = attackSamp + decaySamp;
  const releaseStart = length - releaseSamp;

  for (let i = 0; i < length; i++) {
    let amp = 1.0;

    if (i < attackSamp) {
      // A: ramp 0 → 1
      amp = i / attackSamp;
    } else if (i < sustainStart) {
      // D: ramp 1 → sustain
      const t = (i - attackSamp) / decaySamp;
      amp = 1 + (sustain - 1) * t;
    } else if (i < releaseStart) {
      // S: constant sustain
      amp = sustain;
    } else {
      // R: ramp sustain → 0
      const t = (i - releaseStart) / releaseSamp;
      amp = sustain * (1 - t);
    }

    targetBuffer[i] = sourceData[i] * amp;
  }

  return decoded;
}



//buffer controls
buffAcceso = 0;
setm.onclick = function createSoundBuffer() { //drumkit buffer
  if(acceso){
    buffAcceso = 1; //drumkit buffer selected
    vocal = 0; //vocal samples buffer selected (if==1)
    document.querySelector(".shift_pos3").textContent = "DRUM KIT"
    document.querySelector(".shift_pos2").textContent = "-----"
    oscillator.stop();
    transpose_status = 0
    shift = 1

  }
}

function Buffer() {
    if (bufferSource === null) {
        
         bufferSource = audioContext.createBufferSource();
         bufferGain = audioContext.createGain();
        
         bufferSource.buffer = createSoundBuffer();
         bufferSource.loop = false;
         bufferGain.gain.value = volume;
        
         bufferSource.connect(bufferGain);
         bufferGain.connect(audioContext.destination);
         
         bufferSource.start();
    }
}

vocal = 0;
setm2.onclick = function createSoundBuffer() { //voice samples buffer
  if(acceso){
    buffAcceso = 0; 
    vocal = 1; 
    document.querySelector(".shift_pos3").textContent = "VOICE"
    document.querySelector(".shift_pos2").textContent = "-----"
    oscillator.stop();
    transpose_status = 0
    shift = 1
  }
}

stopm.onclick = function (){ //return to oscillator
  if(acceso && buffAcceso==1){
    stopBuffer()
    f = 0
    oscillator = audioContext.createOscillator();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = f;
    oscillator.start();
    acceso = 1;
    buffAcceso = 0;
    vocal = 0;
    document.querySelector(".shift_pos3").textContent = "SINE"
    document.querySelector(".shift_pos2").textContent = "--o--"
    oscillator.type = "sine"
  }
  if(acceso && vocal==1){ 
    stopBuffer()
    f = 0
    oscillator = audioContext.createOscillator();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = f;
    oscillator.start();
    acceso = 1;
    buffAcceso = 0;
    vocal = 0;
    document.querySelector(".shift_pos3").textContent = "SINE"
    document.querySelector(".shift_pos2").textContent = "--o--"
    oscillator.type = "sine"
  }
}
 
function stopBuffer () { 
    if (bufferSource !== null) {
        bufferSource.stop();
        bufferSource = null;
    }
};


//volume control
  document.getElementById("vol_inc").onclick=
    function(){
     if(acceso){
        volume = Math.min(volume + 0.1, 1.0)
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        bufferGain.gain.setValueAtTime(volume, audioContext.currentTime);
     }
  }

  document.getElementById("vol_dec").onclick=
    function(){
     if(acceso){
        volume = Math.max(0.0, volume - 0.1)
        gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
        bufferGain.gain.setValueAtTime(volume, audioContext.currentTime);
     }
  }


