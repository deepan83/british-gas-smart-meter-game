import Bulb from './Bulb'

class BulbCollection extends Phaser.Group {
  bulbs = [];
  bulbsOff = 0;
  hittingCharacter = false;

  constructor(game, gameMap, character, enemyCollection, levelConfig) {
    super(game, undefined, 'bulbCollection', true);

    this.game = game;
    this.gameMap = gameMap;
    this.character = character;
    this.enemyCollection = enemyCollection;
    this.levelConfig = levelConfig;
    this.addBulbs();
  }
  addBulbs() {
    var spawns = this.gameMap.getRandomSpawnsByType('bulb', this.levelConfig.bulbs);
    spawns.forEach(spawn => {
      this.addBulb(spawn.worldX, spawn.worldY);
    })
  }
  addBulb(x, y) {
    let bulb = new Bulb(this.game, x, y, this.character, this.enemyCollection);
    bulb.onOff.add(() => {
      this.game.onScore.dispatch(1000);
      this.bulbsOff++;
      if (this.bulbsOff == this.levelConfig.bulbs) {
        this.game.onFinish.dispatch();
      }
    })
    bulb.onOn.add(() => {
      this.game.onScore.dispatch(-1000);
      this.bulbsOff--;
    })
    this.add(bulb);
  }
}
export default BulbCollection
