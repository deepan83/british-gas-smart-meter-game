import move from './move'

export default function checkKeys(phaser, turnTo) {
  if (phaser.turning === turnTo || phaser.directions[turnTo] === null || phaser.directions[turnTo].index !== phaser.safetile) {
    //  Invalid direction if they're already set to turn that way
    //  Or there is no tile there, or the tile isn't index a floor tile
    return;
  }
  //  Check if they want to turn around and can
  if (phaser.current === phaser.opposites[turnTo]) {
    move(phaser, turnTo);
  } else {
    phaser.turning = turnTo;
    phaser.turnPoint.x = (phaser.marker.x * phaser.gridsize) + (phaser.gridsize / 2);
    phaser.turnPoint.y = (phaser.marker.y * phaser.gridsize) + (phaser.gridsize / 2);
  }
}
