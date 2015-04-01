window.Pipe7 = (function() {
	'use strict';

	var Pipe7 = function(pipe7, game) {
		this.pipe7 = pipe7;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	var startX = 100;
	var startY =  30;

	Pipe7.prototype.pipeSpawn = function() {

		this.pos.x = startX;
		this.pos.y = startY;
		// Update UI
		this.pipe7.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("calling onFrame");
	};

	var SPEED = 30;

	Pipe7.prototype.onFrame = function(delta) {
		console.log("pipe7");
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -8){
			this.pos.x = startX;
		}
		this.pipe7.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	return Pipe7;

})();

window.Pipe8 = (function() {
	'use strict';

	var Pipe8 = function(pipe8, game) {
		this.pipe8 = pipe8;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	var startX = 100;
	var startY =  -50;

	Pipe8.prototype.pipeSpawn = function() {

		// Klara utfaera fyrir pipe2!!!!!!!!!!!!!!!!
		this.pos.x = startX;
		this.pos.y = startY;
		// Update UI
		this.pipe8.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("blabla bleble");
	};

	var SPEED = 30;

	Pipe8.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -8){
			this.pos.x = startX;
		}
		this.pipe8.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//console.log("pos: " + this.pos.x  + ", " + this.pos.y);
	};

	return Pipe8;

})();