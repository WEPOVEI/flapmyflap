window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30; // * 10 pixels per second
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;

	var pause = true;
	

	/*for testing purposes*/

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.dead = true;
		this.pos = { x: 0, y: 0 };

		this.lastY = INITIAL_POSITION_Y;
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		//$('.Backimg').removeClass('stop');
		
	};

	Player.prototype.onFrame = function(delta) {

		if(pause){
			$('.Player').addClass('wiggle');
			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
			
		}

		if(this.begin){
			this.pos.y += delta * (SPEED*1.5);

		}
		if(this.dead){
			if(!this.game.mute){
				this.game.song2.play();
			}
			$('.Backimg').addClass('pause');
			this.pos.y += delta * SPEED;
			this.checkCollisionWithBounds();
			

		}else if(Controls.keys.space){
			this.dead = false;
			this.begin = true;
			pause = false;

			$('.Player').removeClass('wiggle');

			this.pos.y -= delta * (SPEED*3.5);
			
			if(this.game.isPlaying){
				this.game.playSong();
			} 

		}else{
			this.checkCollisionWithBounds();
		}

		// Update UI
		if(this.lastY < this.pos.y){
			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + 23 + 'deg)');
		}else if(this.lastY > this.pos.y){
			this.el.css('transform','translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + -23 + 'deg)');
		}
		this.lastY = this.pos.y;
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			/*this.pos.y < 0 ||*/
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			pause = true;
		this.dead = true;
			return this.game.gameover();
		}
	};

	return Player;

})();
