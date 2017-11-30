import Phaser from 'phaser'
import Bonus from './Bonus'

export default class {
  lastObjectIndex = 0;
  objects = {};
  constructor(phaser, vGame) {
    this.phaser = phaser;
    this.vGame = vGame;
    this.GameMap = vGame.map;
    this.Character = vGame.character;
    this.levelConfig = vGame.levelConfig;
  }
  add() {
    let spawn = this.GameMap.getRandomSpawnByType('bonus');
    let index = this.lastObjectIndex;
    let position = {
      x: spawn.worldX + (this.GameMap.gridsize / 2),
      y: spawn.worldY + (this.GameMap.gridsize / 2)
    };
    this.objects[index] = new Bonus(this.phaser, this.Character, position, this.levelConfig.bonusTypes[Math.floor(Math.random() * this.levelConfig.bonusTypes.length)]);
    let removeTimer = this.phaser.game.time.create(false);
    this.objects[index].onHit = (score) => {
      this.vGame.score += score;
      this.remove(index)
      removeTimer.stop();
    };
    removeTimer.create(5000, false, 0, () => {
      this.objects[index].remove(() => {
        this.remove(index)
      });
    }, this);
    removeTimer.start();

    this.lastObjectIndex++;
  }
  remove(index) {
    delete this.objects[index];
  }
  create() {
    this.timer = this.phaser.game.time.create(false);
    this.timer.loop(10000, this.add, this);
    this.timer.start();
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
