import Phaser from 'phaser'
import getFrameKeys from './util/getFrameKeys'

export default class {
  constructor(phaser, Character, position, type) {
    this.phaser = phaser;
    this.Character = Character;
    this.animations = {};
    this.type = type
    this.position = position
    this.createSprite();
    this.createScoreSprite();
    this.createPoofSprite();
  }
  createSprite() {
    this.sprite = this.phaser.add.sprite(this.position.x, this.position.y, 'objects', this.type.name + '/1');
    this.sprite.anchor.set(0.5);
    this.animations.puls = this.phaser.add.tween(this.sprite);
    // properties, duration, ease, autoStart, delay, repeat, yoyo
    this.animations.puls.to({alpha: 0}, 200, "Linear", false, 0, 5).yoyo(true, 0);
    this.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  createScoreSprite() {
    this.scoreSprite = this.phaser.add.sprite(this.position.x, this.position.y, 'objects', 'score/' + this.type.score + '/1');
    this.scoreSprite.scale.setTo(0,0);
    this.scoreSprite.anchor.set(0.5,1);
    this.animations.score = this.scoreSprite.animations.add('score', getFrameKeys('score/250', this.phaser.cache.getFrameData('objects')));
  }
  createPoofSprite() {
    this.poofSprite = this.phaser.add.sprite(this.position.x, this.position.y, 'objects', 'poof/1');
    this.poofSprite.scale.setTo(0,0);
    this.animations.poof = this.poofSprite.animations.add('poof', getFrameKeys('poof', this.phaser.cache.getFrameData('objects')));
    this.poofSprite.anchor.set(0.5);
  }
  hit() {
    this.hitting = true;
    this.animations.puls.stop();
    this.sprite.kill();
    this.animations.poof.onComplete.add(() => {
      this.poofSprite.kill();
      this.animations.score.onComplete.add(() => {
        setTimeout(() => {
          this.scoreSprite.kill();
          this.call('onHit', [this.type.score]);
        }, 250);
      });
      this.scoreSprite.scale.setTo(1,1);
      this.animations.score.play(15)
    });
    this.poofSprite.scale.setTo(1,1);
    this.animations.poof.play(10)
  }
  update() {
    if (!this.hitting) {
      this.phaser.physics.arcade.overlap(this.sprite, this.Character.sprite, this.hit, null, this);
    }
  }
  kill() {
    this.sprite.kill();
    this.scoreSprite.kill();
    this.poofSprite.kill();
  }
  remove(callback) {
    this.animations.puls.onComplete.add(() => {
      this.kill();
      callback();
    });
    this.animations.puls.start();
  }
  call(functionName, params) {
    if (typeof this[functionName] === 'function') {
      this[functionName](...params);
    }
  }
}
