var cloud_tiles = new Image();
cloud_tiles.src = "imgs/cloud_tile.png";
var clouds = [];
var cloud_count = 6;

function clouds_init() {
	for (var i = 0; i < cloud_count; i++) {
		clouds.push(new Cloud(getRandomIntInclusive((GAME_POSITION + GAME_WIDTH)/ 2, (GAME_POSITION + GAME_WIDTH) * 2), getRandomIntInclusive(50, 200)));
	}
}


function clouds_draw(context) {
	for (var i = 0; i < 6; i++) {
		clouds[i].draw(context);
	}
}


function clouds_update() {
	for (var i = 0; i < 6; i++) {
		clouds[i].update();
	}
}


function Cloud(x, y) {
	this.x = x;
	this.y = y;
	this.acceleration = SCROLL_SPEED / 1.8;
	this.update = function() {
		if ((this.x + 47) < GAME_POSITION) {
			this.x = getRandomIntInclusive((GAME_POSITION + GAME_WIDTH), (GAME_POSITION + GAME_WIDTH) * 2);
			this.y = getRandomIntInclusive(50, 200);
		}
		this.x += this.acceleration;
	}

	this.draw = function(context) {
		context.drawImage(
		cloud_tiles,
		0,
		0,
		47,
		14,
		this.x,
		this.y,
		47,
		14);
	}
}