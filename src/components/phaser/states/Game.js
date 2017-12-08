import GameMap from '../objects/GameMap'
import Controls from '../objects/Controls'
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
    let controls = new Controls(this.game);

    let character = new Character(this.game, gameMap, controls, this.game.selectedCharacter);
    let bonusCollection = new BonusCollection(this.game, gameMap, character, this.game.levelConfig);
    this.game.world.add(bonusCollection);

    let enemyCollection = new EnemyCollection(this.game, gameMap, character, this.game.levelConfig);
    this.game.world.add(enemyCollection);

    let bulbCollection = new BulbCollection(this.game, gameMap, character, enemyCollection, this.game.levelConfig);
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
