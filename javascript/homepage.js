var canvas_width, canvas_height;
var myFont;
var fontSize;
var textString;
var lerpCount;
var startColor, endColor, color;
var addAmount;
var textPosY;
var divPosY;
var divFontSize;

function preload(){
	myFont = loadFont('/media/fonts/BMblock.TTF');
}

function setup(){
	canvas_width = window.innerWidth;
	canvas_height = $("#main").height();
	divPosY = 150;
	cnv = createCanvas(canvas_width, canvas_height);
	cnv.position(0, 0);
	cnv.parent('main');
	background(255, 255, 255);
	div = createDiv('<a href="/gallery/">gallery</a><br><a href="/blog/">blog</a><br><a href="https://soundcloud.com/anniekelly">soundcloud</a><br><a href="/resume/">resume</a><br><a href="/contact/">contact</a><p style="color: #AD42F4;">Ƹ̵̡Ӝ̵̨̄Ʒ');
	div.position(0, divPosY);
	div.parent('main');
	startColor = color(173, 66, 244, 0.8 * 255); 
	endColor = color(255, 158, 48, 0.8 * 255);
	lerpCount = 0.0;
	addAmount = 0.02;
	fontSize = 120;
	textString = 'code witch';
	textPosY = 100;
	divFontSize = 50;
	resizeEverything();
}

function draw(){
  background(0);

  color = lerpColor(startColor, endColor, lerpCount);

  lerpCount += addAmount;
  if (lerpCount > 1.0 || lerpCount < 0){
  	addAmount *= -1;
  }

  fill(color);
  textFont(myFont);
  textSize(fontSize);
  text(textString, 10, textPosY);
}

function windowResized() {
	resizeEverything();
}

function resizeEverything(){
	canvas_width = window.innerWidth;
	divFontSize = 50;
	if (window.innerWidth >= 1130){
		fontSize = 120;
		textPosY = 110;
		divPosY = 150;
		textString = 'code witch';			
	}
	else if (window.innerWidth < 1130 && window.innerWidth >= 940){
		fontSize = 100;
		textPosY = 100;
		divPosY = 150;
		textString = 'code witch';			
	}
	else if (window.innerWidth < 940 && window.innerWidth >= 846){
		fontSize = 90;
		textPosY = 100;
		divPosY = 150;
		textString = 'code witch';			
	}
	else if (window.innerWidth < 846 && window.innerWidth >= 752){
		fontSize = 80;
		textPosY = 100;
		divPosY = 150;
		textString = 'code witch';			
	}
	else if (window.innerWidth < 752 && window.innerWidth >= 640){
		fontSize = 68;
		textPosY = 100;
		divPosY = 150;
		textString = 'code witch';		
	}	
	else if (window.innerWidth < 640 && window.innerWidth >= 474){
		fontSize = 68;
		textPosY = 80;
		divPosY = 200;
		textString = 'code\nwitch';

	}	
	else if (window.innerWidth < 474 && window.innerWidth >= 355){
		fontSize = 68;
		textPosY = 80;
		divPosY = 200;
		textString = 'code\nwitch';
	}	
	else if (window.innerWidth < 355 && window.innerWidth >= 300){
		fontSize = 60;
		textPosY = 80;
		divPosY = 180;
		divFontSize = 32;
		textString = 'code\nwitch';
	}
	else if (window.innerWidth < 300 && window.innerWidth >= 264){
		fontSize = 50;
		textPosY = 70;
		divPosY = 150;
		divFontSize = 24;
		textString = 'code\nwitch';
	}	
	else if (window.innerWidth < 264){
		fontSize = 32;
		textPosY = 50;
		divPosY = 110;
		divFontSize = 12;
		textString = 'code\nwitch';		
	}			
	canvas_height = divPosY;
	resizeCanvas(canvas_width, canvas_height);
	heightString = divPosY + "px";
	$("#main").css("height", heightString);
	$("#main").css("font-size", divFontSize);
	div.position(0, divPosY);	
}