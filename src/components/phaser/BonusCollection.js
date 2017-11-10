import Phaser from 'phaser'
import Bonus from './Bonus'

export default class {
  lastObjectIndex = 0;
  objects = {};
  constructor(phaser, {map, character, levelConfig}) {
    this.phaser = phaser;
    this.GameMap = map;
    this.Character = character;
    this.levelConfig = levelConfig;
    this.phaser.load.atlasJSONHash('objects', '/static/objects.png', '/static/objects.json');
    this.addObjects();
  }
  addObjects() {
    for (var i = 0; i < this.levelConfig.bonuses; i++) {
      this.add();
    }
  }
  add() {
    this.objects[this.lastObjectIndex] = new Bonus(this.phaser, this.Character);
    this.lastObjectIndex++;
  }
  create() {
    var spawns = this.GameMap.getRandomSpawnsByType('bonus', this.levelConfig.bonuses);
    this.foreach((object, index) => {
      this.objects[object].create(spawns[index].worldX + (this.GameMap.gridsize / 2), spawns[index].worldY + (this.GameMap.gridsize / 2), index % 2 == 0 ? 'microwave': 'washing-machine');
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
