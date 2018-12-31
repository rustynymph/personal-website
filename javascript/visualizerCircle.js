//sound
var soundFile = null;
var fft, spectrum, amplitude, spectralCentroid, waveform, level;

//dimensions
var ellipseRadius = 250;
var ellipseDiameter = ellipseRadius*2;

function preload(){
  loadSoundFile();
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.parent('container');
  fft = new p5.FFT(0.8, 512);
  fftSmall = new p5.FFT(0.8, 16);
  amplitude = new p5.Amplitude();

  $( "#playbutton" ).css( "visibility", "visible" );
  $( "#stopbutton" ).css( "visibility", "visible" );  

}

function draw() {
  background(0);
  drawModel();
}

function drawModel() {
  spectrum = null;
  if (soundFile && soundFile.isPlaying()){
    spectrum = fft.analyze();
    spectrumSmall = fftSmall.analyze();
    waveform = fft.waveform();
    level    = amplitude.getLevel();
    centroid = fft.getCentroid();
  }
  translate(windowWidth/2, windowHeight/2);

  // center circle
  fill(0);
  stroke(255, 255, 255);
  ellipse(0, 0, ellipseDiameter, ellipseDiameter);

  if (spectrum && spectrumSmall) {
    // outer ellipse
    var red1 = map(centroid, 10, 15000, 50, 255);
    var red2 = map(centroid, 10, 15000, 0, 255);
    var blue = map(centroid, 10, 15000, 255, 0);

    noFill();
    strokeWeight(3);
    stroke(red2, 0, blue);
    var ellipseLevel = map(level, 0, 1, ellipseDiameter, ellipseDiameter*1.5);
    ellipse(0, 0, ellipseLevel, ellipseLevel);  

    // spectrum
    var x1, x2, x3, x4, y1, y2, y3, y4;
    var r = ellipseRadius;
    var angleAmt = PI/45;
    var angleAcc = angleAmt*10; //starting position of spectrum
    strokeWeight(1);
    stroke(255, 255, 255);
    fill(20, 20, 20);
      for (var i = 0; i < spectrumSmall.length; i++){
        var h = r + map(spectrumSmall[i], 0, 255, 0, 100);
        x1 = cos(angleAcc)*r;
        y1 = sin(angleAcc)*r;
        x2 = cos(angleAcc+angleAmt/2)*r;
        y2 = sin(angleAcc+angleAmt/2)*r;        
        x3 = cos(angleAcc+angleAmt/2)*h;
        y3 = sin(angleAcc+angleAmt/2)*h;  
        x4 = cos(angleAcc)*h;
        y4 = sin(angleAcc)*h;              
        quad(-x1, -y1, -x2, -y2, -x3, -y3, -x4, -y4);
        angleAcc += angleAmt;
      }

    // waveform
    noFill();
    beginShape();
    stroke(red1, 0, blue);
    strokeWeight(1);
    for (var i = 0; i< waveform.length; i++){
      var x = map(i, 0, waveform.length, -ellipseRadius, ellipseRadius);
      var y = map( waveform[i], -1, 1, -ellipseRadius, ellipseRadius);
      vertex(x,y);
    }
    endShape();  
  }
}

function drawBox(box, type, spectrum){
}

function loadSoundFile(file){
    soundFile = loadSound('/media/audio/scully.mp3');
}

function playSoundFile(){
    soundFile.play();
}

function stopSoundFile(){
    soundFile.stop();
}

function windowResized() {
    //width = $( window ).width();
    //height = $( window ).height();

    resizeCanvas(windowWidth, windowHeight);
}