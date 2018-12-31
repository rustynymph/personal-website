// sound
var soundFile = null;
var fft, spectrum;
var myAudioRange = 64;

// shapes
var cnv;
var rect_width, rect_height;
var squares = [];

// ************************************************************************************

function preload(){
  loadSoundFile();
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('container');
  fft = new p5.FFT(0.8, myAudioRange);

  rect_width = windowWidth/8;
  rect_height = windowHeight/8;

  var x = 0;
  var y = windowHeight - rect_height;
  
  for (var j = 0; j < myAudioRange; j++){
    if (((j % 8) == 0) && j != 0) {
      y = windowHeight - rect_height;
      x += rect_width; 
    }
      var square = {
        x_pos: x,
        y_pos: y,
      };
      squares.push(square);
      fill(0);
      stroke(255, 255, 255);
      rect(square.x_pos, square.y_pos, rect_width, rect_height);
      y -= rect_height;
  }
  squares = shuffle(squares);

  $( "#playbutton" ).css( "visibility", "visible" );
  $( "#stopbutton" ).css( "visibility", "visible" );  
}

function draw() {
  background(0);
  drawModel();
}

function drawModel(){
  spectrum = null;
  if (soundFile && soundFile.isPlaying()){
    spectrum = fft.analyze();
  }

  if (spectrum){
    var alpha_intensity;
    var color_map;
    var block_color;
    stroke(255, 255, 255);
    for (var i = 0; i < squares.length ; i++){ // same size as myAudioRange
      alpha_intensity = map(spectrum[i], 0, 255, 10, 255);
      color_map = map(spectrum[i], 0, 255, 0, 6);
      if (color_map >= 0 && color_map < 3){
        block_color = color(0, 255, 153, alpha_intensity);
      }
      else if (color_map >= 3 && color_map < 5){
        block_color = color(102, 0, 255, alpha_intensity);
      }
      else{ 
        block_color = color(102, 0, 102, alpha_intensity);
      }
      fill(block_color);
      var square = squares[i];
      rect(square.x_pos, square.y_pos, rect_width, rect_height);
    }    
  } else{
    for (var i = 0; i < squares.length ; i++){
      var square = squares[i];
      fill(0, 0, 0);
      console.log(square);
      rect(square.x_pos, square.y_pos, rect_width, rect_height);      
    }
  }

}

function loadSoundFile(file){
    soundFile = loadSound('/media/audio/patternwalks.mp3');
}

function playSoundFile(){
    soundFile.play();
}

function stopSoundFile(){
    soundFile.stop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    rect_width = windowWidth/8;
    rect_height = windowHeight/8;
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}