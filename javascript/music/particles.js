function PrettyParticles(count, size, image){
	this.particleCount = count;
	this.particles = new THREE.Geometry();
    this.pMaterial = new THREE.PointsMaterial({
	      color: 0xFFFFFF,
	      size: size,
	      map: image,
	      blending: THREE.AdditiveBlending,
	      transparent: true,
		  depthWrite: false
	    });	

	// now create the individual particles
	for (var p = 0; p < this.particleCount; p++) {
		  // create a particle with random
		  // position values, -250 -> 250
		  var pX = Math.random() * 500 - 250,
		      pY = Math.random() * 500 - 250,
		      pZ = Math.random() * 500 - 250;
		  var particle = new THREE.Vector3(pX, pY, pZ);

		  //create a velocity vector
		  particle.velocity = new THREE.Vector3(
			  -Math.random(),
			  0,
			  0);

		  // add it to the geometry
		  this.particles.vertices.push(particle);
	}

		// create the particle system
	this.particleSystem = new THREE.Points(
		this.particles,
		this.pMaterial);
	this.particleSystem.sortParticles = true;

	this.update = function(){
		this.particleSystem.rotation.x -= 0.01;	
		var pCount = this.particleCount;
		while (pCount--) { // loop over each particle
			    var particle =
			      this.particles.vertices[pCount];

			    // check if we need to reset
			    if (particle.x < -200) {
			      particle.x = 200;
			      particle.velocity.x = 0;
			    }
			    particle.velocity.x -= Math.random() * .1;
			    particle.x += particle.velocity.x;
		}

		  // flag to the particle system
		  // that we've changed its vertices.
		this.particleSystem.geometry.__dirtyVertices = true;		
	}
}