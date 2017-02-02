var MainGame = function () {};

var player;

MainGame.prototype = {
    create: function () {

		player = new Player(10, 10);


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
		this.sprite.anchor.setTo(0.5, 0.5);
	}
	update(deltaTime) {
		// collide with ground here and handle input
		if (game.input.keyboard.isDown(Phaser.Keyboard.W))
	        game.physics.arcade.accelerationFromRotation(this.sprite.rotation-90, 10, this.sprite.body.acceleration);

	    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
	        this.sprite.body.angularVelocity = -300;
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
	        this.sprite.body.angularVelocity = 300;
	    else
	        this.sprite.body.angularVelocity = 0;
	}
	success() {
		// reset their position
	}
	fail() {
		// blow them up
	}
}
