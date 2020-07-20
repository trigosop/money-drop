import Phaser from 'phaser';

import Game from './scenes/Game';

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  parent: 'game',
  scene: [Game],
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 200,
      },
    },
  },
});
