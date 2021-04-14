import Phaser from "phaser";

import restartButtonImg from './assets/restart-btn.png';

let gameOverScene = new Phaser.Scene('GameOverScene');

gameOverScene.preload=function(){
    this.load.image('rst.btn', restartButtonImg);
};
gameOverScene.create = function(){

    this.add.text(10, 200, 'Game Over!',{
            fontSize: '60px'
    });
    // this.add.text(140,400, `Score: ${gameScene.score}`)
    const rst = this.add.sprite(180,300,'rst.btn').setScale(0.25);
    rst.setInteractive();
    rst.on('pointerdown', function(){
        // this.scene.resume("MainScene");
        this.scene.get("MainScene").scene.restart();
        this.scene.stop();
    }, this);
}

export default gameOverScene;