var x = 0;
var y = 0;
var size = 200;
var xBoxSize = 20;

function setup(){
	canvas_width = jQuery(document).width();
	canvas_height = jQuery(document).height();
	cnv = createCanvas(canvas_width, canvas_height);
	cnv.position(0, 0);
	cnv.parent('sketch');
	background(255, 255, 255);
}

function draw(){
	x = mouseX;
	y = mouseY;
	fill(204, 204, 255);
	rect(x, y, 200, 200);
	fill(0, 102, 204);
	rect(x, y, 200, 20);
	fill(255, 51, 51);
	rect(x+200-20, y, 20, 20);	
	fill(255,255,255);
	text("Error!", x+5, y+15);
	fill(0);
	text("X", x+185, y+15);	
	text("What is the meaning of life?", x+25, y+100);
}
