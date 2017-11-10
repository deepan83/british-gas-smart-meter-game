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
  }
  createSprite() {
    this.sprite = this.phaser.add.sprite(this.position.x, this.position.y, 'objects', this.type.name + '/1');
    this.animations.puls = this.sprite.animations.add('puls', getFrameKeys(this.type.name, this.phaser.cache.getFrameData('objects')));
    this.sprite.anchor.set(0.5);
    this.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  createScoreSprite() {
    this.scoreSprite = this.phaser.add.sprite(this.position.x, this.position.y, 'objects', 'score/' + this.type.score + '/1');
    this.animations.flash = this.scoreSprite.animations.add('flash', getFrameKeys('score/' + this.type.score, this.phaser.cache.getFrameData('objects')));
    this.scoreSprite.anchor.set(0.5);
  }
  hit() {
    this.hitting = true;
    this.animations.puls.onComplete.add(() => {
      this.animations.flash.onComplete.add(() => {
        this.kill();
        this.call('onHit', [this.type.score]);
      });
      this.animations.flash.play(30)
    });
    this.animations.puls.play(30);
  }
  update() {
    if (!this.hitting) {
      this.phaser.physics.arcade.overlap(this.sprite, this.Character.sprite, this.hit, null, this);
    }
  }
  kill() {
    this.sprite.kill();
    this.scoreSprite.kill();
  }
  remove() {
    this.animations.puls.onComplete.add(() => {
      this.kill();
    });
    this.animations.puls.play();
  }
  call(functionName, params) {
    if (typeof this[functionName] === 'function') {
      this[functionName](...params);
    }
  }
}
