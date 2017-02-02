var LoadGame = function () {};

LoadGame.prototype = {
    loadScripts: function () {
        game.load.script('MainGame', 'js/game/maingame.js');
        game.load.script('MainMenu', 'js/game/mainmenu.js');
        game.load.script('options', 'js/game/options.js');
    },

    loadAudio: function () {

    },

    loadImages: function () {
		game.load.image('level','js/game/assets/level.PNG');
		game.load.image('lander','js/game/assets/lander.PNG');
    },

    loadFonts: function () {

    },

    init: function () {
    },

    preload: function () {
        this.game.load.physics("level_physics", "js/game/assets/LEVEL_COLLISION.json");
        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadAudio();
    },

    addGameStates: function () {
        game.state.add("MainGame", MainGame);
        game.state.add("MainMenu", MainMenu);
        game.state.add("Options", Options);
    },

    addGameMusic: function () {

    },
    create: function () {
        this.addGameStates();
        this.addGameMusic();
		game.state.start('MainMenu');
    }
};
