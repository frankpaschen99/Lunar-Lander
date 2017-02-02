var MainGame = function () {};

var player;

MainGame.prototype = {
    create: function () {

		player = new Player(10, 10);


		game.physics.startSystem(Phaser.Physics.Arcade);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		game.physics.arcade.gravity = new Phaser.Point(0, 3);

		buildWorld();
		game.camera.follow(player.sprite);

    },

    update: function () {
		player.update();
    }
};

function buildWorld() {
	/* contigous level */
	for (var count = 0, i = 0; i < 25; i++, count+= 1267) {
		var sprite = game.add.sprite((1920-1267)+count, 1080-191, 'level');
		game.physics.p2.enable(sprite, false);
		sprite.body.clearShapes();

		sprite.body.loadPolygon('level_physics', 'level');
		sprite.body.static = true;
	}

	for (var count = -1267, i = 0; i < 25; i++, count-= 1267) {
		var sprite = game.add.sprite((1920-1267)+count, 1080-191, 'level');
		game.physics.p2.enable(sprite, false);
		sprite.body.clearShapes();

		sprite.body.loadPolygon('level_physics', 'level');
		sprite.body.static = true;
	}
}

class Player {
	constructor(posX, posY) {
		this.sprite = game.add.sprite(posX, posY, 'lander');
		game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
		this.sprite.anchor.setTo(0.5, 0.5);
		this.cameraMoved = false;
	}
	update(deltaTime) {
		// collide with ground here and handle input
		if (game.input.keyboard.isDown(Phaser.Keyboard.W))
	        game.physics.arcade.accelerationFromRotation(this.sprite.rotation-90, 20, this.sprite.body.acceleration);

	    if (game.input.keyboard.isDown(Phaser.Keyboard.A))
	        this.sprite.body.angularVelocity = -300;
	    else if (game.input.keyboard.isDown(Phaser.Keyboard.D))
	        this.sprite.body.angularVelocity = 300;
	    else
	        this.sprite.body.angularVelocity = 0;

		if (this.sprite.x < 0 && !this.cameraMoved) {
			game.camera.x -= 1920;
			this.cameraMoved = true;
		}

	}
	success() {
		// reset their position
	}
	fail() {
		// blow them up
	}
}


/****

TODO: fix upwards velocity against gravity being waaay too strong or something else is
wrong idfk

TODO: allow collision with the ground. Figure out p2js and arcade

TODO: Camera movement
****/
