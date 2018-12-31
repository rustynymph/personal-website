var rotateAmount = 2 * Math.PI / 180;
function processInput() {
	if (keydown.w){
		direction = camera.getWorldDirection();
		camera.position.add(direction);
	}
	if (keydown.left){
		camera.rotation.y += rotateAmount;
	}
	if (keydown.right) {
		camera.rotation.y -= rotateAmount;
	}
	if (keydown.up){
		camera.rotation.x += rotateAmount;
	}
	if (keydown.down){
		camera.rotation.x -= rotateAmount;
	}		
}