import Phaser from 'phaser'
import gameSetup from './gameSetup'

export default function create(phaser) {
  gameSetup(phaser);
  phaser.add.sprite(0, 0, 'background');

  phaser.map.create();
  phaser.character.create();
  phaser.objects.create();
  phaser.objects.onScore = (score) => {
    this.score += score;
  };
  phaser.cursors = phaser.input.keyboard.createCursorKeys();
}
