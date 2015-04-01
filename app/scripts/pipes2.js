window.Pipe3 = (function() {
	'use strict';

	var Pipe3 = function(pipe3, game) {
		this.pipe3 = pipe3;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	var startX = 100;
	var startY =  30;

	Pipe3.prototype.pipeSpawn = function() {

		this.pos.x = startX + 35;
		this.pos.y = startY;
		// Update UI
		this.pipe3.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("calling onFrame");
	};

	var SPEED = 30;

	Pipe3.prototype.onFrame = function(delta) {
		
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -8){
			this.pos.x = startX;
		}
		this.pipe3.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	return Pipe3;

})();

window.Pipe4 = (function() {
	'use strict';

	var Pipe4 = function(pipe4, game) {
		this.pipe4 = pipe4;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	var startX = 100;
	var startY =  -50;

	Pipe4.prototype.pipeSpawn = function() {

		this.pos.x = startX + 35;
		this.pos.y = startY;
		// Update UI
		this.pipe4.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("blabla bleble");
	};

	var SPEED = 30;

	Pipe4.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -8){
			this.pos.x = startX;
		}
		this.pipe4.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//console.log("pos: " + this.pos.x  + ", " + this.pos.y);
	};

	return Pipe4;

})();