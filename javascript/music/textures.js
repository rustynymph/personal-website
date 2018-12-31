function loadTextures(){
	var right, left, up, down, front, back;
	var textureLoader = new THREE.TextureLoader();
	textureLoader.load("/images/music/stormydays2/rt.png", function(texture){
	    right = new THREE.MeshBasicMaterial({ 
	        map: texture
		});
		materialArray.push(right);
		textureLoader.load("/images/music/stormydays2/lf.png", function(texture){
		    left = new THREE.MeshBasicMaterial({ 
		        map: texture
			});
			materialArray.push(left);
			textureLoader.load("/images/music/stormydays2/up.png", function(texture){
			    up = new THREE.MeshBasicMaterial({ 
			        map: texture
				});
				materialArray.push(up);
				textureLoader.load("/images/music/stormydays2/dn.png", function(texture){
				    down = new THREE.MeshBasicMaterial({ 
				        map: texture
					});
					materialArray.push(down);
					textureLoader.load("/images/music/stormydays2/bk.png", function(texture){
					    front = new THREE.MeshBasicMaterial({ 
					        map: texture
						});
						materialArray.push(front);
						textureLoader.load("/images/music/stormydays2/ft.png", function(texture){
						    back = new THREE.MeshBasicMaterial({ 
						        map: texture
							});
							materialArray.push(back);
							init();
						});							
					});					
				});				
			});			
		});		
	});
}