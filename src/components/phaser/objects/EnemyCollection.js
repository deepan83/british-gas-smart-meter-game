import Enemy from './Enemy'

class EnemyCollection extends Phaser.Group {
  constructor(game, gameMap, character, levelConfig) {
    super(game, undefined, 'enemyCollection', true, true);
    this.gameMap = gameMap;
    this.character = character;
    this.levelConfig = levelConfig;
    this.addEnemies();
  }
  addEnemies() {
    var spawns = this.gameMap.getRandomSpawnsByType('enemy', this.levelConfig.enemies);
    spawns.forEach(spawn => {
      this.addEnemy(spawn.worldX, spawn.worldY);
    })
  }
  addEnemy(x, y) {
    let enemy = new Enemy(this.game, x, y, this.gameMap, this.character);
    this.add(enemy);
  }
}
export default EnemyCollection

