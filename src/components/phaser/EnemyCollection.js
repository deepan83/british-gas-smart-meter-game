import Phaser from 'phaser'
import Enemy from './Enemy'

export default class {
  lastObjectIndex = 0;
  objects = {};
  constructor(phaser, {map, levelConfig}) {
    this.phaser = phaser;
    this.GameMap = map;
    this.levelConfig = levelConfig;
    this.addObjects();
  }
  addObjects() {
    for (var i = 0; i < this.levelConfig.enemies; i++) {
      this.add();
    }
  }
  add() {
    this.objects[this.lastObjectIndex] = new Enemy(this.phaser, this.GameMap);
    this.lastObjectIndex++;
  }
  create() {
    var spawns = this.GameMap.getRandomSpawnsByType('enemy', this.levelConfig.enemies);
    this.group = this.phaser.add.physicsGroup();
    this.foreach((object, index) => {
      object = this.objects[object];
      object.create(spawns[index].worldX, spawns[index].worldY);
      this.group.add(object.sprite);
      // object.onHit = () => {
      //   delete this.objects[object];
      //   this.onScore(30);
      // }
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
