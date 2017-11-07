import Phaser from 'phaser'
import Switch from './Switch'

export default class {
  lastObjectIndex = 0;
  objects = {};
  constructor(phaser) {
    this.phaser = phaser;
    this.hittingCharacter = false;
    this.add(60, 180)
    this.add(180, 60)
  }
  add(x, y) {
    this.objects[this.lastObjectIndex] = new Switch(this.phaser, x, y);
    this.lastObjectIndex++;
  }
  create() {
    this.group = this.phaser.add.physicsGroup();
    this.foreach(object => {
      object = this.objects[object];
      object.create();
      this.group.z = 50
      this.group.add(object.sprite);
    });
  }
  update() {
    this.foreach(object => {
      this.objects[object].update();
    });
  }
  foreach(callback) {
    Object.keys(this.objects).forEach(callback);
  }
}
