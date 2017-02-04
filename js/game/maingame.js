var MainGame = function () {};

var player;
var cursors;
var line;
var line2;

var CONFIG_ACCELERATION_COEFFICIENT = 0.5;								// DEFAULT = 0.5
var CONFIG_WORLD_GRAVITY = 10;											// DEFAULT = 3
var CONFIG_PLAYER_START_POSITION = new Phaser.Point(500, 10);			// DEFAULT = new Phaser.Point(10, 10);
MainGame.prototype = {
    create: function () {
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.setImpactEvents(true);
		game.physics.p2.gravity.y = CONFIG_WORLD_GRAVITY;
		game.world.setBounds(0, 0, 30408, 2000);
		
		cursors = game.input.keyboard.createCursorKeys();
		line = new Phaser.Line();
		line2 = new Phaser.Line();
		player = new Player(CONFIG_PLAYER_START_POSITION);
		buildWorld();
    },
    update: function () {
		player.update();
    }
};

function buildWorld() {
	for (var count = 0, i = 0; i < 25; i++, count+= 1267) {
		var sprite = game.add.sprite((1920-1267)+count, 1080-200, 'level');
		game.physics.p2.enable(sprite, false);
		sprite.body.clearShapes();
		sprite.body.loadPolygon('level_physics', 'level');
		sprite.body.static = true;
		sprite.body.onBeginContact.add(player.landerCollision, player);
	}
}

class Player {
	constructor(spawnPos) {
		this.sprite = game.add.sprite(spawnPos.x, spawnPos.y, 'lander');
		this.score = 0;
		this.landed = false;
		game.physics.p2.enable(this.sprite, false);
	}
	update(deltaTime) {
		
		/* UP ARROW INPUT */
		if (cursors.up.isDown && !this.landed) {
			var angle = -this.sprite.body.rotation + (Math.PI/2);
			this.sprite.body.velocity.x += CONFIG_ACCELERATION_COEFFICIENT * Math.cos(angle);
			this.sprite.body.velocity.y += CONFIG_ACCELERATION_COEFFICIENT * Math.sin(-angle);
		}
		/* LEFT/RIGHT ARROW INPUT */
		if (cursors.right.isDown && !this.landed) {
			if (this.sprite.body.angle < 90) 
				this.sprite.body.angularVelocity = 2;
			else {
				this.sprite.body.angularVelocity = 0;
				this.sprite.body.angle = 90;
			}
		} else if (cursors.left.isDown && !this.landed) {
			if (this.sprite.body.angle > -90) 
				this.sprite.body.angularVelocity = -2;
			else {
				this.sprite.body.angularVelocity = 0;
				this.sprite.body.angle = -90;
			}
		} else {
			this.sprite.body.angularVelocity = 0;
		}
		/* CAMERA */

		this.distanceFromTerrain();
		// test distanceFromTerrain, zoom in camera and rescale sprite 
	}
	/* return the distance in pixels from the nearest terrain */
	distanceFromTerrain() {
		// the length of the adjacent and opposite, knowing the angle of 45 deg. Add these to sprite pos to get raycast end
		var x = Math.sin(45 * (Math.PI / 180.0)) * 1000;
		
		// right-facing raycast
		line.start.set(this.sprite.x, this.sprite.y);
		line.end.set(this.sprite.x+x, this.sprite.y+x);
		// left-facing raycast
		line2.start.set(this.sprite.x, this.sprite.y);
		line2.end.set(this.sprite.x-x, this.sprite.y+x);
		
		// debug so we can see them
		game.debug.geom(line);
		game.debug.geom(line2);

	}
	success() {
		console.log("Successful landing");
		this.sprite.body.setZeroVelocity();
		this.landed = true;
	}
	fail() {
		console.log("Too fast, you blew up!");
	}
	landerCollision(body, shape1, shape2, equation) {
		var collisionVelocity = Math.abs(body.velocity.y);
		collisionVelocity <= 15 && (body.angle >= -3 && body.angle <= 3) ? this.success() : this.fail();
	}
}