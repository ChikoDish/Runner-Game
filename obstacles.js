cactus_15_33 = new Image();
cactus_24_46 = new Image();
cactus_32_33 = new Image();
cactus_49_33 = new Image();
pterodactyl_42_30 = new Image();

cactus_15_33.src = "imgs/cactus_15_33.png";
cactus_24_46.src = "imgs/cactus_24_46.png";
cactus_32_33.src = "imgs/cactus_32_33.png";
cactus_49_33.src = "imgs/cactus_49_33.png";
pterodactyl_42_30.src = "imgs/pterodactyl_42_30.png";

var obstacles = [];

function generate_rand_obstacle() {
	var img;
	var x = obstacles[obstacles.length - 1].x + getRandomIntInclusive(300, 600);
	var y = 400 - (28/2);
	var obstacles_possible;
	
	if (GAME_POSITION > 800) {
		obstacles_possible = 5;
	} else {
		obstacles_possible = 3;
	}
	switch (getRandomIntInclusive(0, obstacles_possible)) {
		case 0:
			img = cactus_15_33;
			obstacles.push(new Obstacle(img, x, y - 33, 15, 33, false));
			break;
		case 1:
			img = cactus_24_46;
			obstacles.push(new Obstacle(img, x, y - 46, 24, 46, false));
			break;
		case 2:
			img = cactus_32_33;
			obstacles.push(new Obstacle(img, x, y - 33, 32, 33, false));
			break;
		case 3:
			img = cactus_49_33;
			obstacles.push(new Obstacle(img, x, y - 33, 49, 33, false));
			break;
		case 4:
		case 5:
			img = pterodactyl_42_30;
			y -= 32;
			obstacles.push(new Obstacle(img, x, y - 30, 42, 32, true));
			break;
	};
}


function obstacles_init() {
	obstacles.push(new Obstacle(cactus_24_46, getRandomIntInclusive((GAME_WIDTH + GAME_POSITION), (GAME_WIDTH + GAME_POSITION) * 1.5), 400 - 46 - (28/2), 24, 46));
	for (var i = 1; i < 9; i++) {
		// pick which cactus to use
		generate_rand_obstacle();
	}

}


function obstacles_draw(context) {
	for (var i = 0; i < obstacles.length; i++) {
		obstacles[i].draw(context);
	}
}


function obstacles_update() {
	for (var i = 0; i < obstacles.length; i++) {
		if ((obstacles[i].x + obstacles[i].x_size) < GAME_POSITION) {
			obstacles.splice(i, 1);
			generate_rand_obstacle();
		}
		obstacles[i].animate();
	}
	return obstacles_check_collision();
}


function obstacles_check_collision() {
	for (var i = 0; i < obstacles.length; i++) {
		if ((trex.x + trex.x_size - 5) > obstacles[i].x &&
			trex.x + 5 < (obstacles[i].x + obstacles[i].x_size) &&
		 	trex.y + 5< (obstacles[i].y + obstacles[i].y_size) &&
		 	(trex.y + trex.y_size - 5) > obstacles[i].y) {
			return true;
		} 
	}
	return false;
}


function Obstacle(img, x, y, x_size, y_size, anim) {
	this.x = x;
	this.y = y;
	this.x_size = x_size;
	this.y_size = y_size;
	this.img = img;
	this.anim = anim;
	this.frame = 0;
	this.anim_delay = 0;

	this.animate = function() {
		if (this.anim) {
			this.anim_delay++;
			if (!(this.anim_delay % 7)) {
				switch (this.frame) {
					case 0:
						this.frame = 1;
						break;
					case 1:
						this.frame = 0;
						break;
				};
			}
		}
	}

	this.draw = function(context) {
		context.drawImage(
			this.img,
			this.frame * this.x_size,
			0,
			this.x_size,
			this.y_size,
			this.x,
			this.y,
			this.x_size,
			this.y_size);
	}
}

