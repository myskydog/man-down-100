import Phaser from "phaser";

import singleSpikeImg from "./assets/single-spike.png";
import spikeBoardImg from "./assets/spike-board.png";
import wheelImg from "./assets/wheel.png";
import normalBoardImg from "./assets/board.png";
import playerImg from "./assets/player.png";
import bounceBoardImg from "./assets/bounce-Board.png";
import heartImg from "./assets/heart.png";

let gameScene = new Phaser.Scene('MainScene');

gameScene.init = function() {
    this.platformComponents = ['wheel-board', 'normal-board', 'spike-board', 'bounce-board'];
    this.score = 0;
    this.health = 3;
};

gameScene.preload = function() {
    this.load.image('single-spike', singleSpikeImg);
    this.load.image('spike-board', spikeBoardImg);
    this.load.image('wheel-board', wheelImg);
    this.load.image('normal-board', normalBoardImg);
    this.load.image('bounce-board', bounceBoardImg);
    this.load.image('player', playerImg);
    this.load.image('heart', heartImg);
};

gameScene.createBoard = function(x, y, boardType) {
    let board;
    if (boardType == 'bounce-board') {
        board = this.physics.add.sprite(x, y, boardType).setOrigin(0, 0).setScale(2);
    } else {
        board = this.physics.add.sprite(x, y, boardType).setOrigin(0, 0);
    }
    board.body.allowGravity = false;
    board.setVelocityY(-80);
    board.setImmovable(true);
    board.bType = boardType;
    if (boardType == 'wheel-board') {
        if (Phaser.Math.Between(0, 1) == 1) {
            board.dir = 1
        } else {
            board.dir = -1
        }
    }

    //10% possibility to generate a heart on a board
    if(Phaser.Math.Between(0,10)<=2){
        const heart = this.physics.add.sprite(x+50, y-20,'heart').setScale(0.05);
        this.physics.add.collider(heart, board);
        this.physics.add.overlap(heart, this.player, function(heart, player){
            if(gameScene.health<3){
                gameScene.health++;    
            }
            heart.destroy();
            // gameScene.killAndHide(heart);
        });
        // heart.body.allowGravity = false;
    }
    return board;
};
gameScene.create = function() {
    this.playerDeath = this.add.tileSprite(0, 0, 17 * 14, 19, 'single-spike').setOrigin(0, 0).setScale(1.5);
    this.physics.add.existing(this.playerDeath);
    this.playerDeath.body.allowGravity = false;
    //this.playerDeath.setImmovable(true);
    this.platforms = this.add.group();
    const aBoard = this.createBoard(250, 300, 'normal-board');
    this.platforms.add(aBoard);
    this.player = this.physics.add.sprite(300, 300 - 80, 'player').setOrigin(0).setScale(0.5);
    this.player.body.collideWorldBounds = true;
    this.spawnEvent = this.time.addEvent({
        delay: 1000,
        loop: true,
        callbackScope: this,
        callback: function() {
            let whichBoard = this.platformComponents[Phaser.Math.Between(0, this.platformComponents.length - 1)];
            const x = Phaser.Math.Between(30, this.game.config.width - 100);
            const b = this.createBoard(x, 600, whichBoard);
            this.platforms.add(b);
            this.score++;
        }
    });

    this.physics.add.collider(this.player, this.playerDeath, function() {
        gameScene.health = 0;
    });

    this.physics.add.collider(this.player, this.platforms, (player, board) => {
        let now = new Date();
        let allowReduceHealth = false;
        if (!player.spikeCollideTime) {
            allowReduceHealth = true;
        } else if (now - player.spikeCollideTime > 1000) {
            allowReduceHealth = true;
        }

        if (board.bType == 'spike-board' && allowReduceHealth && player.body.touching.down) {
            player.spikeCollideTime = new Date();
            gameScene.health--;
        }
        if (board.bType == 'bounce-board') {
            player.setVelocityY(-600);
        }

        if (board.bType == 'wheel-board') {
            player.x -= 2 * board.dir;
        } else {

        }
    });

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.healthLabel = this.add.text(0, 20, 'Health:');
    this.scoreLabel = this.add.text(0, 40, 'Score:');

};

gameScene.checkGameOver = function() {
    if (this.health <= 0 || this.player.y >= 560) {
        this.scene.launch('GameOverScene');
        this.scene.pause();
    }

};
gameScene.update = function() {
    this.healthLabel.setText(`Health: ${this.health}`);
    this.scoreLabel.setText(`score: ${this.score}`);
    this.checkGameOver();

    if (this.cursorKeys.right.isDown) {
        this.player.x += 4;
    } else if (this.cursorKeys.left.isDown) {
        this.player.x -= 4;
    }
    if (this.cursorKeys.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(-600);
    }
};
export default gameScene;