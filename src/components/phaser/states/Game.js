import GameMap from '../objects/GameMap'
import Controls from '../objects/Controls'
import Character from '../objects/Character'
import BonusCollection from '../objects/BonusCollection'
import EnemyCollection from '../objects/EnemyCollection'
import BulbCollection from '../objects/BulbCollection'

class Game extends Phaser.State {
  gameTime = 0;
  gameLength = 600;
  create() {
    this.endGameTimerAudio = this.game.add.audio('end-game-timer');
    this.endGameAudio = this.game.add.audio('end-game');

    this.initGameClock();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.initGameObjects();
    this.game.onReady.dispatch();
  }
  initGameClock() {
    this.startTimer = this.game.time.create(false);
    this.startTimer.create(2000, false, 0, () => {
      this.game.onStart.dispatch();
      this.game.objectsPaused = false;
      this.gameTimer = this.game.time.create(false);
      this.gameTimer.loop(100, () => {
        this.gameTime++;
        this.checkTime();
      });
      this.gameTimer.start();
    });
    this.startTimer.start();
  }
  checkTime() {
    if (this.gameTime <= this.gameLength) {
      this.game.onTime.dispatch();
    }
    if (this.gameTime == this.gameLength - 60) {
      this.endGameTimerAudio.play();
      this.game.aboutToStop = true;
    }
    if (this.gameTime == this.gameLength) {
      this.endGameAudio.play();
      this.game.objectsPaused = true;
      this.game.onFinish.dispatch();
    }
    if (this.gameTime == this.gameLength + 50) {
      this.game.paused = true;
      this.game.onComplete.dispatch();
    }
  }
  initGameObjects() {
    let gameMap = new GameMap(this.game, 'map');
    let controls = new Controls(this.game);

    let character = new Character(this.game, gameMap, controls, this.game.selectedCharacter);
    let bonusCollection = new BonusCollection(this.game, gameMap, character, this.game.levelConfig);
    this.game.world.add(bonusCollection);

    let enemyCollection = new EnemyCollection(this.game, gameMap, character, this.game.levelConfig);
    this.game.world.add(enemyCollection);

    let bulbCollection = new BulbCollection(this.game, gameMap, character, enemyCollection, this.game.levelConfig);
    bulbCollection.allBulbsCollected.add(() => {
      this.endGameAudio.play();
      this.game.objectsPaused = true;
      this.game.onFinish.dispatch();
      this.gameTimer.stop();
      let finishTimer = this.game.time.create(false);
      finishTimer.create(5000, false, 0, () => {
        this.game.paused = true;
        this.game.onComplete.dispatch();
      });
      finishTimer.start();
    });
    this.game.world.add(bulbCollection);
    this.game.world.bringToTop(gameMap.tileLayer);
    this.game.world.bringToTop(bonusCollection);
    this.game.world.bringToTop(bulbCollection);
    this.game.world.bringToTop(enemyCollection);
    this.game.world.bringToTop(character);
    controls.bringToTop();
  }
}

export default Game;
