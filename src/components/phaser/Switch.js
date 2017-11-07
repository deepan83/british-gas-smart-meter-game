import Phaser from 'phaser'
import bulb from 'img/bulb.png'

export default class {
  constructor(phaser, x = 100, y = 60) {
    this.phaser = phaser;
    this.hitting = {
      character: false,
      enemy: false,
    }
    this.phaser.load.spritesheet('bulb', bulb, 40, 40);
    this.x = x;
    this.y = y;
  }
  create() {
    this.sprite = this.phaser.add.sprite(this.x, this.y, 'bulb');
    this.sprite.anchor.set(0.5);
    this.on()
    this.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  off() {
    this.sprite.frame = 1;
  }
  on() {
    this.sprite.frame = 0;
  }
  update() {
    this.checkHitting(this.phaser.character.sprite, 'character', this.off)
    this.checkHitting(this.phaser.enemyCollection.group, 'enemy', this.on)
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
    return this.phaser.physics.arcade.overlap(this.sprite, object);
  }
}
