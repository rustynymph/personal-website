function fullscreen() {
      var width = window.outerWidth;
      var height = window.outerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
  
      renderer.setSize(width, height);
      effect.setSize(width, height);

      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }

function resize() {
      var width = window.innerWidth;
      var height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
	
      renderer.setSize(width, height);
      effect.setSize(width, height);
    }	