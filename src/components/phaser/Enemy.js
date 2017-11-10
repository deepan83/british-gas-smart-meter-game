import Phaser from 'phaser'
import PathFinderPlugin from 'phaser_plugin_pathfinding/bin/phaser_pathfinding-0.2.0.js';
import enemy from 'img/enemy.png'

export default class {
  constructor(phaser, GameMap) {
    this.followingPath = false;
    this.pathToFollow = [];
    this.phaser = phaser;
    this.GameMap = GameMap;
    this.speed = 80;
    this.phaser.load.spritesheet('enemy', enemy, 40, 40);
  }
  create(x, y) {
    this.sprite = this.phaser.add.sprite(x, y, 'enemy');
    // this.sprite.anchor.set(0.5);
    this.sprite.animations.add('walk' + Phaser.LEFT, [0,1,2]);
    this.sprite.animations.add('walk' + Phaser.RIGHT, [3,4,5]);
    this.sprite.animations.add('walk' + Phaser.UP, [0,1,4,5]);
    this.sprite.animations.add('walk' + Phaser.DOWN, [0,1,4,5]);

    this.pathfinder = this.phaser.game.plugins.add(Phaser.Plugin.PathFinderPlugin);
    this.pathfinder.setGrid(this.GameMap.getLayerData(), [this.GameMap.safetile]);
    this.phaser.physics.arcade.enable(this.sprite);


    this.movingTween = this.phaser.add.tween(this.sprite);
    this.movingTween.onComplete.add(() => {
        this.followingPath = false;
        this.followPath();
    });
  }
  update() {
    if (!this.followingPath) {
      let gotoTile = this.GameMap.randomSafeTile()
      this.findPathTo(gotoTile.x, gotoTile.y);
    }
    this.followPath();
  }
  findPathTo(tilex, tiley) {
    this.pathfinder.setCallbackFunction((path) => {
        if (path === null) {
            return;
        }
        this.pathToFollow = path;
    });
    this.pathfinder.preparePathCalculation([this.GameMap.tileLayer.getTileX(this.sprite.x), this.GameMap.tileLayer.getTileY(this.sprite.y)], [tilex,tiley]);
    this.pathfinder.calculatePath();
  }
  followPath() {
    if (!this.pathToFollow.length || this.followingPath) {
        return;
    }
    var next = this.pathToFollow.shift();
    if (!next) {
        return;
    }

    var x = (next.x * this.GameMap.gridsize);
    var y = (next.y * this.GameMap.gridsize);
    // console.log("moving to", x, y, next);
    this.followingPath = true;
    this.movingTween.target = this.sprite;
    this.movingTween.timeline = [];
    this.movingTween.to({x, y}, 300);
    this.movingTween.start();
  }
}
