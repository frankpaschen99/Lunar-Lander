var MainGame = function () {};

var player;
var cursors;

MainGame.prototype = {
    create: function () {

		player = new Player(10, 10);
		cursors = game.input.keyboard.createCursorKeys();

		game.physics.startSystem(Phaser.Physics.Arcade);
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);

		game.physics.arcade.gravity = new Phaser.Point(0, 3);

		buildWorld();
		game.world.setBounds(0, 0, 30408, 1000);
    },

    update: function () {
		player.update();
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
}

class Player {
	constructor(posX, posY) {
		this.sprite = game.add.sprite(posX, posY, 'lander');

	}
	update(deltaTime) {
		game.debug.cameraInfo(game.camera, 32, 32);
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

TODO: fix everything
****/
