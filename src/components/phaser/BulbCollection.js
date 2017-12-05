import Phaser from 'phaser'
import Bulb from './Bulb'

export default class {
  bulbs = [];
  bulbsOff = 0;
  constructor(phaser, GameMap, Character, EnemyCollection, levelConfig, callbacks) {
    this.phaser = phaser;
    this.GameMap = GameMap;
    this.Character = Character;
    this.EnemyCollection = EnemyCollection;
    this.levelConfig = levelConfig;
    this.callbacks = callbacks;
    this.hittingCharacter = false;
    this.addBulbs();
  }
  addBulbs() {
    for (var i = 0; i < this.levelConfig.bulbs; i++) {
      this.add();
    }
  }
  add() {
    this.bulbs.push(new Bulb(this.phaser, this.Character, this.EnemyCollection, {
      onOff: () => {
        this.callbacks.onScore(1000);
        this.bulbsOff++;
        if (this.bulbsOff == this.levelConfig.bulbs) {
          this.callbacks.onAllOff();
        }
      },
      onOn: () => {
        this.callbacks.onScore(-1000);
        this.bulbsOff--;
      }
    }));
  }
  create() {
    var spawns = this.GameMap.getRandomSpawnsByType('bulb', this.levelConfig.bulbs);
    this.group = this.phaser.add.physicsGroup();
    this.bulbs.forEach((bulb, index) => {
      bulb.create(spawns[index].worldX + this.GameMap.halfTile, spawns[index].worldY + this.GameMap.halfTile);
      this.group.add(bulb.sprite);
    });
  }
  update() {
    this.bulbs.forEach(bulb => {
      bulb.update();
    });
  }
}
