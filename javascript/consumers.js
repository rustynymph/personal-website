var burger;
var tvperson;
var consume, consume2, consume3, consume4;

function preload(){
  burger   = loadModel('/models/burger.obj'); 
  tvperson = createImg("/images/tvsad.gif");
  consume  = createImg("/images/consume.gif");
  //consume2 = createImg("/images/consume.gif");
  //consume3 = createImg("/images/consume.gif");
  //consume4 = createImg("/images/consume.gif");
}

function setup(){
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  cnv = createCanvas(canvas_width,canvas_height,WEBGL);
  cnv.position(0, 0);
  cnv.parent('consumers');  	
  tvperson.position((canvas_width/2)-(tvperson.width/2), (canvas_height/2)-(tvperson.height/2));
  consume.position((canvas_width/2)-(consume.width/2), tvperson.position.y-200);
  //consume.position(300,canvas_height-300);
  //consume3.position(300, 300);
  //consume2.position(canvas_width-300, 300);
  //consume4.position(canvas_width-300, canvas_height-300);
}

function draw(){
  translate(0, 0, 500);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  normalMaterial();
  model(burger);    
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);  
  model(burger);
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);        
  model(burger);  
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);      
  model(burger);   
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);   
  model(burger);   
}

window.onresize = function() {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  resizeCanvas(canvas_width, canvas_height);	
  tvperson.position((canvas_width/2)-(tvperson.width/2), (canvas_height/2)-(tvperson.height/2));
  consume.position((canvas_width/2)-(consume.width/2), tvperson.position.y-200);
}
