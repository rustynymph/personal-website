/**
 *  Create a sequence using a Part with callbacks that play back soundfiles.
 *  The callback includes parameters (the value at that position in the Phrase array)
 *  as well as time, which should be used to schedule playback with precision.
 *  
 */
var BOX_SIZE = 50;
var NUM_BEATS = 8;
var phrases    = [];
var click, beatbox, kick, snare, hihat;
var clickPhrase = [0, 0, 0, 0, 0, 0, 0, 0];
var bboxPhrase = [0, 0, 0, 0, 0, 0, 0, 0];
var hiHatPhrase = [0, 0, 0, 0, 0, 0, 0, 0];
var kickPhrase = [0, 0, 0, 0, 0, 0, 0, 0];
var oscPhraseE4 = [0, 0, 0, 0, 0, 0, 0, 0];
var oscPhraseG4 = [0, 0, 0, 0, 0, 0, 0, 0];
var oscPhraseA4 = [0, 0, 0, 0, 0, 0, 0, 0];
var oscPhraseB4 = [0, 0, 0, 0, 0, 0, 0, 0];
var oscPhraseD5 = [0, 0, 0, 0, 0, 0, 0, 0];
var oscPhraseE5 = [0, 0, 0, 0, 0, 0, 0, 0];
var tracks     = {0: 'click',
                  1: 'hihat',
                  2: 'snare',
                  3: 'kick',
                  4: 'oscE4',
                  5: 'oscG4',
                  6: 'oscA4',
                  7: 'oscB4',
                  8: 'oscD5',
                  9: 'oscE5'};


var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;

var envE4, envG4, envA4, envB4, envD5, envE5;
var part; // a part we will loop

function preload() {
  soundFormats('mp3', 'ogg');
  click = loadSound('../../media/audio/drum');
  beatbox = loadSound('../../media/audio/beatbox');
  kick = loadSound('../../media/audio/kick.ogg');
  snare = loadSound('../../media/audio/snare.ogg');
  hihat = loadSound('../../media/audio/hh.ogg');

}

function setup() {
  canvas_width = jQuery(document).width();
  canvas_height = jQuery(document).height();
  cnv = createCanvas(canvas_width, canvas_height);
  cnv.position(0, 0);
  cnv.parent('game');

  envE4 = new p5.Env();
  envE4.setADSR(attackTime, decayTime, susPercent, releaseTime);
  envE4.setRange(attackLevel, releaseLevel);  
  envG4 = new p5.Env();
  envG4.setADSR(attackTime, decayTime, susPercent, releaseTime);
  envG4.setRange(attackLevel, releaseLevel);  
  envA4 = new p5.Env();
  envA4.setADSR(attackTime, decayTime, susPercent, releaseTime);
  envA4.setRange(attackLevel, releaseLevel);    
  envB4 = new p5.Env();
  envB4.setADSR(attackTime, decayTime, susPercent, releaseTime);
  envB4.setRange(attackLevel, releaseLevel);  
  envD5 = new p5.Env();
  envD5.setADSR(attackTime, decayTime, susPercent, releaseTime);
  envD5.setRange(attackLevel, releaseLevel);    
  envE5 = new p5.Env();
  envE5.setADSR(attackTime, decayTime, susPercent, releaseTime);
  envE5.setRange(attackLevel, releaseLevel);    

  oscE4 = new p5.Oscillator();
  oscE4.setType('sine');
  oscE4.freq(329.63);
  oscE4.amp(envE4);
  oscE4.start();

  oscG4 = new p5.Oscillator();
  oscG4.setType('sine');
  oscG4.freq(392.00);
  oscG4.amp(envG4);
  oscG4.start();

  oscA4 = new p5.Oscillator();
  oscA4.setType('sine');
  oscA4.freq(440.00);
  oscA4.amp(envA4);
  oscA4.start();

  oscB4 = new p5.Oscillator();
  oscB4.setType('sine');
  oscB4.freq(493.88);
  oscB4.amp(envB4);
  oscB4.start();

  oscD5 = new p5.Oscillator();
  oscD5.setType('sine');
  oscD5.freq(587.33);
  oscD5.amp(envD5); 
  oscD5.start();
  
  oscE5 = new p5.Oscillator();
  oscE5.setType('sine');
  oscE5.freq(659.25);
  oscE5.amp(envE5);     
  oscE5.start();

  // create a part with 8 spaces, where each space represents 1/16th note (default)
  part = new p5.Part(8, 1/8);

  // add phrases, with a name, a callback, and
  // an array of values that will be passed to the callback if > 0
  part.addPhrase('click', playClick, clickPhrase);
  part.addPhrase('hihat', playHiHat, hiHatPhrase);
  part.addPhrase('snare', playSnare, bboxPhrase);
  part.addPhrase('kick', playKick, kickPhrase);
  part.addPhrase('oscE4', playOscE4, oscPhraseE4);
  part.addPhrase('oscG4', playOscG4, oscPhraseG4);
  part.addPhrase('oscA4', playOscA4, oscPhraseA4);
  part.addPhrase('oscB4', playOscB4, oscPhraseB4);
  part.addPhrase('oscD5', playOscD5, oscPhraseD5);
  part.addPhrase('oscE5', playOscE5, oscPhraseE5);

  // set tempo (Beats Per Minute) of the part and tell it to loop
  part.setBPM(120);
  part.loop();

  for (var track in tracks){
    var phrase = new Phrase(track, tracks[track]);
    phrase.initBeats();
    phrases.push(phrase);    
  }

}

