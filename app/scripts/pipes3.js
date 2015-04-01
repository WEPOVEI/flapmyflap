window.Pipe5 = (function() {
	'use strict';

	var Pipe5 = function(pipe5, game) {
		this.pipe5 = pipe5;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	var startX = 100;
	var startY =  30;

	Pipe5.prototype.pipeSpawn = function() {

		this.pos.x = startX;
		this.pos.y = startY;
		// Update UI
		this.pipe5.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("calling onFrame");
	};

	var SPEED = 30;

	Pipe5.prototype.onFrame = function(delta) {
		
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -8){
			this.pos.x = startX;
		}
		this.pipe5.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	return Pipe5;

})();

window.Pipe6 = (function() {
	'use strict';

	var Pipe6 = function(pipe6, game) {
		this.pipe6 = pipe6;
		this.game = game;
		this.pos = { x: 0, y: 0 };
	};

	var startX = 100;
	var startY =  -50;

	Pipe6.prototype.pipeSpawn = function() {

		// Klara utfaera fyrir pipe2!!!!!!!!!!!!!!!!
		this.pos.x = startX;
		this.pos.y = startY;
		// Update UI
		this.pipe6.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		console.log("blabla bleble");
	};

	var SPEED = 30;

	Pipe6.prototype.onFrame = function(delta) {
		this.pos.x -= delta * SPEED;
		if(this.pos.x <= -8){
			this.pos.x = startX;
		}
		this.pipe6.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
		//console.log("pos: " + this.pos.x  + ", " + this.pos.y);
	};

	return Pipe6;

})();