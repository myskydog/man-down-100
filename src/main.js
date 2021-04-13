import singleSpikeImg from "./assets/single-spike.png";
import spikeBoardImg from "./assets/spike-board.png";
import wheelImg from "./assets/wheel.png";
import normalBoardImg from "./assets/board.png";
import playerImg from "./assets/player.png";
import "./style.css";
import Phaser from "phaser";

let gameScene = new Phaser.Scene('Game');

gameScene.init = function() {
    this.platformComponents = ['wheel-board', 'normal-board', 'spike-board'];
};

gameScene.preload = function() {
    this.load.image('single-spike', singleSpikeImg);
    this.load.image('spike-board', spikeBoardImg);
    this.load.image('wheel-board', wheelImg);
    this.load.image('normal-board', normalBoardImg);
    this.load.image('player', playerImg);
};
gameScene.createBoard = function(x, y, boardType) {

    const board = this.physics.add.sprite(x, y, boardType).setOrigin(0, 0);
    board.body.allowGravity = false;
    board.setVelocityY(-80);
    board.setImmovable(true);
    board.bType = boardType;
    return board;
};
gameScene.create = function() {
    this.add.tileSprite(0, 0, 17 * 14, 19, 'single-spike').setOrigin(0, 0).setScale(1.5);
    this.platforms = this.add.group();
    const aBoard = this.createBoard(250, 300, 'normal-board');
    this.platforms.add(aBoard);
    this.player = this.physics.add.sprite(300,300-80,'player').setScale(0.5);
    
    this.spawnEvent = this.time.addEvent({
        delay: 1000,
        loop: true,
        callbackScope: this,
        callback: function() {
            let whichBoard = this.platformComponents[Phaser.Math.Between(0, this.platformComponents.length-1)];
            const x = Phaser.Math.Between(30, config.width - 100);
            const b = this.createBoard(x,600, whichBoard);
            this.platforms.add(b);
        }
    });

    this.physics.add.collider(this.player, this.platforms, function(player, board){
    	let now = new Date();
    	let allowReduceHealth = false;
    	if (!player.spikeCollideTime){
    		allowReduceHealth = true;
    	}else if(now - player.spikeCollideTime>1000){
    		allowReduceHealth = true;
    	}

    	if(board.bType=='spike-board' && allowReduceHealth){
    		player.spikeCollideTime = new Date();
    		player.health--;
    	}
    });

    this.cursorKeys = this.input.keyboard.createCursorKeys();
    this.cursorKeys.space.on('down', function() {

        // this.spawnEvent.paused = !this.spawnEvent.paused;
        // if (this.cursorKeys.space.isDown) {
        //     if (this.scene.isPaused()) {
        //         this.scene.resume();
        //     } else {
        //         this.scene.pause();
        //     }
        // }
    }, this);
    this.player.health = 3;
    this.healthLabel = this.add.text(0,20, 'Health:');
    this.scoreLabel = this.add.text(0,40, 'Score:');
    
};
gameScene.checkGameOver = function(){
	if(this.player.health<=0){
		this.gameOver = true;
		// this.gameOverLabel.visible = true;
	}
};
gameScene.update = function() {
    if (this.cursorKeys.right.isDown) {
    	this.player.setVelocityX(200);
    }else if (this.cursorKeys.left.isDown) {
    	this.player.setVelocityX(-200);
    }else{
    	this.player.setVelocityX(0);
    }
    this.healthLabel.setText(`Health: ${this.player.health}`);
};

let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 600,
    scene: gameScene,
    title: '100',
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: true
        }
    }
};

let game = new Phaser.Game(config);

// let gameOverScene = new Phaser.Scene("Game");