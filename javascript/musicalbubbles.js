var pulseOsc;
var env;

var attackTime = 0.001;
var sustainTime = 0.003;
var sustainLevel = 0.1;
var releaseTime = 0.15;
var notes = [220.0, 261.63, 293.66, 329.63, 392.00, 440.0];

var size, xspeed, yspeed, accX, accY;

var bubbles = [];
var bubble;

var cnv;


function setup() {
  canvas_height = jQuery(document).height();
  canvas_width = jQuery(document).width();
  cnv = createCanvas(canvas_width, canvas_height);
  cnv.position(0, 0);
  cnv.parent('bubbles');
  background(255);
  

  // Create the envelope 
  env  = new p5.Env();
  env.setADSR(attackTime, sustainTime, sustainLevel, releaseTime);

  pulseOsc = new p5.Oscillator();
  pulseOsc.setType('sine');
  pulseOsc.amp(env);
  pulseOsc.start();
}      

function draw() {
  background(255);
  for (var i = 0; i < bubbles.length(); i++){
    bubble = bubbles[i];
    fill(bubble.col);
    ellipse(bubble.xPos, bubble.yPos, bubble.size, bubble.size);
    bubble.xPos += bubble.xSpeed*bubble.xAcc;
    bubble.yPos += bubble.ySpeed*bubble.yAcc;
    var radius = bubble.size/2;
    if(bubble.xPos+radius >= width || bubble.xPos-radius <= 0){
      bubble.xAcc *=  -1;
      triOsc.freq(notes[map(bubble.size, 10, 100, 5, 0)]);
      env.play();
      env.play(triOsc, attackTime, sustainTime, sustainLevel, releaseTime);      
    }
    if (bubble.yPos+radius >= height || bubble.yPos-radius <= 0){
      bubble.yAcc *= -1;
      pulseOsc.freq(notes[map(bubble.size, 10, 100, 5, 0)]);
      pulseOsc.play();
      env.play(pulseOsc, attackTime, sustainTime, sustainLevel, releaseTime);      
    }
      
  }
}

function mousePressed() {
  var randomXAcc = random(0, 1);
  var randomYAcc = random(0, 1);
  if (randomXAcc > .5){
    accX = 1;
  } else{
    accX = -1;
  }
  if (randomYAcc > .5){
    accY = 1;
  } else{
    accY = -1;
  }
  size = random(10,100);
  xspeed = random(3, 6);
  yspeed = random(3, 6);
  bubbles.add(new Bubble(mouseX, mouseY, size, xspeed, yspeed, accX, accY));
}

function keyPressed(){
  switch(keyCode){
    case 'c':
      bubbles.clear();
    case 'C':
      bubbles.clear(); 
    case ' ':
      bubbles.clear();      
  }
}

function windowResized() {
  canvas_height = jQuery(document).height();
  canvas_width = jQuery(document).width();
  resizeCanvas(canvas_width, canvas_height);
}

function Bubble(x, y, s, xS, yS, ax, ay){
    this.xPos = x;
    this.yPos = y;
    this.size = s;
    this.xSpeed = xS;
    this.ySpeed = yS;
    this.xAcc = ax;
    this.yAcc = ay;
    this.col = color(random(0,255), random(0,255), random(0,255));
}