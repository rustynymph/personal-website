var diamonds = [];
var num_diamonds;
var row_len;
var indices = [];
var palette;

function setup(){
	num_diamonds = 240;
	row_len = 15;
	createCanvas(1500,900);
	background(0);
	smooth(2);
	stroke(0);
	palette = [color('#400080'), color('#5900b3'), color('#7200e6'), color('#8b1aff'), color('#9833ff'), color('#a54dff'), color('#b266ff'), color('#bf80ff'), color('#cc99ff'), color('#d9b3ff'), color('#f2e5ff')];
	var size = 50;
	var x_povar = 0;
	var y_povar = 0;

	var i = 0;
	var c = 0;
	var index;
	while (i < num_diamonds){
		if (c == row_len){
			c = 0;
			x_povar = 0;
			y_povar = y_povar + 80;
		}
		diamonds.push(new Diamond(x_povar, y_povar + 20, x_povar + size, y_povar - 20, x_povar + 2*size, y_povar + 20, x_povar + size, y_povar + 60, x_povar, y_povar + 20, color('#FFFFFF')));
		x_povar = x_povar + 100;
		i++;
		c++;
	}

  var k;
  var dis = [];
  var offset;
  var mult;
  var d;
  for (var j = 0; j < row_len; j++){
  	  k = j;
  	  if (j == 0){
  	  	indices.push([0]);
  	  }
  	  else{
  	  	dis = [];
  	  	mult = 1;
  	  	dis.push(k);
	  	  while(k > 0){
	  	  	d = row_len * mult;
	  	  	offset = (d-1) + (k-1);
	  	  	dis.push(offset);
	  	  	mult++;
	  	  	k--;
	  	  }
		  indices.push(dis);
	}
  }

  for (var q = 0; q < indices.length; q++){
  	console.log(indices[q]);
}	
}

function draw(){
  clear();
  var color_index;

/*
  for (var i = 0; i < num_diamonds; i++) {
		//di.c = palette2[color_index];
		diamonds[i].c = color('#fc6c85');
		diamonds[i].display();
  }*/
  			var blah;

	for (var i = 0; i < indices.length; i++){
		for (var j = 0; j < indices[i].length; j++){
		diamonds[indices[i][j]].c = palette[0];
		diamonds[indices[i][j]].display();					
		}
	}

}


function Diamond(x_1, y_1, x_2, y_2, x_3, y_3, x_4, y_4, x_5, y_5, col){

	var index;
	this.x1 = x_1;
	this.x2 = x_2;
	this.x3 = x_3;
	this.x4 = x_4;
	this.x5 = x_5;
	this.y1 = y_1;
	this.y2 = y_2;
	this.y3 = y_3;
	this.y4 = y_4;
	this.y5 = y_5;
	this.c = col;		
}

Diamond.prototype.display = function(){
	beginShape();
	fill(this.c);
	vertex(this.x1, this.y1);
	vertex(this.x2, this.y2);
	vertex(this.x3, this.y3);
	vertex(this.x4, this.y4);
	vertex(this.x5, this.y5);
	endShape(CLOSE);		
};