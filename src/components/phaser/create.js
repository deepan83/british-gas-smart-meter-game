import Phaser from 'phaser'
import gameSetup from './gameSetup'

export default function create(phaser) {
  gameSetup(phaser);
  phaser.add.sprite(0, 0, 'background');

  for (var i = 0; i <= phaser.lifeCycleListeners.length - 1; i++) {
    phaser.lifeCycleListeners[i].create();
  }

  phaser.bonusCollection.onScore = (score) => {
    this.score += score;
  };
  phaser.cursors = phaser.input.keyboard.createCursorKeys();
}
