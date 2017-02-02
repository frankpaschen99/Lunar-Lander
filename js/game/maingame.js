var MainGame = function () {};

var player;

MainGame.prototype = {
    create: function () {

		player = new Player(0, 0);


		game.physics.startSystem(Phaser.Physics.Arcade);

		game.physics.arcade.gravity = new Phaser.Point(0, 1.622);

		buildWorld();

    },

    update: function () {
		player.update();
    }
};

function buildWorld() {
	/* contigous level */
	for (var count = 0, i = 0; i < 25; i++, count+= 1267)
		game.add.sprite(count, 1080-390, 'level');
	for (var count = -1267, i = 0; i < 25; i++, count-= 1267)
		game.add.sprite(count, 1080-390, 'level');
}

class Player {
	constructor(posX, posY) {
		this.sprite = game.add.sprite(posX, posY, 'lander');
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
	}
	update(deltaTime) {
		// collide with ground here

	}
	success() {
		// reset their position
	}
	fail() {
		// blow them up
	}
}
