import Phaser from 'phaser'
import character from 'img/character.png'

export default class {
  constructor(phaser) {
    this.phaser = phaser;
    this.speed = 80;
    this.phaser.load.image('character', character);
  }
  create() {
    this.sprite = this.phaser.add.sprite(60, 100, 'character');
    this.sprite.anchor.set(0.5);
    this.phaser.physics.arcade.enable(this.sprite);
    this.move(Phaser.DOWN)
  }
  update() {
    this.phaser.physics.arcade.collide(this.sprite, this.phaser.map.tileLayer);
    //  Update our grid sensors
    this.checkKeys();
  }
  checkKeys() {
    if (this.phaser.cursors.left.isDown) {
      this.move(Phaser.LEFT);
    } else if (this.phaser.cursors.right.isDown) {
      this.move(Phaser.RIGHT);
    }
    if (this.phaser.cursors.up.isDown){
      this.move(Phaser.UP);
    } else if (this.phaser.cursors.down.isDown) {
      this.move(Phaser.DOWN);
    }
  }
  move(direction) {
    var speed = this.speed;
    if (direction === Phaser.LEFT || direction === Phaser.UP) {
      speed = -speed;
    }
    if (direction === Phaser.LEFT || direction === Phaser.RIGHT) {
      this.sprite.body.velocity.x = speed;
    } else {
      this.sprite.body.velocity.y = speed;
    }
  }
}
