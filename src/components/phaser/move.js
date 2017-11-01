import Phaser from 'phaser'
import getAngle from './getAngle'

export default function move(phaser, direction) {
  var speed = phaser.speed;
  if (direction === Phaser.LEFT || direction === Phaser.UP) {
      speed = -speed;
  }
  if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
      phaser.character.body.velocity.x = speed;
  } else {
      phaser.character.body.velocity.y = speed;
  }
  phaser.current = direction;
}
