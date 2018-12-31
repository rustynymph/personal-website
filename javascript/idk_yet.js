// fftSize must be at least 32, and a power of 2 (32,64,128,256 etc.)
var fftSize = 32

function setup() {
  createCanvas( windowWidth, windowHeight )

  drums = EDrums('x*o*x*o-')
  drums.amp = .75

  bass = FM('bass')
    .note.seq( [0,0,0,6,12,13], [1/8,1/16].rnd(1/16,2) )


  rhodes = Synth( 'bleep', {amp:.35} )
    .chord.seq( Rndi(1,1,1), 1 )
    .fx.add( Delay() )
    

  fft = FFT( fftSize )

  Gibber.scale.root.seq( ['e4','a3'], [1] )
  Gibber.scale.mode.seq( ['Minor','Phrygian'], [6,2] )

  noStroke()
  colorMode( HSB, 255 )
}

function draw() {
  background( 64 )

  var numBars = fftSize / 2,
      barHeight = ( height - 1 ) / numBars,
      barColor = null, 
      value = null

  for( var i = 0; i < numBars; i++ ) {
    barColor = color( ( i / numBars ) * 255, 255, 255 )
    fill( barColor ) 

    // read FFT value, which ranges from 0-255, and scale it.
    value = ( fft[ i ] / 255 ) * width

    ellipse(width/2, height/2, value/2);
    //rect( 0, barHeight * i, value, barHeight )
  }
}

function mouseMoved(){

}