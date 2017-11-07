import Phaser from 'phaser'
import bulb from 'img/bulb.png'

export default class {
  constructor(phaser) {
    this.phaser = phaser;
    this.hitting = {
      character: false,
      enemy: false,
    }
    this.isOn = true;
    this.phaser.load.spritesheet('bulb', bulb, 40, 40);
  }
  create(x, y) {
    this.sprite = this.phaser.add.sprite(x, y, 'bulb');
    this.sprite.anchor.set(0.5);
    this.on()
    this.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  off() {
    if (this.isOn) {
      this.sprite.frame = 1;
      this.isOn = false;
      if (typeof this.onOff == 'function') {
        this.onOff();
      }
    }
  }
  on() {
    if (!this.isOn) {
      this.sprite.frame = 0;
      this.isOn = true;
      if (typeof this.onOn == 'function') {
        this.onOn();
      }
    }
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
