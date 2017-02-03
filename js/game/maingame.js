var MainGame = function () {};

var player;
var cursors;

MainGame.prototype = {
    create: function () {

		cursors = game.input.keyboard.createCursorKeys();

		/* Setup physics */
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = 20;
		
		// Create player lander
		player = new Player(1000, 10);

		// Generate world w/ polygon collider
		buildWorld();
		
		// Used for camera movement
		game.world.setBounds(0, 0, 30408, 2000);

    },
    update: function () {
		player.update();
    }
};

function buildWorld() {
	/* Generate contiguous level */
	for (var count = 0, i = 0; i < 25; i++, count+= 1267) {
		var sprite = game.add.sprite((1920-1267)+count, 1080-200, 'level');
		game.physics.p2.enable(sprite, true);
		sprite.body.clearShapes();

		sprite.body.loadPolygon('level_physics', 'level');
		sprite.body.static = true;
	}
}

class Player {
	constructor(posX, posY) {

		this.sprite = game.add.sprite(posX, posY, 'lander');
		
		game.physics.p2.enable(this.sprite, true);
		// Collision callback
		this.sprite.body.onBeginContact.add(this.landerCollision);

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
	landerCollision(body, shape1, shape2, equation) {
		// handle colliding
		// call success() or fail()
	}	
}


