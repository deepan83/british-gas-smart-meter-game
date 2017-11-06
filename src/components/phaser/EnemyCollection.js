import Phaser from 'phaser'
import Enemy from './Enemy'

export default class {
  lastObjectIndex = 0;
  objects = {};
  constructor(phaser) {
    this.phaser = phaser;
    this.add()
    this.add()
    this.add()
  }
  add(x, y) {
    this.objects[this.lastObjectIndex] = new Enemy(this.phaser, x, y);
    this.lastObjectIndex++;
  }
  create() {
    var spawns = this.phaser.map.getRandomSpawnsByType('enemy', 3);
    this.foreach((object, index) => {
      this.objects[object].create(spawns[index].worldX, spawns[index].worldY);
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
