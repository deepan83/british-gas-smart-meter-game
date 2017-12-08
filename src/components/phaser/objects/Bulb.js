import Phaser from 'phaser'
import bulb from 'img/bulb.png'

class Bulb extends Phaser.Sprite {

  hitting = {
    character: false,
    enemy: false,
  }
  isOn = true;
  lock = false;
  onOff = new Phaser.Signal();
  onOn = new Phaser.Signal();

  constructor(game, x, y, character, enemyCollection) {
    super(game, x, y, 'objects', 'bulb/on')
    this.character = character;
    this.enemyCollection = enemyCollection;
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.lightOnAudio = this.game.add.audio('light-on');
    this.lightOffAudio = this.game.add.audio('light-off');
  }
  off() {
    if (this.isOn && !this.lock) {
      this.lightOffAudio.play();
      this.frameName = 'bulb/off';
      this.isOn = false;
      this.onOff.dispatch();
    }
  }
  on() {
    if (!this.isOn && !this.lock) {
      this.lightOnAudio.play();
      this.frameName = 'bulb/on';
      this.isOn = true;
      this.onOn.dispatch();
    }
  }
  update() {
    this.checkHitting(this.character, 'character', this.off)
    this.checkHitting(this.enemyCollection, 'enemy', this.on)
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
    return this.game.physics.arcade.overlap(this, object);
  }
}
export default Bulb
