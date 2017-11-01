import Phaser from 'phaser'
import gameSetup from './gameSetup'
import move from './move'

export default function create(phaser) {
  gameSetup(phaser);
  phaser.add.sprite(0, 0, 'background');

  phaser.map = phaser.add.tilemap('map');
  phaser.map.addTilesetImage('tiles', 'tiles');

  phaser.tileLayer = phaser.map.createLayer('Tile Layer 1');

  phaser.map.setCollisionBetween(1,26, true, phaser.tileLayer);

  phaser.character = phaser.add.sprite(60, 100, 'character');
  phaser.character.anchor.set(0.5);
  phaser.physics.arcade.enable(phaser.character);

  phaser.cursors = phaser.input.keyboard.createCursorKeys();
  move(phaser, Phaser.DOWN);
}
