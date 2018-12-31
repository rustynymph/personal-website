var player;
var education, skills, experience, interests;
var educationImg, skillsImg, experienceImg, interestsImg;
var rarrow, larrow;
var r, g, b;
var canvas_height;
var canvas_width;
var font_size;
var box_size;
var cnv;


function preload(){
	educationImg = loadImage('../images/education.png');
	experienceImg = loadImage('../images/experience.png');
	skillsImg = loadImage('../images/skills.png');
	interestsImg = loadImage('../images/interests.png');
}

function setup(){
	canvas_height = findHeightOffset();
	canvas_width = jQuery(document).width();
	cnv = createCanvas(canvas_width, canvas_height);
	cnv.position(0, 0);
	cnv.parent('resume');
	r = 51;
	g = 0;
	b = 102;
	background(r, g, b);
	font_size = findFontSize();
	box_size = 800;

	educationImg.resize(227, 30);
	skillsImg.resize(143, 30);
	experienceImg.resize(257, 30);
	interestsImg.resize(223, 30);	

	education = new Section(educationImg, [">> PhD Student Technology, Media, and Society @ CU Boulder", ">> BS Computer Science @ CU Boulder '16"], 10, canvas_height-40, 70, 80, '#FF8000', font_size);
	skills = new Section(skillsImg, [">> Programming", ">> Web dev", ">> Computer music", ">> Machine learning", ">> Virtual reality" ,">> Electronics", ">> Design"], canvas_width/4, canvas_height-40, 70, 180, '#00CC00', font_size);
	experience = new Section(experienceImg, [">> PhD Intern @ Microsoft Research 6/17-now" ,">> Lab for Playful Computation 10/15-now", ">> Seagate Technology 5/15-10/15"], 2*canvas_width/4, canvas_height-40, 70, 80, '#0080FF', font_size);
	interests = new Section(interestsImg, [">> Audio visualization", ">> Bass guitar", ">> Hair dye"], 3*canvas_width/4, canvas_height-40, 70, 80, '#FF007F', font_size);
	rarrow = new RightArrow();
	larrow = new LeftArrow();
	player = new Player();
}

function draw(){
	clear();
	background(r, g, b);
	if (keyIsDown(LEFT_ARROW)){
	  player.direction = -1;
  	  player.moveX(-5);
	}
	if (keyIsDown(RIGHT_ARROW)){
	  player.direction = 1;
  	  player.moveX(5);		
	}
	education.display();
	skills.display();
	experience.display();
	interests.display();
	rarrow.display();
	larrow.display();
	player.display();
	checkCollision();
}

function RightArrow(){
	this.test = 0;
}

function LeftArrow(){
	this.test = 0;
}

RightArrow.prototype.display = function() {
	fill(255, 255, 255);
	noStroke();
	rect(70, 120, 30, 20);
	triangle(100, 105, 120, 130, 100, 155);
};

LeftArrow.prototype.display = function() {
	fill(255, 255, 255);
	noStroke();
	rect(30, 120, 30, 20);
	triangle(30, 105, 10, 130, 30, 155);
};

function Section(img, msg, x, y, w, h, outline, size){
	this.img = img;
	this.msg = msg;
	this.x = x;
	this.y = y;
	this.w = this.img.width;
	this.h = this.img.height;
}

Section.prototype.display = function() {
	image(this.img, this.x, this.y);
}

function Player(){
	this.x = 0;
	this.y = height;
	this.direction = 1;
}

