import Phaser from 'phaser'
import Enemy from './Enemy'

export default class {
  lastEnemyIndex = 0;
  enemies = {};
  constructor(phaser, GameMap, Character, levelConfig) {
    this.phaser = phaser;
    this.GameMap = GameMap;
    this.Character = Character;
    this.levelConfig = levelConfig;
    this.addObjects();
  }
  addObjects() {
    for (var i = 0; i < this.levelConfig.enemies; i++) {
      this.add();
    }
  }
  add() {
    var enemy = ['girl', 'boy'][Math.floor(Math.random()*2)];
    this.enemies[this.lastEnemyIndex] = new Enemy(this.phaser, this.GameMap, this.Character, enemy);
    this.lastEnemyIndex++;
  }
  create() {
    var spawns = this.GameMap.getRandomSpawnsByType('enemy', this.levelConfig.enemies);
    this.group = this.phaser.add.physicsGroup();
    this.foreach((enemy, enemyIndex) => {
      enemy.create(spawns[enemyIndex].worldX, spawns[enemyIndex].worldY);
      this.group.add(enemy.sprite);
    });
  }
  update() {
    this.foreach(enemy => {
      enemy.update();
    });
  }
  foreach(callback) {
    Object.keys(this.enemies).forEach((enemyIndex) => {
      var enemy = this.enemies[enemyIndex];
      callback(enemy, enemyIndex);
    });
  }
}
