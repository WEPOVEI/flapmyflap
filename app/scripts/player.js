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

	var frames = 1;

	var pause = true;
	$('.Player').addClass('Wiggle');

	/*for testing purposes*/

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
		
		
	};

	Player.prototype.onFrame = function(delta) {
		/*if (Controls.keys.right) {
			this.pos.x += delta * SPEED;
		}
		if (Controls.keys.left) {
			this.pos.x -= delta * SPEED;
		}
		if (Controls.keys.down) {
			this.pos.y += delta * SPEED;
		}
		if (Controls.keys.up) {
			this.pos.y -= delta * SPEED;
		}*/
		 $(function(){
        var x = 0;
        setInterval(function(){
            x-=1;
            $('.Movground').css('background-position', x + 'px 0');
        }, 10);
    })
		if(pause){
			//this.pos.y += 5*Math.cos(frames/10);
			//append class to player that moves him on the y-axis

		}

		if(this.begin){
			this.pos.y += delta * SPEED;
			//this.game.testfunc();
			//this.pipes.pipeSpawn();
		}
		/*else{
			this.pos.y -=19 + 19;
			
		}*/
		if(Controls.keys.space){
			this.begin = true;
			pause = false;
			this.pos.y -= delta * 3*SPEED;

		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
