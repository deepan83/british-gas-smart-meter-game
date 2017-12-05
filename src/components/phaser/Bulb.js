import Phaser from 'phaser'
import bulb from 'img/bulb.png'

export default class {
  constructor(phaser, Character, EnemyCollection, callbacks) {
    this.phaser = phaser;
    this.Character = Character;
    this.EnemyCollection = EnemyCollection;
    this.callbacks = callbacks;
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
      this.callbacks.onOff();
    }
  }
  on() {
    if (!this.isOn) {
      this.sprite.frame = 0;
      this.isOn = true;
      this.callbacks.onOn();
    }
  }
  update() {
    this.checkHitting(this.Character.sprite, 'character', this.off)
    this.checkHitting(this.EnemyCollection.group, 'enemy', this.on)
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
