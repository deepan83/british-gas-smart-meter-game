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
    var spawns = this.phaser.map.getRandomSpawnsByType('bulb', 2);
    this.group = this.phaser.add.physicsGroup();
    this.foreach((object, index) => {
      object = this.objects[object];
      object.create(spawns[index].worldX + (this.phaser.gridsize / 2), spawns[index].worldY + (this.phaser.gridsize / 2));
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
