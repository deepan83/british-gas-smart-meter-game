import Phaser from 'phaser'
import object from 'img/object.png'

export default class {
  constructor(phaser, x = 100, y = 60) {
    this.phaser = phaser;
    this.phaser.load.image('object', object);
    this.x = x;
    this.y = y;
  }
  create() {
    this.sprite = this.phaser.add.sprite(this.x, this.y, 'object');
    this.sprite.anchor.set(0.5);
    this.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  hit() {
    this.hitting = true;
    this.sprite.kill();
    this.onHit();
  }
  update() {
    if (!this.hitting) {
      this.phaser.physics.arcade.overlap(this.sprite, this.phaser.character.sprite, this.hit, null, this);
    }
  }
}
