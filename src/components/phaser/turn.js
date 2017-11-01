import move from './move'

export default function turn(phaser) {
  var cx = Math.floor(phaser.character.x);
  var cy = Math.floor(phaser.character.y);
  //  phaser needs a threshold, because at high speeds you can't turn because the coordinates skip past
  if (!phaser.math.fuzzyEqual(cx, phaser.turnPoint.x, phaser.threshold) || !phaser.math.fuzzyEqual(cy, phaser.turnPoint.y, phaser.threshold)) {
    return false;
  }
  phaser.character.x = phaser.turnPoint.x;
  phaser.character.y = phaser.turnPoint.y;
  phaser.character.body.reset(phaser.turnPoint.x, phaser.turnPoint.y);
  move(phaser, phaser.turning);
  phaser.turning = Phaser.NONE;
  return true;
}
