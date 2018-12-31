var system;
var sparkle;
var clouds;
var volcano;
var volcanoTop, cloudsTop;

function preload(){
  sparkle = loadImage("/images/particles/sparkle.png");
  clouds = createImg("/images/cloudanim.gif");
  volcano = createImg("/images/volcano.png");  
}

function setup() {
  pCanvasHeight = canvas_height = window.innerHeight;
  pCanvasWidth = canvas_width = window.innerWidth;
  cnv = createCanvas(canvas_width, canvas_height);
  cnv.position(0, 0);
  cnv.parent('volcano');  

  if (canvas_width < 575 || canvas_height < 565){
    volcano.resize(575, 300);
  }

  translate(canvas_width/2, canvas_height/2);
  volcanoTop = canvas_height/2-volcano.height;
  system = new ParticleSystem(createVector(0, volcanoTop-30));

  cloudsTop = volcanoTop-clouds.height;
  clouds.position(-clouds.width/2, cloudsTop);
  volcano.position(-volcano.width/2, volcanoTop);  
}

function draw() {
  background(0);
  translate(canvas_width/2, canvas_height/2);
  system.addParticle();
  system.run();
}

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = createVector(random(-1, 1), random(-1, 0));
  this.position = position.copy();
  this.lifespan = 255.0;
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
  image(sparkle, this.position.x, this.position.y, 25, 25);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
  if (this.lifespan < 0) {
    return true;
  } else {
    return false;
  }
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
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
  var diffH = canvas_height - pCanvasHeight;
  if (diffH != 0){
    for (var i = system.particles.length-1; i >= 0; i--) {
      system.particles[i].position.y -= diffH;
    }    
  }
}