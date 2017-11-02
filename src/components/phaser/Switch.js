import Phaser from 'phaser'
import bulb from 'img/bulb.png'

export default class {
  constructor(phaser, x = 100, y = 60) {
    this.phaser = phaser;
    this.phaser.load.spritesheet('bulb', bulb, 40, 40);
    this.x = x;
    this.y = y;
  }
  create() {
    this.sprite = this.phaser.add.sprite(this.x, this.y, 'bulb');
    this.sprite.anchor.set(0.5);
    this.sprite.frame = 0;
    this.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  hit() {
    console.log('hit')
    this.hitting = true;
    this.sprite.frame = 1;
    this.onHit();
  }
  update() {
    if (!this.hitting && this.phaser.physics.arcade.overlap(this.sprite, this.phaser.character.sprite)) {
      this.hit();
    } else if (this.hitting && !this.phaser.physics.arcade.overlap(this.sprite, this.phaser.character.sprite)) {
      this.hitting = false;
    }
  }
}
