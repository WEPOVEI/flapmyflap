window.Pipe1 = (function() {
	'use strict';

	var Pipe1 = function(pipe1, game, player) {
		this.pipe1 = pipe1;
		this.game = game;
		this.player = player;
		this.startX = 100;
		this.startY = 24; // 53 to 25

		this.minX = this.startX - 3;
		this.maxX = this.startX + 3;

		this.pos = { x: 0, y: 0 };
	};

	Pipe1.prototype.pipeSpawn = function() {
		var randomNr = Math.floor((Math.random() * 28) + 1);	// 1 to 28
		this.pos.x = this.startX;
		this.pos.y = this.startY + randomNr;

		// Update UI
		this.pipe1.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("calling onFrame");
	};

	var SPEED = 30;

	Pipe1.prototype.onFrame = function(delta) {
		
		if(!this.player.dead){
			this.pos.x -= delta * SPEED;
		}
		
		this.minX = this.pos.x - 3;
		this.maxX = this.pos.x + 3;

		if(this.player.pos.x >= this.minX && this.player.pos.x <= this.maxX){

		   if(Math.floor(this.player.pos.y) >= this.pos.y - 6){
		   		//console.log("Arekstur");
		   		//this.gameover();
		   		this.player.dead = true;
		   }		
		}
		// Back to the beginning
		if(this.pos.x <= -8){
			var randomNr = Math.floor((Math.random() * 28) + 1);	// 1 to 28
			this.pos.x = this.startX;
			this.pos.y = this.startY + randomNr;
		}
		this.pipe1.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe1.prototype.getY = function() {
		return this.pos.y;
	};

	return Pipe1;

})();

window.Pipe2 = (function() {
	'use strict';

	var Pipe2 = function(pipe2, game, player, pipe1) {
		this.pipe2 = pipe2;
		this.game = game;
		this.player = player;
		this.pipe1 = pipe1;
		this.startX = 100;
		this.startY = -96;

		this.minX = this.startX - 3;
		this.maxX = this.startX + 3;
		this.pos = { x: 0, y: 0 };
	};

	

	Pipe2.prototype.pipeSpawn = function() {

		//console.log(this.pipe1.getY());
		this.pos.x = this.startX;
		this.pos.y = this.pipe1.getY() - 115;
		console.log("y: " + (this.pos.y + 100));
		// Update UI
		this.pipe2.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("blabla bleble");
	};

	var SPEED = 30;

	Pipe2.prototype.onFrame = function(delta) {
		
		if(!this.player.dead){
			console.log("trueee");
			this.pos.x -= delta * SPEED;
		}

		this.minX = this.pos.x - 3;
		this.maxX = this.pos.x + 3;

		//console.log(Math.floor(this.player.pos.y) +  " <= " + (this.pos.y + 100));
		if(this.player.pos.x >= this.minX && this.player.pos.x <= this.maxX){

		   if(Math.floor(this.player.pos.y) <= (this.pos.y + 100)) {
		   		//console.log("Arekstur");
		   		this.player.dead = true;
		   		//this.game.gameover();
		   }		
		}

		if(this.pos.x <= -8){
			this.pos.x = this.startX;
			this.pos.y = this.pipe1.getY() - 115;
		}
		this.pipe2.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//console.log("pos: " + this.pos.x  + ", " + this.pos.y);
	};

	return Pipe2;

})();