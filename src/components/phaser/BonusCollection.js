import Phaser from 'phaser'
import Bonus from './Bonus'

export default class {
  lastObjectIndex = 0;
  objects = {};
  constructor(phaser) {
    this.phaser = phaser;
    this.add()
    this.add(200, 180)
    this.add(260, 340)
  }
  add(x, y) {
    this.objects[this.lastObjectIndex] = new Bonus(this.phaser, x, y);
    this.lastObjectIndex++;
  }
  create() {
    this.foreach(object => {
      this.objects[object].create();
      this.objects[object].onHit = () => {
        delete this.objects[object];
        this.onScore(30);
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