Player.prototype.display = function() {
	noStroke();
	var skinColor = color(255, 204, 153);
	var hairColor = color(255, 0, 127);
	var lipColor = color(153, 0, 153);
	var dressColor = 0;
	var shoeColor = 0;
	var eyeColor = 0;

	if (this.direction == 1){
		/* hair */
		fill(hairColor);
		rect(this.x+2, this.y-83, 10, 45); 
		rect(this.x+15, this.y-99, 55, 24);
		rect(this.x+70, this.y-96, 2, 21);
		rect(this.x+72, this.y-92, 3, 17);
		rect(this.x+10, this.y-90, 23, 52);
		rect(this.x+52, this.y-43, 20, 7);

		/* shoes */
		fill(shoeColor);
		rect(this.x+25, this.y-5, 10, 5);
		rect(this.x+40, this.y-5, 10, 5);

		/* dress */
		fill(dressColor);
		rect(this.x+21, this.y-43, 31, 31);
		rect(this.x+52, this.y-28, 2, 8);
		rect(this.x+52, this.y-20, 3, 8);
		rect(this.x+19, this.y-28, 2, 8);
		rect(this.x+18, this.y-20, 3, 8);

		/* legs */
		fill(skinColor);
		rect(this.x+25, this.y-12, 10, 7);
		rect(this.x+40, this.y-12, 10, 7);

		/* arms */
		rect(this.x+52, this.y-36, 5, 5);
		rect(this.x+54, this.y-31, 5, 5);
		rect(this.x+16, this.y-36, 5, 5);
		rect(this.x+11, this.y-31, 5, 5);


		/* head */
		rect(this.x+32, this.y-75, 40, 32);
		rect(this.x+38, this.y-80, 5, 5);
		rect(this.x+22, this.y-60, 10, 17);
		rect(this.x+17, this.y-68, 5, 12);

		/* lips */
		fill(lipColor);
		rect(this.x+55, this.y-55, 6, 6);

		/* eyes */
		fill(eyeColor);
		rect(this.x+45, this.y-65, 7, 7);
		rect(this.x+65, this.y-65, 7, 7);

		/* lashes */
		rect(this.x+44, this.y-67, 2, 2);
		rect(this.x+48, this.y-67, 2, 2);
		rect(this.x+51, this.y-67, 2, 2);
		rect(this.x+64, this.y-67, 2, 2);
		rect(this.x+67, this.y-67, 2, 2);
		rect(this.x+70, this.y-67, 2, 2);		
	}
	else{
		/* hair */
		fill(hairColor);
		rect(this.x+60, this.y-83, 10, 45); 
		rect(this.x+2, this.y-99, 55, 24);
		rect(this.x, this.y-96, 2, 21);
		rect(this.x+3, this.y-92, 3, 17);
		rect(this.x+39, this.y-90, 23, 52);
		rect(this.x, this.y-43, 20, 7);

		/* shoes */
		fill(shoeColor);
		rect(this.x+37, this.y-5, 10, 5);
		rect(this.x+22, this.y-5, 10, 5);

		/* dress */
		fill(dressColor);
		rect(this.x+20, this.y-43, 31, 31);
		rect(this.x+18, this.y-28, 2, 8);
		rect(this.x+17, this.y-20, 3, 8);
		rect(this.x+51, this.y-28, 2, 8);
		rect(this.x+51, this.y-20, 3, 8);

		/* legs */
		fill(skinColor);
		rect(this.x+37, this.y-12, 10, 7);
		rect(this.x+22, this.y-12, 10, 7);

		/* arms */
		rect(this.x+15, this.y-36, 5, 5);
		rect(this.x+13, this.y-31, 5, 5);
		rect(this.x+51, this.y-36, 5, 5);
		rect(this.x+56, this.y-31, 5, 5);


		/* head */
		rect(this.x, this.y-75, 40, 32);
		rect(this.x+29, this.y-80, 5, 5);
		rect(this.x+40, this.y-60, 10, 17);
		rect(this.x+50, this.y-68, 5, 12);

		/* lips */
		fill(lipColor);
		rect(this.x+11, this.y-55, 6, 6);

		/* eyes */
		fill(eyeColor);
		rect(this.x+20, this.y-65, 7, 7);
		rect(this.x, this.y-65, 7, 7);

		/* lashes */
		rect(this.x+72-46, this.y-67, 2, 2);
		rect(this.x+22, this.y-67, 2, 2);
		rect(this.x+19, this.y-67, 2, 2);
		rect(this.x+6, this.y-67, 2, 2);
		rect(this.x+3, this.y-67, 2, 2);
		rect(this.x, this.y-67, 2, 2);			
	}

};

Player.prototype.moveX = function(x_spaces){
	var result = this.x + x_spaces;
	if (result > width){
		this.x = 0;
	}
	else if (result < -72){ //player is fully off side of screen
		this.x = width - 72;
	}
	else{
		this.x = this.x + x_spaces;
	}
};

Player.prototype.moveY = function(y_spaces){
	var result = this.y + y_spaces;
	if (result <= height && result >= 99){
		this.y = this.y + y_spaces;
	}
};


