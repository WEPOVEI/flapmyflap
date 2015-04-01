
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
		this.isPlaying = false;
		this.startPipes = false;
		this.points = 0;
		this.lastPipe = '';

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};
/*
$(function () {
    $(".playback").click(function (e) {
    	this.isPlaying = true;
       e.preventDefault();
       console.log("im here");
        var song = $(this).next('audio')[0];
        if(this.isPlaying){
        	console.log("hallo");
        }
        else{
        	console.log("hallllo");
        }
       if (song.paused) {
           song.play();
           console.log("play");
       } 
       else{
       	song.pause();
       	console.log("pause");
       }  
    });
});  */

/*Game.prototype.PlaySong = function(){
	var song = $(".playback").next('audio')[0];
	if(this.isPlaying){
		song.play();
	}
	else{
		song.pause();	
	}
} */
/*
Game.prototype.PlaySong = function(){
	$(".playback").click(function(e){
		e.preventDefault();
		var song = $(this).next('audio')[0];

		if(song.paused){
			song.play();
			console.log("play");
		}
		else{
			song.pause();
			console.log("paused");
		}
	});
};  */
/*
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

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {

		this.reset();
		//this.pipe1.pipeSpawn();
		// Restart the onFrame loop
		this.lastFrame = +new Date() / 1000;
		window.requestAnimationFrame(this.onFrame);
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
		//this.pipe7.pipeSpawn();
		//this.pipe8.pipeSpawn();
		
	    /*
	     * Pipes end
	     */
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		this.player.begin = false;
		this.isPlaying = false;
		//this.PlaySong();

		this.startPipes = false;
		this.player.dead = false;


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
	};

	Game.prototype.postPoint = function(pipeName) {
		if(pipeName !== this.lastPipe){
			this.points++;
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


