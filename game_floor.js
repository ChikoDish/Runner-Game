/* Image assets need to be preloaded for use on ready*/
var ground_tiles = new Image();
ground_tiles.src = "imgs/grass.png";
var game_floor_tiles = [];
var GROUND_TILE_LEN = 28;
var GROUND_IMAGE_LEN = 588;


function ground_init_tiles() {
	// initialize ground layers based on screen size + 1 tile
	for (var i = 0; i < ((GAME_WIDTH / GROUND_TILE_LEN) + 1); i++) {
		game_floor_tiles.push(new GameFloorTile(i, getRandomIntInclusive(0, (GROUND_IMAGE_LEN / GROUND_TILE_LEN) - 1)));
	}
}


function ground_tiles_update() {
	if (Math.floor(GAME_POSITION / GROUND_TILE_LEN) > prev_tile_num) {
		prev_tile_num = Math.floor(GAME_POSITION / GROUND_TILE_LEN);
		game_floor_tiles.splice(GAME_POSITION % GROUND_TILE_LEN, 1);
		game_floor_tiles.push(new GameFloorTile(
			game_floor_tiles[game_floor_tiles.length - 1].index + 1,
			getRandomIntInclusive(0, (GROUND_IMAGE_LEN / GROUND_TILE_LEN) - 1)));
	}
}


function ground_tiles_draw(context, canvas) {
	for (var i = 0; i < game_floor_tiles.length; i++) {
		game_floor_tiles[i].draw(context, canvas);
	}
}


function GameFloorTile(index, tile) {
	this.index = index;
	this.tile = tile;

	this.draw = function (context, canvas) {
		context.drawImage(
			ground_tiles,
			this.tile * GROUND_TILE_LEN,
			0,
			GROUND_TILE_LEN,
			GROUND_TILE_LEN,
			this.index * GROUND_TILE_LEN,
			canvas.height - GROUND_TILE_LEN,
			GROUND_TILE_LEN,
			GROUND_TILE_LEN);
	}
}