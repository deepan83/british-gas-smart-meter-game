import Phaser from 'phaser'
import Bonus from './Bonus'

export default class {
  constructor(phaser, GameMap, Character, levelConfig, callbacks) {
    this.phaser = phaser;
    this.GameMap = GameMap;
    this.Character = Character;
    this.levelConfig = levelConfig;
    this.callbacks = callbacks;
  }
  add() {
    let spawn = this.GameMap.getRandomSpawnByType('bonus');
    let index = this.lastObjectIndex;
    let position = {
      x: spawn.worldX + this.GameMap.halfTile,
      y: spawn.worldY + this.GameMap.halfTile
    };
    let type = this.levelConfig.bonusTypes[Math.floor(Math.random() * this.levelConfig.bonusTypes.length)];
    let removeTimer = this.phaser.time.create(false);
    this.bonus = new Bonus(this.phaser, this.Character, position, type, {
      onHit: (score) => {
        removeTimer.stop();
        this.callbacks.onScore(score)
        this.bonus = null;
      }
    });
    removeTimer.create(5000, false, 0, () => {
      this.bonus.remove(() => {
        this.bonus = null;
      });
    }, this);
    removeTimer.start();
  }
  create() {
    this.timer = this.phaser.time.create(false);
    this.timer.loop(10000, this.add, this);
    this.timer.start();
  }
  update() {
    if (this.bonus) {
      this.bonus.update();
    }
  }
}
