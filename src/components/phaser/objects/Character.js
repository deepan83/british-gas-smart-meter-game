import getFrameKeys from '../util/getFrameKeys'

class Character extends Phaser.Sprite {
  threshold = 3;
  speed = 160;
  turnSpeed = 120;
  marker = new Phaser.Point();
  turnPoint = new Phaser.Point();
  directions = [ null, null, null, null, null ];
  opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];
  turning = Phaser.NONE;
  constructor(game, gameMap, selectedCharacter) {
    let characterPosition = {
      x: gameMap.getFriendlySpawn().worldX + gameMap.halfTile,
      y: gameMap.getFriendlySpawn().worldY + gameMap.halfTile,
    }
    super(game, characterPosition.x, characterPosition.y, 'objects', selectedCharacter + '/down/1')
    this.gameMap = gameMap;
    this.anchor.set(0.5);
    this.animations.add('walk' + Phaser.LEFT, getFrameKeys(selectedCharacter + '/left', this.game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.RIGHT, getFrameKeys(selectedCharacter + '/right', this.game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.UP, getFrameKeys(selectedCharacter + '/up', this.game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.DOWN, getFrameKeys(selectedCharacter + '/down', this.game.cache.getFrameData('objects')));
    this.game.add.existing(this);
    this.game.physics.arcade.enable(this);
    // this.createDPad();
    this.move(Phaser.DOWN)
    this.cursors = game.input.keyboard.createCursorKeys();
  }
  createDPad() {
    var dPadPosition = {
      y: this.game.world.height - 140,
      x: this.game.world.width - 140,
    }
    this.dPad = {
      left: this.game.add.button(dPadPosition.y + 40, dPadPosition.x + 40, 'objects', function() {console.log('something')}, null, 'd-pad/left', 'd-pad/left')
    }

    this.dPad.left.onInputUp.add(() => {
      console.log('lala');
    },this)
  }
  update() {
    if (this.activateCollision()) {
      this.animations.stop();
    }

    this.marker.x = this.game.math.snapToFloor(Math.floor(this.x), this.gameMap.tileSize) / this.gameMap.tileSize;
    this.marker.y = this.game.math.snapToFloor(Math.floor(this.y), this.gameMap.tileSize) / this.gameMap.tileSize;

    //  Update our grid sensors
    this.directions[1] = this.gameMap.getTileLeft(this.gameMap.tileLayer.index, this.marker.x, this.marker.y);
    this.directions[2] = this.gameMap.getTileRight(this.gameMap.tileLayer.index, this.marker.x, this.marker.y);
    this.directions[3] = this.gameMap.getTileAbove(this.gameMap.tileLayer.index, this.marker.x, this.marker.y);
    this.directions[4] = this.gameMap.getTileBelow(this.gameMap.tileLayer.index, this.marker.x, this.marker.y);

    this.checkKeys();

    if (this.turning !== Phaser.NONE) {
      this.turn();
    }
  }
  activateCollision() {
    return this.game.physics.arcade.collide(this, this.gameMap.tileLayer);
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

    if (this.turning === turnTo || this.directions[turnTo] === null || this.directions[turnTo].index !== this.gameMap.safetile) {
      //  Invalid direction if they're already set to turn that way
      //  Or there is no tile there, or the tile isn't index a floor tile
      return;
    }

    //  Check if they want to turn around and can
    if (this.currentDirection === this.opposites[turnTo]) {
      this.move(turnTo);
    } else {
      this.turning = turnTo;

      this.turnPoint.x = (this.marker.x * this.gameMap.tileSize) + this.gameMap.halfTile;
      this.turnPoint.y = (this.marker.y * this.gameMap.tileSize) + this.gameMap.halfTile;
    }
  }
  move(direction) {
    var speed = this.speed;

    if (direction === Phaser.LEFT || direction === Phaser.UP) {
      speed = -speed;
    }

    if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
        this.body.velocity.x = speed;
    } else {
        this.body.velocity.y = speed;
    }

    this.animations.play('walk'+direction, 10, true);

    this.currentDirection = direction;
  }
  turn() {
    var cx = Math.floor(this.x);
    var cy = Math.floor(this.y);

    //  This needs a threshold, because at high speeds you can't turn because the coordinates skip past
    if (!this.game.math.fuzzyEqual(cx, this.turnPoint.x, this.threshold) || !this.game.math.fuzzyEqual(cy, this.turnPoint.y, this.threshold)) {
      return false;
    }

    this.x = this.turnPoint.x;
    this.y = this.turnPoint.y;

    this.body.reset(this.turnPoint.x, this.turnPoint.y);

    this.move(this.turning);

    this.turning = Phaser.NONE;

    return true;
  }
}
export default Character
