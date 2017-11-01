import Phaser from 'phaser'

export default function gameSetup(phaser, direction) {
  phaser.physics.startSystem(Phaser.Physics.ARCADE);
  phaser.map = null;
  phaser.tileLayer = null;
  phaser.character = null;
  phaser.safetile = -1;
  phaser.gridsize = 40;
  phaser.speed = 120;
  phaser.threshold = 3;
  phaser.turnSpeed = 120;
  phaser.marker = new Phaser.Point();
  phaser.turnPoint = new Phaser.Point();
  phaser.directions = [ null, null, null, null, null ];
  phaser.opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];
  phaser.current = Phaser.UP;
  phaser.turning = Phaser.NONE;
}
