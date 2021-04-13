var gameOverScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function gameOverScene() {
        Phaser.Scene.call(this, {
            key: 'gameOver'
        });
    },

    preload: function() {
        // this.load.image('face', 'assets/pics/bw-face.png');
    },

    create: function() {
        // this.add.image(400, 300, 'face').setAlpha(0.5);
        this.gameOverLabel = this.add.text(150, 250, "Game Over", {
            fontSize: '50px'
        });
        this.startLabel = this.add.text(150,350, "Start Game", {fontSize: '50px'});

        this.startLabel.setInteractive().on('pointerup',function(pointer, x, y, e){
            this.scene.resume('main');
        });
        // this.input.once('pointerdown', function() {

        //     this.scene.resume('sceneA');

        // }, this);
    }

});