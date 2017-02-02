var game = new Phaser.Game(1920, 1080, Phaser.AUTO, ''), Main = function () {};

Main.prototype = {

    preload: function () {
        game.load.script('loadGame', 'js/game/loadGame.js');
    },

    create: function () {
        game.state.add('LoadGame', LoadGame);
        game.state.start('LoadGame');
    }

};

game.state.add('Main', Main);
game.state.start('Main');
