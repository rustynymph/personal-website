var ketchupSystem, mustardSystem;
var hotdog, ketchup, mustard;
var rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'magenta'];
var i, counter;

function preload(){
  hotdog = loadImage("/images/hotdog.png");
  ketchup = loadImage("/images/ketchup.png");
  mustard = loadImage("/images/mustard.png");
}

function setup() {
  pCanvasHeight = canvas_height = window.innerHeight;
  pCanvasWidth = canvas_width = window.innerWidth;
  cnv = createCanvas(canvas_width, canvas_height);
  cnv.position(0, 0);
  cnv.parent('bbq');  

  i = 0;
  counter = 0;

  ketchup.resize(500, 700);
  mustard.resize(500, 700);
  hotdog.resize(700, 400);

  translate(canvas_width/2, canvas_height/2);
  ketchupSystem = new ParticleSystem(createVector(-400+120, -ketchup.height/2), 'red');
  mustardSystem = new ParticleSystem(createVector(400-120, -mustard.height/2), 'yellow');
}

function draw() {


  background(255);
  var bottleAngle = 30*PI/180;

  translate(canvas_width/2, canvas_height/2);
  image(hotdog, -hotdog.width/2, 0);
  rotate(bottleAngle);
  image(ketchup, -400-ketchup.width/2, -ketchup.height/4);
  rotate(-2 * bottleAngle);
  image(mustard, 400-mustard.width/2, -mustard.height/4);
  rotate(bottleAngle);
  ketchupSystem.addParticle();
  mustardSystem.addParticle();
  ketchupSystem.run();
  mustardSystem.run();   
}

// A simple Particle class
var Particle = function(position, color) {
  this.acceleration = createVector(0, 0.07);
  this.position = position.copy();
  this.lifespan = 255.0;
  this.color = color;
  if (this.color == 'red'){
    this.velocity = createVector(random(0, 1), random(-1, 0));
  } else {
    this.velocity = createVector(random(-1, 0), random(-1, 0));
  }

};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function(){
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  //image(hotdog, this.position.x, this.position.y, 25, 25);
  fill(this.color);
  noStroke();
  ellipse(this.position.x, this.position.y, 25, 25);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position, color) {
  this.origin = position.copy();
  this.particles = [];
  this.color = color;
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin, this.color));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length-1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

window.onresize = function() {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  resizeCanvas(canvas_width, canvas_height);  
}