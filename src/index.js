import Phaser from "phaser";

import mainScene from './main-scene.js';
import gameOverScene from './game-over-scene.js';
import "./style.css";

let config = {
    type: Phaser.AUTO,
    width: 360,
    height: 600,
    scene: [mainScene, gameOverScene],
    title: '100',
    pixelArt: false,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000
            },
            debug: false
        }
    }
};
let game = new Phaser.Game(config);