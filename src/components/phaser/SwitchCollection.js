import Phaser from 'phaser'
import Switch from './Switch'

export default class {
  lastObjectIndex = 0;
  objects = {};
  constructor(phaser) {
    this.phaser = phaser;
    this.add(60, 180)
  }
  add(x, y) {
    this.objects[this.lastObjectIndex] = new Switch(this.phaser, x, y);
    this.lastObjectIndex++;
  }
  create() {
    this.foreach(object => {
      this.objects[object].create();
      this.objects[object].onHit = () => {
        console.log('hit')
        // delete this.objects[object];
        // this.onScore(30);
      }
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
