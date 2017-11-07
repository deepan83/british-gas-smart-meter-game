import Phaser from 'phaser'
import getFrameKeys from './util/getFrameKeys'

export default class {
  constructor(phaser) {
    this.phaser = phaser;
  }
  create() {
    this.sprite = this.phaser.add.sprite(this.x, this.y, 'objects', 'microwave/1');
    this.sprite.animations.add('puls', getFrameKeys('microwave', this.phaser.cache.getFrameData('objects')), 2, true, false);
    this.sprite.animations.play('puls');
    // this.sprite.anchor.set(0.5);
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
