window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe1 = new window.Pipe1(this.el.find('.pipe1'), this, this.player);
		this.pipe2 = new window.Pipe2(this.el.find('.pipe2'), this, this.player, this.pipe1);
		this.pipe3 = new window.Pipe3(this.el.find('.pipe3'), this, this.player);
		this.pipe4 = new window.Pipe4(this.el.find('.pipe4'), this, this.player, this.pipe3);
		this.pipe5 = new window.Pipe5(this.el.find('.pipe5'), this, this.player);
		this.pipe6 = new window.Pipe6(this.el.find('.pipe6'), this, this.player, this.pipe5);
		this.pipe7 = new window.Pipe7(this.el.find('.pipe7'), this, this.player);
		this.pipe8 = new window.Pipe8(this.el.find('.pipe8'), this, this.player, this.pipe7);
		this.earth = new window.Earth(this.el.find('.Earth'), this, this.player);
		this.earth2 = new window.Earth2(this.el.find('.Earth2'), this, this.player);
		this.isPlaying = false;
		this.startPipes = false;
		this.points = 0;
		this.highscore = 0;
		this.lastPipe = '';

		this.song = $('.playback').next('audio')[0];

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

var mute = false;

$(".onoffswitch-inner").on('click', function(){
	if(mute){
		mute = false;
	}
	else{
		mute = true;
	}
});

Game.prototype.playSong = function(){
	if(this.isPlaying){
		if(mute){
			this.song.pause();
			this.song.currentTime = 0;
		}
		else{
			this.song.play();
		}
	}
	else{
		this.song.pause();
		this.song.currentTime = 0;
	}
};
	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	 var Controls = window.Controls;

	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		if(Controls.keys.space){
			this.startPipes = true;
		}

		if(this.startPipes){
			//this.PlaySong();
			this.pipe1.onFrame(delta);
			this.pipe2.onFrame(delta);

			this.pipe3.onFrame(delta);
			this.pipe4.onFrame(delta);

			this.pipe5.onFrame(delta);
			this.pipe6.onFrame(delta);

			

			//this.pipe7.onFrame(delta);
			//this.pipe8.onFrame(delta);
		}
		this.earth.onFrame(delta);
		this.earth2.onFrame(delta);
		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.player.dead = false;
		this.player.begin = false;

		this.reset();
		//this.pipe1.pipeSpawn();
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		this.playSong();
		this.isPlaying = true;

		

		/**
		 * Pipes functionality
		 */
		// Spawn pipes
		//this.pipe1.pipeSpawn();
		console.log("start");
		this.pipe1.pipeSpawn();
		this.pipe2.pipeSpawn();

		this.pipe3.pipeSpawn();
		this.pipe4.pipeSpawn();
		this.pipe5.pipeSpawn();
		this.pipe6.pipeSpawn();

		this.earth.earthSpawn();
		this.earth2.earthSpawn();
		
	    /*
	     * Pipes end
	     */
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		document.getElementById('count').innerHTML= 0;
		this.player.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {

		document.getElementById('count').innerHTML= '';

		//$('.Backimg').addClass('stop');
		this.player.begin = false;
		this.isPlaying = false;
		this.startPipes = false;
		this.player.dead = false;
		this.playSong();


		console.log("points: " + this.points);
		if(this.points > this.highscore){
			this.highscore = this.points;
		}
		document.getElementById('points').innerHTML='Points: ' + this.points;
		document.getElementById('highscore').innerHTML='Your highscore: ' + this.highscore;
		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.start();
				});
		this.lastPipe = '';
		this.points = 0;
	};

	Game.prototype.postPoint = function(pipeName) {
		if(pipeName !== this.lastPipe){
			this.points++;
			document.getElementById('count').innerHTML= this.points;
			this.lastPipe = pipeName;
			console.log("lastPipe: " + this.lastPipe);
		}
		

	};

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;

	return Game;
})();


