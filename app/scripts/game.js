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
		this.isPlaying = false;
		this.startPipes = false;
		this.points = 0;
		this.highscore = 0;
		this.lastPipe = '';
		this.mute = false;

		this.song = $('.playback').next('audio')[0];
		this.song2 = $('.playback2').next('audio')[0];
		this.mario = $('.playback3').next('audio')[0];
		this.mario.playbackRate = 2.0;

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
	this.mute = mute;
	if(this.isPlaying){
		if(this.mute){
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
			this.isPlaying = true;
		}

		if(this.isPlaying === true && this.player.dead === false){
			if(this.startPipes){
				//this.PlaySong();
				//console.log("START PIPES");
				this.pipe1.onFrame(delta);
				this.pipe2.onFrame(delta);

				this.pipe3.onFrame(delta);
				this.pipe4.onFrame(delta);

				this.pipe5.onFrame(delta);
				this.pipe6.onFrame(delta);

			}
		}

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		this.points = 0;
		this.player.dead = false;
		this.player.begin = false;
		$('.Backimg').removeClass('pause');
		this.reset();
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
		//this.playSong();
		this.isPlaying = true;

		/**
		 * Pipes functionality
		 */
		this.pipe1.pipeSpawn();
		this.pipe2.pipeSpawn();

		this.pipe3.pipeSpawn();
		this.pipe4.pipeSpawn();
		this.pipe5.pipeSpawn();
		this.pipe6.pipeSpawn();

		
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
		if(!this.mute){
			this.song2.play();
		}

		document.getElementById('count').innerHTML= '';
		$('.Backimg').addClass('pause');

		this.player.begin = false;
		this.isPlaying = false;
		this.startPipes = false;
		this.player.dead = true;
		this.playSong();

		//console.log("points: " + this.points);
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
			if(!this.mute){
				this.mario.play();
			}
			this.points++;
			document.getElementById('count').innerHTML= this.points;
			console.log("points = " + this.points);
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


