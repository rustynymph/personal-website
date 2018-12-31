var curves = [];
var numCurves = 15;
var lerpAmount;
var colors = [];
var red, red2, yellow, green, blue, magenta;
var color1, color2;
var fill;

function setup(){
	canvas_height = window.innerHeight;
	canvas_width = window.innerWidth;
	cnv = createCanvas(canvas_width, canvas_height);
	cnv.position(0, 0);
	cnv.parent('curves');

	for (var i = 0; i < numCurves; i++){
		curves.push(new BezierCurve());
	}

	colors.push(color('hsla(0, 80%, 50%, 0.10)'));
	colors.push(color('hsla(55, 80%, 50%, 0.10)'));
	colors.push(color('hsla(120, 80%, 50%, 0.10)'));
	colors.push(color('hsla(230, 80%, 50%, 0.10)'));
	colors.push(color('hsla(295, 80%, 50%, 0.10)'));
	colors.push(color('hsla(360, 80%, 50%, 0.10)'));
	lerpAmount = 0.0;
	colorIndex1 = 0;
	colorIndex2 = 1;
}

function draw(){
	translate(canvas_width/2, canvas_height/2);
	//background(0);
	smooth();
	stroke('rgba(100%,100%,100%,0.25)');
	fill(updateColor());
	for (var i = 0; i < numCurves; i++){
		curves[i].update();
		curves[i].display();
	}
	
}

window.onresize = function() {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  resizeCanvas(canvas_width, canvas_height);  
}

function BezierCurve(){
	this.ap1 = {x: 0, y: 0};
	this.ap2 = {x: 0, y: 0};
	this.cp1 = {x: 0, y: 0};
	this.cp2 = {x: 0, y: 0};
	this.cp1.x = random(-canvas_width/2, canvas_width/2);
	this.cp1.y = random(-canvas_height/2, canvas_height/2);		
}

BezierCurve.prototype.display = function() {
	bezier(this.ap1.x, this.ap1.y, this.cp1.x, this.cp1.y, this.cp2.x, this.cp2.y, this.ap2.x, this.ap2.y);
}

BezierCurve.prototype.update = function() {
	this.ap2.x = mouseX - canvas_width/2;
	this.ap2.y = mouseY - canvas_height/2;	
}

function updateColor(){
	colorMode(HSB);  // Try changing to HSB.
	interA = lerpColor(colors[colorIndex1], colors[colorIndex2], lerpAmount);	
	lerpAmount = lerpAmount + 0.01;
	if (lerpAmount >= 1) {
		lerpAmount = 0;
		colorIndex1++;
		colorIndex2++;
		if (colorIndex2 == colors.length){
			colorIndex1 = 0;
			colorIndex2 = 1;
		}
	}
	return interA;	
}