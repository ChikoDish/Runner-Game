var GAME_WIDTH = 840;
var GAME_POSITION = 0; // position of the screen from the start -> also player's position
var SCROLL_SPEED = 7;
var prev_tile_num = 0;

var trex;
var game_over = false;
var high_score = 0;
var charCode = 0;
var GAME_SCORE = 0;
$(document).ready(function () {
	init_game();
});


function init_game() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	canvas.width = 840;
	canvas.height = 400;

	ground_init_tiles();
	clouds_init();
	obstacles_init();
	trex = new Player();

	document.body.addEventListener("keydown", ekey_down);
	document.body.addEventListener("keydown", game_restart);
	document.body.addEventListener("keyup", ekey_up);

	document.body.addEventListener("touchstart", hit32);
	document.body.addEventListener("touchstart", game_trestart);
	document.body.addEventListener("touchend", ekey_up);

	game_scrolling();
}


function game_scrolling() {
	var canvas = document.getElementById("trex_game");
	var context = canvas.getContext("2d");
	GAME_POSITION += SCROLL_SPEED;

	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#D5F5E3";
	context.fillRect(0, 0, canvas.width, canvas.height);
	context.save();
	context.translate(-GAME_POSITION, 0);
	// update
	ground_tiles_update();
	clouds_update();
	trex.update();
	game_over = obstacles_update();

	// draw
	ground_tiles_draw(context, canvas);
	clouds_draw(context);
	obstacles_draw(context);
	if (game_over) {
		trex.state = 3;
	}
	trex.draw(context);

	context.restore();

	context.fillStyle = "#545659";
	context.font = "20px Roboto Mono";

	font_len = context.measureText("Score: " + GAME_POSITION).width;
	GAME_SCORE = 840 + GAME_POSITION - GAME_WIDTH;
	if (GAME_SCORE >= 3000 && GAME_SCORE < 5999) {
		SCROLL_SPEED = 8;
	}
	else if (GAME_SCORE >= 6000 && GAME_SCORE < 8499) {
		SCROLL_SPEED = 10;
	}
	else if (GAME_SCORE >= 8500 && GAME_SCORE < 10799) {
		SCROLL_SPEED = 11;
	}
	else if (GAME_SCORE >= 10800 && GAME_SCORE < 12499) {
		SCROLL_SPEED = 12;
	}
	else if (GAME_SCORE >= 12500 && GAME_SCORE < 15499) {
		SCROLL_SPEED = 14;
	}
	else if(GAME_SCORE >= 15500){
		SCROLL_SPEED = 20;
	}
	context.fillText("Score: " + GAME_SCORE, canvas.width - font_len - 20, 40);
	
	if (game_over) {
		if (GAME_SCORE > high_score) {
			SCROLL_SPEED = 7;
			high_score = GAME_SCORE;
		}
		// text score draw
		context.fillStyle = "#545659";
		context.font = "50px Roboto Mono";
		var font_len = context.measureText("Game Over!").width
		context.fillText("Game Over!", canvas.width / 2 - (font_len / 2), 90);

		context.fillStyle = "#545659";
		context.font = "20px Roboto Mono";
		font_len = context.measureText("HighScore: " + high_score).width
		context.fillText("HighScore: " + high_score, canvas.width / 2 - (font_len / 2), 180);

		context.fillStyle = "#545659";
		context.font = "25px Roboto Mono";
		font_len = context.measureText("SPACE to restart").width
		context.fillText("SPACE to restart", canvas.width / 2 - (font_len / 2), 240);
	} else {
		requestAnimationFrame(game_scrolling);
	}
}


function game_restart(event) {
	if ((event.keyCode == 32) && (game_over)) {
		obstacles = [];
		clouds = [];
		game_floor_tiles = [];
		GAME_POSITION = 0;
		prev_tile_num = 0;
		game_over = false;
		init_game();

	}
}

function game_trestart(event) {
	if ((charCode == 32) && (game_over)) {
		obstacles = [];
		clouds = [];
		game_floor_tiles = [];
		GAME_POSITION = 0;
		prev_tile_num = 0;
		GAME_SCORE = 0;
		game_over = false;
		init_game();
	}
}

function hit32(event) {
	charCode = 32;
}