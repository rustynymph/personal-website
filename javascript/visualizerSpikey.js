//sound
var soundFile = null;
var fft, spectrum, amplitude, spectralCentroid, waveform;

// rotation
var objRotateX = 0;
var objRotateY = 0;
var objRotateZ = 0;
var cnv;
var rnd;
var groupRadius;

//boxes
var boxCount = 400;
var default_width;
var default_height;
var default_depth;
var bassBoxes = [];
var lowMidBoxes = [];
var midBoxes = [];
var highMidBoxes = [];
var trebleBoxes = [];
var max_height = 150;

//colors
var alpha = 50;

function preload(){
  loadSoundFile();
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.parent('container');
  groupRadius = (height/2) - (height/5);
  groupRadius = 20;
  default_width = 1;
  default_height = 1;
  default_depth = 1;
  fft = new p5.FFT(0.8, 256);
  amplitude = new p5.Amplitude();

  for (var i = 0; i < boxCount; i++){
    var bassBox = {
      color: color('rgba(10, 0, 255, .75)')
    };
    var lowMidBox = {
      color: color('rgba(50, 0, 200, .75)')
    };  
    var midBox = {
      color: color('rgba(75, 0, 150, .75)')
    };
    var highMidBox = {
      color: color('rgba(150, 0, 150, .75)')
    }; 
    var trebleBox = {
      color: color('rgba(255, 0, 50, .75)')
    };
    bassBoxes.push(bassBox);
    lowMidBoxes.push(lowMidBox);
    midBoxes.push(midBox);
    highMidBoxes.push(highMidBox);
    trebleBoxes.push(trebleBox);        
  }
  $( "#playbutton" ).css( "visibility", "visible" );
  $( "#pausebutton" ).css( "visibility", "visible" );
  $( "#stopbutton" ).css( "visibility", "visible" );  
}

function draw() {
  background(0);
  //ambientLight(100);
  //pointLight(250, 0, 250, 10, 10, 0);  
  doAnimate();
  objRotate();
  drawModel();
}

function drawModel() {
  groupRadius = (height/2) - (height/5);
  spectrum = null;
  if (soundFile && soundFile.isPlaying()){
    spectrum = fft.analyze();
  }
  
  //specularMaterial(250,0,0);
  fill('rgba(255,255,255,0.02)');
  sphere(groupRadius);
  
  for (var s=0; s < boxCount; s++) {
    var noiseCoord = s;
    rnd = lerp(-1,1,noise(noiseCoord));
    
    var bassBox = bassBoxes[s];
    var lowMidBox = lowMidBoxes[s];
    var midBox = midBoxes[s];
    var highMidBox = highMidBoxes[s];
    var trebleBox = trebleBoxes[s];

    //draw bassbox
    rotateY(PI*rnd);
    rotateZ(PI*rnd);
    translate(groupRadius,0,0); 
    var boxWidth = default_width;
    if (spectrum){
        boxWidth = map(fft.getEnergy('bass'), 0, 255, default_width, max_height);
    }
    fill(bassBox.color);
    box(boxWidth, default_height, default_depth);
    translate(-groupRadius,0,0);  
    rotateY(-(PI*rnd));
    rotateZ(-(PI*rnd));

    //draw lowmid box
    rotateY(PI*rnd);
    rotateZ(PI*rnd);
    translate(groupRadius,0,0); 
    var boxWidth = default_width;
    if (spectrum){
        boxWidth = map(fft.getEnergy('lowMid'), 0, 255, default_width, max_height);
    }
    fill(lowMidBox.color);
    box(boxWidth, default_height, default_depth);
    translate(-groupRadius,0,0);  
    rotateY(-(PI*rnd));
    rotateZ(-(PI*rnd));  

    //draw mid box
    rotateY(PI*rnd);
    rotateZ(PI*rnd);
    translate(groupRadius,0,0); 
    var boxWidth = default_width;
    if (spectrum){
        boxWidth = map(fft.getEnergy('mid'), 0, 255, default_width, max_height);
    }
    fill(midBox.color);
    box(boxWidth, default_height, default_depth);
    translate(-groupRadius,0,0);  
    rotateY(-(PI*rnd));
    rotateZ(-(PI*rnd));      

    //draw highMid box
    rotateY(PI*rnd);
    rotateZ(PI*rnd);
    translate(groupRadius,0,0); 
    var boxWidth = default_width;
    if (spectrum){
        boxWidth = map(fft.getEnergy('highMid'), 0, 255, default_width, max_height);
    }
    fill(highMidBox.color);
    box(boxWidth, default_height, default_depth);
    translate(-groupRadius,0,0);  
    rotateY(-(PI*rnd));
    rotateZ(-(PI*rnd));   

    //draw treble box
    rotateY(PI*rnd);
    rotateZ(PI*rnd);
    translate(groupRadius,0,0); 
    var boxWidth = default_width;
    if (spectrum){
        boxWidth = map(fft.getEnergy('treble'), 0, 255, default_width, max_height);
    }
    fill(trebleBox.color);
    box(boxWidth, default_height, default_depth);
    translate(-groupRadius,0,0);  
    rotateY(-(PI*rnd));
    rotateZ(-(PI*rnd));     
  }

}

function doAnimate() {
  // increment animation variables
  objRotateY -= 0.2;
}

function objRotate() {
  rotateX(radians(objRotateX));
  rotateY(radians(objRotateY));
  rotateZ(radians(objRotateZ));
}

function drawBox(box, type, spectrum){
    // translate
    rotateY(PI*rnd);
    rotateZ(PI*rnd);
    translate(groupRadius,0,0); 
    
    var boxWidth = default_width;
    if (spectrum){
        boxWidth = map(fft.getEnergy('bass'), 0, 255, default_width, 100);
    }
    box(boxWidth, default_height, default_depth);
    
    //reset translation
    translate(-groupRadius,0,0);  
    rotateY(-(PI*rnd));
    rotateZ(-(PI*rnd));
}

function loadSoundFile(file){
  /*
    console.log('file read successful');                        
    var reader = new FileReader();
    reader.onload = readSuccess;                                            
    function readSuccess(evt) { 
        console.log('file read successful');                        
    };
    reader.readAsText(file); 

    $.ajax({
           url : '../../../../php/uploadSoundFile.php',
           type : 'POST',
           data : {fileName: 'test', fileContents: reader.result},
           processData: false,  // tell jQuery not to process the data
           contentType: false,  // tell jQuery not to set contentType
           error: function (xhr, status, error) {
          // executed if something went wrong during call
              if (xhr.status > 0) alert('got error: ' + status); // status 0 - when load is interrupted
           },
           success : function(data) {
               console.log(data);
               alert(data);
           }
    });
  */
    soundFile = loadSound('/media/audio/purgatory.mp3');
}

function playSoundFile(){
    soundFile.play();
}

function stopSoundFile(){
    soundFile.stop();
}

function windowResized() {
    width = $( window ).width();
    height = $( window ).height();

    ellipse_radius_max = width/10;

    resizeCanvas(width, height);
}