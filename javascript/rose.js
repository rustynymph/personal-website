var radians;
var k;
var petal_length;
var coordinates = [];
var cool, warm, sea, funky;
colors = [];
var activeColor, colorIndex;
var started = false;
var clickedOnce = false;
var currentTime, pastTime;

function setup() {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  cnv = createCanvas(canvas_width, canvas_height);
  cnv.position(0, 0);
  cnv.parent('rose');

  currentTime = pastTime = 0;

  cool = new ColorPalette(0, 255, 28, 250, 244, 244);
  warm = new ColorPalette(229, 229, 38, 213, 38, 146);
  sea = new ColorPalette(65, 244, 229, 244, 66, 238);
  funky = new RainbowColorPalette();
  colors.push(cool);
  colors.push(warm);
  colors.push(sea);
  colors.push(funky);
  colorIndex = 0;
  activeColor = colors[colorIndex];

  petal_length = 100;  
  k = 2;
  for (var d = 0; d <= 360; d++){
    radians = d * (PI/180);
    coordinates.push(new Coordinate(k, radians));
  }
}

function draw() {
    translate(canvas_width/2, canvas_height/2);
    if (!started){
      background(0);
      fill(255);
      textSize(15);
      text("Press SPACE or double click to clear screen & switch colors", -250, -20);
      text("Move your mouse to change parameters of the paint brush", -250, 0);
      text("Press SPACE or double click to begin", -250, 20);
    }
    currentTime = millis();
    if (currentTime - pastTime > 1000){
      pastTime = currentTime;
      clickedOnce = false;
    }

}

window.onresize = function() {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  resizeCanvas(canvas_width, canvas_height);  
}

var ColorPalette = function(r1, r2, g1, g2, b1, b2){
  this.rMin = r1;
  this.rMax = r2;
  this.gMin = g1;
  this.gMax = g2;
  this.bMin = b1;
  this.bMax = b2;
}

var RainbowColorPalette = function(){
}


var Coordinate = function(k, theta) {
  this.x = petal_length * cos(k*theta) * cos(theta);
  this.y = petal_length * cos(k*theta) * sin(theta);
  this.theta = theta;
  this.radius = 10;
};

Coordinate.prototype.display = function(c) {
  fill(c);
  ellipse(this.x, this.y, this.radius, this.radius);
};

Coordinate.prototype.update = function() {
  this.x = petal_length * cos(k*this.theta) * cos(this.theta);
  this.y = petal_length * cos(k*this.theta) * sin(this.theta);
  if (k == 2){
    this.radius = 15;
  } else {
    this.radius = 10;
  }
};


function drawRose(){
  var fill = findFillColor();
  for (var c = 0; c < coordinates.length; c++){
    coordinates[c].display(fill);
  }
}

function findFillColor(){
  if (activeColor == funky){
    var r, g, b, lowColor, fullColor, indicator;
    lowColor = round(random(0, 2));
    fullColor = round(random(0, 2));
    randomColorValue = random(0, 255);
    indicator = lowColor + fullColor;
    if (fullColor == lowColor){
      if (fullColor == 2){
        fullColor = 0;
      } else{
        fullColor++;
      }
    }
    if (indicator == 1){
      b = randomColorValue;
      if (lowColor == 0){
        r = 35;
        g = 255;
      } else {
        r = 255;
        g = 35;
      }
    }
    else if (indicator == 2){
      g = randomColorValue;
      if (lowColor == 0){
        r = 35;
        b = 255;
      } else {
        r = 255;
        b = 35;
      }
    }
    else {
      r = randomColorValue;
      if (lowColor == 1){
        g = 35;
        b = 255;
      } else {
        g = 255;
        b = 35;
      }
    }
    return color(r, g, b);
  } else{
    return color(random(activeColor.rMin,activeColor.rMax), random(activeColor.gMin,activeColor.gMax), random(activeColor.bMin,activeColor.bMax));
  }
}

function keyPressed() {
  if (keyCode == 32){
    if (!started){
      background(0);
      started = true;
    } else{
      background(0);
      colorIndex++;
      if (colorIndex % 4 == 0){
        colorIndex = 0;
      }
      activeColor = colors[colorIndex];      
    }
  }
}

// painting for web
function mouseMoved() {
  if (started){
    petal_length = round(map(mouseY, 0, canvas_height, 100, canvas_height));
    k = map(mouseX, 0, canvas_width, 2, 10);
    for (var c = 0; c < coordinates.length; c++){
      coordinates[c].update();
    }
    drawRose();    
  }
}

// painting for mobile
function mouseDragged(){
  if (started && mobile){
    petal_length = round(map(mouseY, 0, canvas_height, 100, canvas_height));
    k = map(mouseX, 0, canvas_width, 2, 10);
    for (var c = 0; c < coordinates.length; c++){
      coordinates[c].update();
    }
    drawRose();    
  }
}

function mousePressed(){
  if (clickedOnce){
      clickedOnce = false;
      if (started){
        background(0);
        colorIndex++;
        if (colorIndex % 4 == 0){
          colorIndex = 0;
        }
        activeColor = colors[colorIndex];    
      } else {
        background(0);
        started = true;
      }   
    } else {
      clickedOnce = true;
    }
  return false;
}