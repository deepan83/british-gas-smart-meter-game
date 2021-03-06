import getFrameKeys from '../util/getFrameKeys'

class Character extends Phaser.Sprite {
  threshold = 5;
  speed = 160;
  turnSpeed = 120;
  marker = new Phaser.Point();
  turnPoint = new Phaser.Point();
  directions = [ null, null, null, null, null ];
  opposites = [ Phaser.NONE, Phaser.RIGHT, Phaser.LEFT, Phaser.DOWN, Phaser.UP ];
  turning = Phaser.NONE;
  constructor(game, gameMap, controls, selectedCharacter) {
    let characterPosition = {
      x: gameMap.getFriendlySpawn().worldX + gameMap.halfTile,
      y: gameMap.getFriendlySpawn().worldY + gameMap.halfTile,
    }
    super(game, characterPosition.x, characterPosition.y, 'objects', selectedCharacter + '/down/1')
    this.gameMap = gameMap;
    this.controls = controls;
    this.selectedCharacter = selectedCharacter;
    this.initAnimations();
    this.anchor.set(0.5);
    this.game.add.existing(this);
    this.stepsAudio = this.game.add.audio('steps', .2, true);

    this.highlighter();

    this.game.physics.arcade.enable(this);
    this.game.onFinish.add(() => {
      this.animations.stop();
      this.stepsAudio.stop();
      this.body.velocity.x = 0;
      this.body.velocity.y = 0;
    });
    this.move(Phaser.DOWN)
  }
  highlighter() {
    this.highlight = this.game.add.graphics(this.x, this.y);
    this.highlight.anchor.set(.5);

    this.highlight.beginFill(0xFFFFFF, 1);
    this.highlight.drawCircle(0, 0, 60);

    var alphaTween = this.game.add.tween(this.highlight);
    var scaleTween = this.game.add.tween(this.highlight.scale);
    alphaTween.to({alpha: 0}, 200, "Linear", true, 0, -1).yoyo(true, 0);
    scaleTween.to({x: 0, y: 0}, 600, "Linear", true, 0, -1).yoyo(true, 0);
    this.game.onStart.add(() => {
      alphaTween.stop();
      scaleTween.stop();
      this.highlight.alpha = 0;
    });
  }
  initAnimations() {
    this.animations.add('walk' + Phaser.LEFT, getFrameKeys(this.selectedCharacter + '/left', this.game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.RIGHT, getFrameKeys(this.selectedCharacter + '/right', this.game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.UP, getFrameKeys(this.selectedCharacter + '/up', this.game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.DOWN, getFrameKeys(this.selectedCharacter + '/down', this.game.cache.getFrameData('objects')));
  }
  update() {
    if (this.activateCollision()) {
      this.animations.stop();
      this.stepsAudio.stop();
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
    if (this.controls.direction && this.currentDirection !== this.controls.direction){
      this.checkDirection(this.controls.direction);
    }
  }
  checkDirection(turnTo) {
    if (this.directions[turnTo] === null || this.directions[turnTo].index !== this.gameMap.safetile) {
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
    if (this.game.objectsPaused) {
      return;
    }
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

    this.stepsAudio.play('', 0);

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
  bringToTop() {
    this.game.world.bringToTop(this.highlight);
    this.game.world.bringToTop(this);
  }
}
export default Character
