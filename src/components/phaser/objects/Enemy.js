import Phaser from 'phaser'
import PathFinderPlugin from 'phaser_plugin_pathfinding/bin/phaser_pathfinding-0.2.0.js';
import getFrameKeys from '../util/getFrameKeys'

class Enemy extends Phaser.Sprite {
  frozen = true;
  forceFrozen = false;
  followingPath = false;
  pathToFollow = [];
  hitting = [];
  speed = 80;
  constructor(game, x, y, gameMap, character) {
    var enemy = ['girl', 'boy'][Math.floor(Math.random()*2)];
    super(game, x, y, 'objects', enemy + '/down/1')

    this.gameMap = gameMap;
    this.character = character;

    // this.anchor.set(0.5);
    this.animations.add('walk' + Phaser.LEFT, getFrameKeys(enemy + '/left', game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.RIGHT, getFrameKeys(enemy + '/right', game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.UP, getFrameKeys(enemy + '/up', game.cache.getFrameData('objects')));
    this.animations.add('walk' + Phaser.DOWN, getFrameKeys(enemy + '/down', game.cache.getFrameData('objects')));

    this.freezeAudio = this.game.add.audio('freeze');

    this.pathfinder = game.plugins.add(Phaser.Plugin.PathFinderPlugin);
    this.pathfinder.setGrid(gameMap.getLayerData(), [gameMap.safetile]);
    game.physics.arcade.enable(this);

    this.movingTween = this.game.add.tween(this);
    this.movingTween.onComplete.add(() => {
        this.followingPath = false;
        this.followPath();
    });
    this.game.onStart.add(() => {
      this.frozen = false;
    });
    this.game.onFinish.add(() => {
      this.frozen = true;
      this.forceFrozen = true;
      this.animations.stop();
    });
  }
  update() {
    this.checkHitting(this.character, 'character', this.freeze);
    if (!this.followingPath) {
      let gotoTile = this.gameMap.randomSafeTile()
      this.findPathTo(gotoTile.x, gotoTile.y);
    }
    this.followPath();
  }
  checkHitting(object, type, callback) {
    if (!this.hitting[type] && this.overlap(object)) {
      this.hitting[type] = true;
      callback.call(this);
    } else if (this.hitting[type] && !this.overlap(object)) {
      this.hitting[type] = false;
    }
  }
  overlap(object) {
    return this.game.physics.arcade.overlap(this, object);
  }
  freeze() {
    if (!this.frozen) {
      this.freezeAudio.play();
      this.animations.stop();
      this.frozen = true;
      let freezeTimer = this.game.time.create(false);
      freezeTimer.create(5000, false, 0, () => {
        if (!this.forceFrozen) {
          this.frozen = false;
        }
      });
      freezeTimer.start();
    }
  }
  findPathTo(tilex, tiley) {
    this.pathfinder.setCallbackFunction((path) => {
        if (path === null) {
            return;
        }
        this.pathToFollow = path;
    });
    this.pathfinder.preparePathCalculation([this.gameMap.tileLayer.getTileX(this.x), this.gameMap.tileLayer.getTileY(this.y)], [tilex,tiley]);
    this.pathfinder.calculatePath();
  }
  followPath() {
    if (!this.pathToFollow.length || this.followingPath || this.frozen) {
        return;
    }

    var current = {
      x: this.x / this.gameMap.tileSize,
      y: this.y /this.gameMap.tileSize
    };
    var next = this.pathToFollow.shift();

    if (!next) {
        return;
    }

    var direction = '';

    if (next.x > current.x) {
      direction = Phaser.RIGHT;
    } else if (next.x < current.x) {
      direction = Phaser.LEFT;
    } else if (next.y < current.y) {
      direction = Phaser.UP;
    } else if (next.y > current.y) {
      direction = Phaser.DOWN;
    }

    this.animations.play('walk'+direction, 10, true);

    var x = (next.x * this.gameMap.tileSize);
    var y = (next.y * this.gameMap.tileSize);
    // console.log("moving to", x, y, next);
    this.followingPath = true;
    // this.movingTween.target = this;
    this.movingTween.timeline = [];
    this.movingTween.to({x, y}, 300);
    this.movingTween.start();
  }
}
export default Enemy
