import Phaser from 'phaser'
import checkKeys from './checkKeys'
import turn from './turn'

export default function update(phaser) {
  phaser.physics.arcade.collide(phaser.character, phaser.tileLayer);
  phaser.marker.x = phaser.math.snapToFloor(Math.floor(phaser.character.x), phaser.gridsize) / phaser.gridsize;
  phaser.marker.y = phaser.math.snapToFloor(Math.floor(phaser.character.y), phaser.gridsize) / phaser.gridsize;
  //  Update our grid sensors
  phaser.directions[1] = phaser.map.getTileLeft(phaser.tileLayer.index, phaser.marker.x, phaser.marker.y);
  phaser.directions[2] = phaser.map.getTileRight(phaser.tileLayer.index, phaser.marker.x, phaser.marker.y);
  phaser.directions[3] = phaser.map.getTileAbove(phaser.tileLayer.index, phaser.marker.x, phaser.marker.y);
  phaser.directions[4] = phaser.map.getTileBelow(phaser.tileLayer.index, phaser.marker.x, phaser.marker.y);
  checkKeys(phaser);
  if (phaser.turning !== Phaser.NONE) {
    turn(phaser);
  }
}
