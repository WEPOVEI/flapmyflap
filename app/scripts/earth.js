window.Earth = (function() {
	'use strict';

	var Earth = function(el, game, player) {
		this.el = el;
		this.game = game;
		this.player = player;
		this.pos = { x: 0, y: 0 };

		this.startX = 0;
		this.startY = 38;
	};

	Earth.prototype.earthSpawn = function() {
		console.log("spawn the earth");
		this.pos.x = this.startX;
		this.pos.y = this.startY;
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	var SPEED = 30;

	Earth.prototype.onFrame = function(delta) {

		if(!this.player.dead){
			this.pos.x -= delta * SPEED;
		}
		// Move
		//this.pos.x = this.startX;
		//this.pos.y = this.startY;
		//console.log(this.pos.x)
		if(this.pos.x <= -103){
			this.pos.x = 100;
		}
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	return Earth;
})();

window.Earth2 = (function() {
	'use strict';

	var Earth2 = function(el, game, player) {
		this.el = el;
		this.game = game;
		this.player = player;
		this.pos = { x: 0, y: 0 };

		this.startX = 103;
		this.startY = 38;
	};

	Earth2.prototype.earthSpawn = function() {
		console.log("spawn the earth");
		this.pos.x = this.startX;
		this.pos.y = this.startY;
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	var SPEED = 30;

	Earth2.prototype.onFrame = function(delta) {

		if(!this.player.dead){
			this.pos.x -= delta * SPEED;
		}
		// Move
		//this.pos.x = this.startX;
		//this.pos.y = this.startY;
		//console.log(this.pos.x);
		if(this.pos.x <= -103){
			this.pos.x = 100;
		}
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	return Earth2;
})();