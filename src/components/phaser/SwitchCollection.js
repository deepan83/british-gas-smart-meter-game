import Phaser from 'phaser'
import Switch from './Switch'

export default class {
  lastObjectIndex = 0;
  objects = {};
  switchesOff = 0;
  constructor(phaser, {map, character, enemyCollection, levelConfig}) {
    this.phaser = phaser;
    this.GameMap = map;
    this.Character = character;
    this.EnemyCollection = enemyCollection;
    this.levelConfig = levelConfig;
    this.hittingCharacter = false;
    this.addObjects();
  }
  addObjects() {
    for (var i = 0; i < this.levelConfig.bulbs; i++) {
      this.add();
    }
  }
  add() {
    this.objects[this.lastObjectIndex] = new Switch(this.phaser, this.Character, this.EnemyCollection);
    this.lastObjectIndex++;
  }
  create() {
    var spawns = this.GameMap.getRandomSpawnsByType('bulb', this.levelConfig.bulbs);
    this.group = this.phaser.add.physicsGroup();
    this.foreach((object, index) => {
      object = this.objects[object];
      object.create(spawns[index].worldX + (this.GameMap.gridsize / 2), spawns[index].worldY + (this.GameMap.gridsize / 2));
      this.group.add(object.sprite);
      object.onOff = () => {
        this.switchesOff++;
        if (this.switchesOff == 2) {
          if (typeof this.onAllOff == 'function') {
            this.onAllOff();
          }
        }
      }
      object.onOn = () => {
        this.switchesOff--;
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