function checkCollision(){

	if ( (player.direction == 1) && (player.x+72 >= education.x) && (player.x <= education.x+education.w) ){
		displaySectionInfo(education);
	} else if (player.direction == -1 && player.x-72 <= education.x+education.w && player.x >= education.x ){
		displaySectionInfo(education);
	} else if (player.direction == 1 && player.x+72 >= skills.x && player.x <= skills.x+skills.w ){
		displaySectionInfo(skills);
	} else if (player.direction == -1 && player.x-72 <= skills.x+skills.w && player.x >= skills.x ){
		displaySectionInfo(skills);
	} else if (player.direction == 1 && player.x+72 >= experience.x && player.x <= experience.x+experience.w ){
		displaySectionInfo(experience);
	} else if (player.direction == -1 && player.x-72 <= experience.x+experience.w && player.x >= experience.x ){
		displaySectionInfo(experience);
	} else if (player.direction == 1 && player.x+72 >= interests.x && player.x <= interests.x+interests.w ){
		displaySectionInfo(interests);
	} else if (player.direction == -1 && player.x-72 <= interests.x+interests.w && player.x >= interests.x ){
		displaySectionInfo(interests);
	}
}

function displaySectionInfo(section){
	fill(255, 255, 255);
	textSize(font_size);
	var height_offset = 0;

	for (var i = 0; i < section.msg.length; i++){
		text(section.msg[i], width/4, height_offset, box_size, 300);
		height_offset = height_offset + font_size;
	}
}

function keyPressed() {
  /* else if (keyCode == UP_ARROW) {
  	player.moveY(-5);
  } else if (keyCode == DOWN_ARROW) {
  	player.moveY(5);
  }*/
}

function findFontSize(){
	var width = jQuery(document).width();
	var font;
	if ( width >= 1283 ) { //large css
		font = 20;
	} else if ( width < 1283 && width >= 977){ //medium css
		font = 15;
	} else if ( width < 977 && width >= 495){ //small css
		font = 12;		
	} else if ( width < 495 ){ //narrow css
		font = 10;		
	}
	return font;
}

function findHeightOffset(){
	var height = jQuery(document).height(); //default
	var width = jQuery(document).width();
	if ( width >= 1283 ) { //large css
		height = height-70;
	} else if ( width < 1283 && width >= 977){ //medium css
		height = height-70;		
	} else if ( width < 977 && width >= 495){ //small css
		height = height-110;		
	} else if ( width < 495 ){ //narrow css
		height = height-145;		
	}
	return height;
}

function windowResized() {
	canvas_height = jQuery(document).height();
	canvas_width = jQuery(document).width();
	if ( canvas_width >= 1283 ) { //large css
		canvas_height = canvas_height-70;
		font_size = 30;
		box_size = 800;
	} else if ( canvas_width < 1283 && canvas_width >= 977){ //medium css
		canvas_height = canvas_height-70;
		font_size = 20;
		box_size = 500;	
	} else if ( canvas_width < 977 && canvas_width >= 495){ //small css
		canvas_height = canvas_height-110;
		font_size = 20;
		box_size = 500;	
	} else if ( canvas_width < 495 ){ //narrow css
		canvas_height = canvas_height-145;
		font_size = 10;
		box_size = 150;	
	}
	resizeCanvas(canvas_width, canvas_height);		
	education.x = 0;
	skills.x = canvas_width/4;
	experience.x = 2 * canvas_width/4;
	interests.x = 3 * canvas_width/4;		
	cnv.position(0, 0);
	var newHeight = canvas_height-40; //new height of the player avatar
	education.y = newHeight;
	skills.y = newHeight;
	experience.y = newHeight;
	interests.y = newHeight;
	var movePlayerY = canvas_height - player.y;
	player.moveY(movePlayerY);
}

function mousePressed() {
  if (mouseY <= 155 && mouseY >= 105){
  	if (mouseX >= 10 && mouseX <= 60 ){
  		if (player.direction == -1){
	    	player.moveX(-20);
  		}
  		else{
	  		player.direction = -1;
  		}

  	} else if (mouseX >= 70 && mouseX <= 120){
  		if (player.direction == 1){
	   		player.moveX(20);
  		}
  		else{
	 	 	player.direction = 1;
  		}
  	}
  }
  
 }