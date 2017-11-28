import Phaser from 'phaser'
import character from 'img/character.png'

export default class {
  threshold = 3;
  speed = 160;
  turnSpeed = 120;
  marker = new Phaser.Point();
  turnPoint = new Phaser.Point();
  directions = [ null, null, null, null, null ];
  opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];
  turning = Phaser.NONE;
  constructor(phaser, {map, selectedCharacter}) {
    this.phaser = phaser;
    this.character = selectedCharacter;
    this.GameMap = map;
    this.phaser.load.spritesheet('character', character, 40, 40);
    this.cursors = phaser.input.keyboard.createCursorKeys();
  }
  create() {
    var spritePosition = {
      x: this.GameMap.getFriendlySpawn().worldX + (this.GameMap.gridsize / 2),
      y: this.GameMap.getFriendlySpawn().worldY + (this.GameMap.gridsize / 2),
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

    this.marker.x = this.phaser.math.snapToFloor(Math.floor(this.sprite.x), this.GameMap.gridsize) / this.GameMap.gridsize;
    this.marker.y = this.phaser.math.snapToFloor(Math.floor(this.sprite.y), this.GameMap.gridsize) / this.GameMap.gridsize;

    //  Update our grid sensors
    this.directions[1] = this.GameMap.map.getTileLeft(this.GameMap.tileLayer.index, this.marker.x, this.marker.y);
    this.directions[2] = this.GameMap.map.getTileRight(this.GameMap.tileLayer.index, this.marker.x, this.marker.y);
    this.directions[3] = this.GameMap.map.getTileAbove(this.GameMap.tileLayer.index, this.marker.x, this.marker.y);
    this.directions[4] = this.GameMap.map.getTileBelow(this.GameMap.tileLayer.index, this.marker.x, this.marker.y);

    this.checkKeys();

    if (this.turning !== Phaser.NONE) {
      this.turn();
    }
  }
  activateCollision() {
    return this.phaser.physics.arcade.collide(this.sprite, this.GameMap.tileLayer);
  }
  checkKeys() {
    if (this.cursors.left.isDown && this.currentDirection !== Phaser.LEFT) {
      this.checkDirection(Phaser.LEFT);
    } else if (this.cursors.right.isDown && this.currentDirection !== Phaser.RIGHT) {
      this.checkDirection(Phaser.RIGHT);
    } else if (this.cursors.up.isDown && this.currentDirection !== Phaser.UP) {
      this.checkDirection(Phaser.UP);
    } else if (this.cursors.down.isDown && this.currentDirection !== Phaser.DOWN) {
      this.checkDirection(Phaser.DOWN);
    } else {
      //  This forces them to hold the key down to turn the corner
      this.turning = Phaser.NONE;
    }
  }
  checkDirection(turnTo) {

    if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.GameMap.safetile) {
      //  Invalid direction if they're already set to turn that way
      //  Or there is no tile there, or the tile isn't index a floor tile
      return;
    }

    //  Check if they want to turn around and can
    if (this.currentDirection === this.opposites[turnTo]) {
      this.move(turnTo);
    } else {
      this.turning = turnTo;

      this.turnPoint.x = (this.marker.x * this.GameMap.gridsize) + (this.GameMap.gridsize / 2);
      this.turnPoint.y = (this.marker.y * this.GameMap.gridsize) + (this.GameMap.gridsize / 2);
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
    if (!this.phaser.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.phaser.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold)) {
      return false;
    }

    this.sprite.x = this.turnPoint.x;
    this.sprite.y = this.turnPoint.y;

    this.sprite.body.reset(this.turnPoint.x, this.turnPoint.y);

    this.move(this.turning);

    this.turning = Phaser.NONE;

    return true;
  }
}
