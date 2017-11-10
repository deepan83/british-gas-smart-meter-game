import Phaser from 'phaser'
import getFrameKeys from './util/getFrameKeys'

export default class {
  constructor(phaser, Character) {
    this.phaser = phaser;
    this.Character = Character;
    this.animations = {};
  }
  create(x, y, type) {
    this.sprite = this.phaser.add.sprite(x, y, 'objects', type + '/1');
    this.animations.puls = this.sprite.animations.add('puls', getFrameKeys(type, this.phaser.cache.getFrameData('objects')));
    this.sprite.anchor.set(0.5);
    this.animations.puls.onComplete.add(() => {
      this.sprite.kill();
    });
    this.phaser.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  }
  hit() {
    this.hitting = true;
    this.sprite.animations.play('puls', 2);
    this.onHit();
  }
  update() {
    if (!this.hitting) {
      this.phaser.physics.arcade.overlap(this.sprite, this.Character.sprite, this.hit, null, this);
    }
  }
}
