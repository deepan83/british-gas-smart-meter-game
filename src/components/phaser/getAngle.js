import Phaser from 'phaser'

export default function getAngle(phaser, to) {
  //  About-face?
  var opposites = phaser.opposites;
  if (phaser.current === opposites[to])
  {
      return "180";
  }
  if ((phaser.current === Phaser.UP && to === Phaser.LEFT) ||
      (phaser.current === Phaser.DOWN && to === Phaser.RIGHT) ||
      (phaser.current === Phaser.LEFT && to === Phaser.DOWN) ||
      (phaser.current === Phaser.RIGHT && to === Phaser.UP))
  {
      return "-90";
  }
  return "90";
}
