var MainMenu = function () {};

MainMenu.prototype = {
	playClick: function() {
		game.state.start("MainGame");
	},
	init: function() {
		
	},
	preload: function() {
		
	},
	create: function() {
		game.state.start('MainGame');
	},
	update: function() {
		
	}
};