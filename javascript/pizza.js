var osc;

var pizza;
var pepperoni;
var mushroom;
var pepperoniIcon;
var mushroomIcon;
var toppings = [];
var selectedTopping = null;
var pizzaRadius;

var newMouseX, newMouseY;

function preload(){
  pizza = loadImage('/images/pizza.png');
  pepperoni = loadImage('/images/pepperoni.png');
  mushroom = loadImage('/images/mushroom.png');
}

function setup(){
  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(240);
  osc.amp(0);
  osc.start(); 

  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  cnv = createCanvas(canvas_width,canvas_height);
  cnv.position(0, 0);
  cnv.parent('pizza');

  if (canvas_width < 575 || canvas_height < 565){
    pizza.resize(300, 300);
    mushroom.resize(50, 50);
    pepperoni.resize(50, 50);
  }
  else {
    pizza.resize(600, 600);
    mushroom.resize(100, 100);
  }
  pepperoniIcon = new Pepperoni(-canvas_width/2, -canvas_height/2);   
  mushroomIcon = new Mushroom(-canvas_width/2, -canvas_height/2+pepperoni.height);  	
  pizzaRadius = pizza.width/2; 
}

function draw(){
  translate(canvas_width/2, canvas_height/2);
  background(0);
  image(pizza, 0-pizza.width/2, 0-pizza.height/2); 
  fill(150);
  rect(-canvas_width/2, -canvas_height/2, mushroom.width, pepperoni.height+mushroom.height);
  pepperoniIcon.x = -canvas_width/2;
  pepperoniIcon.y = -canvas_height/2;
  mushroomIcon.x = -canvas_width/2;
  mushroomIcon.y = -canvas_height/2+pepperoni.height;  
  pepperoniIcon.display();
  mushroomIcon.display();
  displayToppings();  
}

window.onresize = function() {
  canvas_height = window.innerHeight;
  canvas_width = window.innerWidth;
  resizeCanvas(canvas_width, canvas_height);	
}

function displayToppings(){
  for (var i = 0; i < toppings.length; i++){
    toppings[i].update();
    toppings[i].display();
  }
}

var Topping = function(x, y, img) {
  this.x = x;
  this.y = y;
  this.img = img;
  this.selected = false;
  this.dragged = false;
};

Topping.prototype.update = function() {
  if (this.dragged == true){
    newMouseX = mouseX - canvas_width/2;
    newMouseY = mouseY - canvas_height/2;    
    this.x = newMouseX-this.img.width/2;
    this.y = newMouseY-this.img.height/2;
  }
}

Topping.prototype.mouseOnTopping = function() {
  newMouseX = mouseX - canvas_width/2;
  newMouseY = mouseY - canvas_height/2;
  if (newMouseX >= this.x && newMouseX <= this.x+this.img.width
            && newMouseY >= this.y && newMouseY <= this.y+this.img.height){
      return true;
    } else{
      return false;
    }  
}

Topping.prototype.display = function() {
  image(this.img, this.x, this.y);
}

function Pepperoni(x, y){
  Topping.call(this, x, y, pepperoni);
}

Pepperoni.prototype = Object.create(Topping.prototype);
Pepperoni.prototype.constructor = Pepperoni;

function Mushroom(x, y){
  Topping.call(this, x, y, mushroom);
}

Mushroom.prototype = Object.create(Topping.prototype);
Mushroom.prototype.constructor = Mushroom;

function mousePressed(){
  if (pepperoniIcon.mouseOnTopping()){
    selectedTopping = new Pepperoni(pepperoniIcon.x, pepperoniIcon.y);
    toppings.push(selectedTopping);
  }
  else if (mushroomIcon.mouseOnTopping()){
    selectedTopping = new Mushroom(mushroomIcon.x, mushroomIcon.y);
    toppings.push(selectedTopping);   
  }
  else {
    for (var i = 0; i < toppings.length; i++){
      if (toppings[i].mouseOnTopping()){
        selectedTopping = toppings[i];
      }
    }    
  }
}

function mouseReleased(){
  if (selectedTopping){
    selectedTopping.selected = false;
    selectedTopping.dragged = false;
  }
  selectedTopping = null;
  osc.amp(0, 0.5);
}

function mouseDragged(){
  if (selectedTopping){
    selectedTopping.dragged = true;
    if (selectedTopping.x*selectedTopping.x + selectedTopping.y*selectedTopping.y <= pizzaRadius*pizzaRadius){
       if (selectedTopping.img == pepperoni){
          osc.setType('sine');
       }
       else {
          osc.setType('triangle');
       }
       osc.pan(map(selectedTopping.x, -pizzaRadius, pizzaRadius, -1, 1));
       osc.freq(map(selectedTopping.y, pizzaRadius, -pizzaRadius, 220, 440));
       osc.amp(0.5, 0.05);
    } else{
       osc.amp(0, 0.5);
    }
  }
}