var noiseScale=0.02;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('container');
}

function draw() {
  background(0);
  for (var x=0; x < width; x++) {
    var noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    stroke(noiseVal*150, 25);
    line(x, 0, x, height);
  }
}