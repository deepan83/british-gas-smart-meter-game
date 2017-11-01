import Phaser from 'phaser'
import checkDirection from './checkDirection'

export default function checkKeys(phaser) {
  if (phaser.cursors.left.isDown && phaser.current !== Phaser.LEFT) {
    checkDirection(phaser, Phaser.LEFT);
  } else if (phaser.cursors.right.isDown && phaser.current !== Phaser.RIGHT) {
    checkDirection(phaser, Phaser.RIGHT);
  } else if (phaser.cursors.up.isDown && phaser.current !== Phaser.UP) {
    checkDirection(phaser, Phaser.UP);
  } else if (phaser.cursors.down.isDown && phaser.current !== Phaser.DOWN) {
    checkDirection(phaser, Phaser.DOWN);
  } else {
    //  phaser forces them to hold the key down to turn the corner
    phaser.turning = Phaser.NONE;
  }
}
