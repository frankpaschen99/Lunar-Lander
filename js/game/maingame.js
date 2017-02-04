var MainGame = function () {};

var player;
var cursors;

var CONFIG_ACCELERATION_COEFFICIENT = 0.5;
var CONFIG_WORLD_GRAVITY = 3;
var CONFIG_PLAYER_START_POSITION = new Phaser.Point(500, 10);
MainGame.prototype = {
    create: function () {

		cursors = game.input.keyboard.createCursorKeys();

		/* Setup physics */
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = CONFIG_WORLD_GRAVITY;
		
		// Create player lander
		player = new Player(CONFIG_PLAYER_START_POSITION);

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
		game.physics.p2.enable(sprite, false);
		sprite.body.clearShapes();

		sprite.body.loadPolygon('level_physics', 'level');
		sprite.body.static = true;
	}
}

class Player {
	constructor(spawnPos) {

		this.sprite = game.add.sprite(spawnPos.x, spawnPos.y, 'lander');
		
		game.physics.p2.enable(this.sprite, false);
		// Collision callback
		this.sprite.body.onBeginContact.add(this.landerCollision);
		
		this.score = 0;
	}
	update(deltaTime) {
		// game.debug.cameraInfo(game.camera, 32, 32);			do this later lol
		
		/* Calculate velocity vector based on sprite angle */
		if (cursors.up.isDown) {
			
			/* STOLEN CODE FTW */
			// Adding pi/2 fixes the directions somehow. Gotta learn more about radians to know wtf is going on here.
			// btw body.rotation is in radians.
			var angle = -this.sprite.body.rotation; + (Math.PI/2);
			
			this.sprite.body.velocity.x += CONFIG_ACCELERATION_COEFFICIENT * Math.cos(angle);
			this.sprite.body.velocity.y += CONFIG_ACCELERATION_COEFFICIENT * Math.sin(-angle);
			
		}
		/* Left/Right rotation */
		if (cursors.right.isDown) {
			if (this.sprite.body.angle < 90) 
				this.sprite.body.angularVelocity = 2;
			else {
				this.sprite.body.angularVelocity = 0;
				this.sprite.body.angle = 90;
			}
		} else if (cursors.left.isDown) {
			if (this.sprite.body.angle > -90) 
				this.sprite.body.angularVelocity = -2;
			else {
				this.sprite.body.angularVelocity = 0;
				this.sprite.body.angle = -90;
			}
		} else {
			// stop angular velocity
			this.sprite.body.angularVelocity = 0;
		}

		// console.log("Velocity.x: " + this.sprite.body.velocity.x + ", Velocity.y: " + this.sprite.body.velocity.y + ", AngularVelocity: " + this.sprite.body.angularVelocity + ", Sprite Angle: " + this.sprite.body.angle);
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


