var ctracker;
var skeleton;
var videoInput;
var min_lip_index = 44;
var max_lip_index = 61;
var colorPoints;
var PRECISION = 5;

function setup() {
  skeleton = false;
  colorPoints = [];

  ctracker = new clm.tracker({useWebGL : true});
  ctracker.init(pModel);

  // setup camera capture
  videoInput = createCapture(VIDEO, () => {
    videoInput.size(1067, 800);
    videoInput.position(0, 0);  
    // setup tracker
    ctracker.start(videoInput.elt);               	
  });

  // setup canvas
  var cnv = createCanvas(1067, 800);
  cnv.position(0, 0);
  //cnv.parent("container");

  noStroke();
}

function draw() {
  clear();
  if (ctracker){
    var positions = ctracker.getCurrentPosition();
    videoInput.loadPixels();
    if (skeleton) {
      for (var i = 0; i < positions.length; i++) {
        if (i >= min_lip_index && i <= max_lip_index){
          fill(0);
        } else {
          fill(map(positions[i][0], width*0.33, width*0.66, 0, 255), map(positions[i][1], height*0.33, height*0.66, 0, 255), 255);
        }
        ellipse(positions[i][0], positions[i][1], 4, 4);
      }
    }
    makeColorPointsArray(positions);
    var lipColor = getAverageColor(videoInput);
    fill(lipColor);
    rect(0, 0, 100, 100);
    videoInput.updatePixels();
  }
}

function getAverageColor(videoInput){
  var r = 0, g = 0, b = 0, x = 0, y = 0, index = 0;
  for (var i = 0; i < colorPoints.length; i++){
    x = colorPoints[i][0];
    y = colorPoints[i][1];
    index = xyToIndex(x, y, videoInput.width);
    var red = videoInput.pixels[index];
    var green = videoInput.pixels[index+1];
    var blue = videoInput.pixels[index+2];
    /*r += red >> 020 & 0xFF;
    g += green >> 010 & 0xFF;
    b += blue        & 0xFF;*/
    r += red;
    g += green;
    b += blue;    
}
  //r /= videoInput.pixels.length;
  //g /= videoInput.pixels.length;
  //b /= videoInput.pixels.length;
  r /= colorPoints.length;
  g /= colorPoints.length;
  b /= colorPoints.length;  
  console.log(r, g, b);
  return color(r, g, b);
}

function makeColorPointsArray(posArray){
  if (posArray){
    /* top lip */
    getPointsOnLine(posArray[45][0], posArray[45][1], posArray[61][0], posArray[61][1], PRECISION);
    getPointsOnLine(posArray[46][0], posArray[46][1], posArray[61][0], posArray[61][1], PRECISION);
    getPointsOnLine(posArray[46][0], posArray[46][1], posArray[60][0], posArray[60][1], PRECISION);
    getPointsOnLine(posArray[47][0], posArray[47][1], posArray[60][0], posArray[60][1], PRECISION);
    getPointsOnLine(posArray[48][0], posArray[48][1], posArray[60][0], posArray[60][1], PRECISION);
    getPointsOnLine(posArray[48][0], posArray[48][1], posArray[59][0], posArray[59][1], PRECISION);
    getPointsOnLine(posArray[49][0], posArray[49][1], posArray[59][0], posArray[59][1], PRECISION);

    /* bottom lip */
    getPointsOnLine(posArray[55][0], posArray[55][1], posArray[56][0], posArray[56][1], PRECISION);
    getPointsOnLine(posArray[54][0], posArray[54][1], posArray[56][0], posArray[56][1], PRECISION);
    getPointsOnLine(posArray[54][0], posArray[54][1], posArray[57][0], posArray[57][1], PRECISION);
    getPointsOnLine(posArray[53][0], posArray[53][1], posArray[57][0], posArray[57][1], PRECISION);
    getPointsOnLine(posArray[53][0], posArray[53][1], posArray[58][0], posArray[58][1], PRECISION);
    getPointsOnLine(posArray[52][0], posArray[52][1], posArray[58][0], posArray[58][1], PRECISION);
    getPointsOnLine(posArray[52][0], posArray[52][1], posArray[58][0], posArray[58][1], PRECISION);
    getPointsOnLine(posArray[51][0], posArray[51][1], posArray[58][0], posArray[58][1], PRECISION);
  }
}

function getPointsOnLine(x1, y1, x2, y2, numPoints){
  if (x1 == x2 && y1 == y2){
    colorPoints.push([x1, y2]);
  } else {
    var rise = y2 - y1;
    var run  = x2 - x1;
    var m    = null;
    var addX = run / numPoints;
    if (run) m = rise / run;
    for (var i = 0; i < numPoints; i++){
      var x = x1 + addX;
      var y = y1 + (m * addX);
      colorPoints.push([x, y]);
    }
  }
}

// convert image xy to pixel index
function xyToIndex(x, y, imgWidth){
  return int((y * imgWidth) + x);
}