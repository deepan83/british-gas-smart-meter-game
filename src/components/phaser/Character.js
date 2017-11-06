import Phaser from 'phaser'
import character from 'img/character.png'

export default class {
  constructor(phaser) {
    this.phaser = phaser;
    this.speed = 80;
    this.phaser.load.spritesheet('character', character, 40, 40);
  }
  create() {
    var spritePosition = {
      x: this.phaser.map.getFriendlySpawn().worldX + (this.phaser.gridsize / 2),
      y: this.phaser.map.getFriendlySpawn().worldY + (this.phaser.gridsize / 2),
    }
    this.sprite = this.phaser.add.sprite(spritePosition.x, spritePosition.y, 'character');
    this.sprite.anchor.set(0.5);
    this.sprite.animations.add('walk' + Phaser.LEFT, [0,1,2]);
    this.sprite.animations.add('walk' + Phaser.RIGHT, [3,4,5]);
    this.sprite.animations.add('walk' + Phaser.UP, [0,1,4,5]);
    this.sprite.animations.add('walk' + Phaser.DOWN, [0,1,4,5]);
    this.phaser.physics.arcade.enable(this.sprite);
    this.move(Phaser.DOWN)
  }
  update() {
    if (this.activateCollision()) {
      this.sprite.animations.stop();
    }

    this.phaser.marker.x = this.phaser.math.snapToFloor(Math.floor(this.sprite.x), this.phaser.gridsize) / this.phaser.gridsize;
    this.phaser.marker.y = this.phaser.math.snapToFloor(Math.floor(this.sprite.y), this.phaser.gridsize) / this.phaser.gridsize;

    //  Update our grid sensors
    this.phaser.directions[1] = this.phaser.map.map.getTileLeft(this.phaser.map.tileLayer.index, this.phaser.marker.x, this.phaser.marker.y);
    this.phaser.directions[2] = this.phaser.map.map.getTileRight(this.phaser.map.tileLayer.index, this.phaser.marker.x, this.phaser.marker.y);
    this.phaser.directions[3] = this.phaser.map.map.getTileAbove(this.phaser.map.tileLayer.index, this.phaser.marker.x, this.phaser.marker.y);
    this.phaser.directions[4] = this.phaser.map.map.getTileBelow(this.phaser.map.tileLayer.index, this.phaser.marker.x, this.phaser.marker.y);

    this.checkKeys();

    if (this.turning !== Phaser.NONE) {
      this.turn();
    }
  }
  activateCollision() {
    return this.phaser.physics.arcade.collide(this.sprite, this.phaser.map.tileLayer);
  }
  checkKeys() {
    if (this.phaser.cursors.left.isDown && this.currentDirection !== Phaser.LEFT) {
      this.checkDirection(Phaser.LEFT);
    } else if (this.phaser.cursors.right.isDown && this.currentDirection !== Phaser.RIGHT) {
      this.checkDirection(Phaser.RIGHT);
    } else if (this.phaser.cursors.up.isDown && this.currentDirection !== Phaser.UP) {
      this.checkDirection(Phaser.UP);
    } else if (this.phaser.cursors.down.isDown && this.currentDirection !== Phaser.DOWN) {
      this.checkDirection(Phaser.DOWN);
    } else {
      //  This forces them to hold the key down to turn the corner
      this.turning = Phaser.NONE;
    }
  }
  checkDirection(turnTo) {

    if (this.turning === turnTo || this.phaser.directions[turnTo] === null || this.phaser.directions[turnTo].index !== this.phaser.safetile) {
      //  Invalid direction if they're already set to turn that way
      //  Or there is no tile there, or the tile isn't index a floor tile
      return;
    }

    //  Check if they want to turn around and can
    if (this.currentDirection === this.phaser.opposites[turnTo]) {
      this.move(turnTo);
    } else {
      this.turning = turnTo;

      this.phaser.turnPoint.x = (this.phaser.marker.x * this.phaser.gridsize) + (this.phaser.gridsize / 2);
      this.phaser.turnPoint.y = (this.phaser.marker.y * this.phaser.gridsize) + (this.phaser.gridsize / 2);
    }
  }
  move(direction) {
    var speed = this.speed;

    if (direction === Phaser.LEFT || direction === Phaser.UP) {
      speed = -speed;
    }

    if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
        this.sprite.body.velocity.x = speed;
    } else {
        this.sprite.body.velocity.y = speed;
    }

    this.sprite.animations.play('walk'+direction, 30, true);

    this.currentDirection = direction;
  }
  turn() {
    var cx = Math.floor(this.sprite.x);
    var cy = Math.floor(this.sprite.y);

    //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
    if (!this.phaser.math.fuzzyEqual(cx, this.phaser.turnPoint.x, this.phaser.threshold) || !this.phaser.math.fuzzyEqual(cy, this.phaser.turnPoint.y, this.phaser.threshold)) {
      return false;
    }

    this.sprite.x = this.phaser.turnPoint.x;
    this.sprite.y = this.phaser.turnPoint.y;

    this.sprite.body.reset(this.phaser.turnPoint.x, this.phaser.turnPoint.y);

    this.move(this.turning);

    this.turning = Phaser.NONE;

    return true;
  }
}
