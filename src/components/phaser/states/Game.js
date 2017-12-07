import GameMap from '../objects/GameMap'
import Character from '../objects/Character'
import BonusCollection from '../objects/BonusCollection'
import EnemyCollection from '../objects/EnemyCollection'
import BulbCollection from '../objects/BulbCollection'

class Game extends Phaser.State {
  create() {
    this.gameTimer = this.game.time.create(false);
    this.gameTime = 0;
    //  Set a TimerEvent to occur after 2 seconds
    this.gameTimer.loop(1000, () => {
      this.gameTime++;
      this.game.onTime.dispatch();
      if (this.gameTime == 60) {
        this.game.paused = true;
        this.gameTimer.stop();
        this.game.onFinish.dispatch();
      }
    });

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    this.gameTimer.start();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    let gameMap = new GameMap(this.game, 'map');
    let character = new Character(this.game, gameMap, this.game.selectedCharacter);
    let bonusCollection = new BonusCollection(this.game, gameMap, character, this.game.levelConfig);
    let enemyCollection = new EnemyCollection(this.game, gameMap, character, this.game.levelConfig);

    let bulbCollection = new BulbCollection(this.game, gameMap, character, enemyCollection, this.game.levelConfig);
  }

}

export default Game;