function playClick(time, params) {
  click.rate(params);
  click.play(time);
}

function playHiHat(time, params) {
  hihat.rate(params);
  hihat.play(time);
}


function playSnare(time, params) {
  snare.rate(params);
  snare.play(time);
}

function playKick(time, params) {
  kick.rate(params);
  kick.play(time);
}

function playOscE4(time, params) {
  envE4.play();
}

function playOscG4(time, params) {
  envG4.play();
}

function playOscA4(time, params) {
  envA4.play();
}

function playOscB4(time, params) {
  envB4.play();
}

function playOscD5(time, params) {
  envD5.play();
}

function playOscE5(time, params) {
  envE5.play();
}

// draw a ball mapped to current note height
function draw() {
  clear();
  background(0);
  for (var p = 0; p < phrases.length; p++){
    var phrase = phrases[p];
    phrase.display();
    part.replaceSequence(tracks[phrase.track], phrase.sequence());
  }
}

function mouseClicked() {
  for (var i = 0; i < phrases.length; i++){
    var beats = phrases[i].beats;
    for (var j = 0; j < beats.length; j++){
      var beat = beats[j];
      if (beat.hover()){
        beat.toggleActive();
        return;
      } 
    }
  }
}

function Phrase(track, sound) {
  this.track = track;
  this.sound = sound;
  this.beats = [];

  this.initBeats = function () {
    for (var b = 0; b < NUM_BEATS; b++){
      var bbox = new BeatBox(this.track, b);
      this.beats.push(bbox);
    }
  }

  this.display = function() {
    for (var b = 0; b < this.beats.length; b++)
      this.beats[b].display();
  }

  this.sequence = function() {
    var seq = [];
    for (var b = 0; b < this.beats.length; b++){
      var beat = this.beats[b];
      if (beat.active) seq.push(1);
      else seq.push(0);
    }
    return seq;
  }

}

function BeatBox(track, beat) {
  this.track  = track;
  this.beat   = beat;
  this.x      = this.beat  * BOX_SIZE * 1.2;
  this.y      = this.track * BOX_SIZE * 1.2;
  this.active = false;
  this.phrase = tracks[this.track];

  this.display = function() {
    fill(255, 255, 255);
    if (this.active) fill(255, 0, 0);
    rect(this.x, this.y, BOX_SIZE, BOX_SIZE);
  }

  this.hover = function () {
    if ((mouseX >= this.x) && (mouseX <= this.x + BOX_SIZE)
      && (mouseY >= this.y) && (mouseY <= this.y + BOX_SIZE)){
        return true;
    }
    return false;
  }

  this.toggleActive = function () {
    console.log("toggle active");
    this.active = !this.active;
  }

}

// UI 
var hDiv = 2;
var wDiv = 16;