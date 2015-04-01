window.Pipe5 = (function() {
	'use strict';

	var Pipe5 = function(pipe5, game, player) {
		this.pipeName = 'pipe5';
		this.pipe5 = pipe5;
		this.game = game;
		this.player = player;
		this.startX = 103 + 70;
		this.startY = 24; // 53 to 25

		this.minX = this.startX - 6;
		this.maxX = this.startX + 6;

		this.pos = { x: 0, y: 0 };
	};

	Pipe5.prototype.pipeSpawn = function() {
		var randomNr = Math.floor((Math.random() * 28) + 1);	// 1 to 28
		this.pos.x = this.startX;
		this.pos.y = this.startY + randomNr;

		// Update UI
		this.pipe5.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	var SPEED = 30;

	Pipe5.prototype.onFrame = function(delta) {
		if(!this.player.dead){
			this.pos.x -= delta * SPEED;
		}
		
		this.minX = this.pos.x - 6;
		this.maxX = this.pos.x + 6;

		if(this.player.pos.x >= this.minX && this.player.pos.x <= this.maxX){

		   if(Math.floor(this.player.pos.y) >= this.pos.y - 6){
		   		//console.log("Arekstur");
		   		//this.gameover();
		   		this.player.dead = true;
		   		$('.Backimg').addClass('stop');
		   }		
		}
		if(this.maxX < this.player.pos.x){
			//console.log(this.pipeName);
			this.game.postPoint(this.pipeName);
		}
		// Back to the beginning
		if(this.pos.x <= -3){
			var randomNr = Math.floor((Math.random() * 28) + 1);	// 1 to 28
			this.pos.x = this.startX - 70;
			this.pos.y = this.startY + randomNr;
		}
		this.pipe5.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe5.prototype.getY = function() {
		return this.pos.y;
	};

	return Pipe5;

})();

window.Pipe6 = (function() {
	'use strict';

	var Pipe6 = function(pipe6, game, player, pipe5) {
		this.pipe6 = pipe6;
		this.game = game;
		this.player = player;
		this.pipe5 = pipe5;
		this.startX = 103 + 70;
		this.startY = -96;

		this.minX = this.startX - 6;
		this.maxX = this.startX + 6;
		this.pos = { x: 0, y: 0 };

		this.pipeGap = 120;
	};

	

	Pipe6.prototype.pipeSpawn = function() {

		//console.log(this.pipe1.getY());
		this.pos.x = this.startX;
		this.pos.y = this.pipe5.getY() - this.pipeGap;
		//console.log("y: " + (this.pos.y + 100));
		// Update UI
		this.pipe6.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	var SPEED = 30;

	Pipe6.prototype.onFrame = function(delta) {
		
		if(!this.player.dead){
			//console.log("trueee");
			this.pos.x -= delta * SPEED;
		}

		this.minX = this.pos.x - 6;
		this.maxX = this.pos.x + 6;

		//console.log(Math.floor(this.player.pos.y) +  " <= " + (this.pos.y + 100));
		if(this.player.pos.x >= this.minX && this.player.pos.x <= this.maxX){

		   if(Math.floor(this.player.pos.y) <= (this.pos.y + 100)) {
		   		//console.log("Arekstur");
		   		this.player.dead = true;
		   		$('.Backimg').addClass('stop');
		   }		
		}

		if(this.pos.x <= -3){
			this.pos.x = this.startX - 70;
			this.pos.y = this.pipe5.getY() - this.pipeGap;
		}
		this.pipe6.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//console.log("pos: " + this.pos.x  + ", " + this.pos.y);
	};

	return Pipe6;

})();