import Bonus from './Bonus'

class BonusCollection extends Phaser.Group {
  constructor(game, gameMap, character, levelConfig) {
    super(game, undefined, 'bonusCollection', true);
    this.gameMap = gameMap;
    this.character = character;
    this.levelConfig = levelConfig;

    this.timer = this.game.time.create(false);
    this.timer.loop(10000, this.addBonus, this);
    this.timer.start();
  }
  addBonus() {
    let spawn = this.gameMap.getRandomSpawnByType('bonus');
    let position = {
      x: spawn.worldX + this.gameMap.halfTile,
      y: spawn.worldY + this.gameMap.halfTile
    };
    let type = this.levelConfig.bonusTypes[Math.floor(Math.random() * this.levelConfig.bonusTypes.length)];
    this.bonus = new Bonus(this.game, this.character, position, type);
    this.bonus.onRemove.add(() => {
      this.bonus = null;
    })
    this.bonus.onScore.add(score => {
      this.game.onScore.dispatch(score);
      this.bonus = null;
    })
    this.add(this.bonus);
  }
}
export default BonusCollection
