import Phaser from 'phaser'
import GameMap from './GameMap'
import Character from './Character'
import BonusCollection from './BonusCollection'
import EnemyCollection from './EnemyCollection'
import BulbCollection from './BulbCollection'

export default class BGGame {
  constructor(levelConfig, selectedCharacter, element, callbacks) {
    this.levelConfig = levelConfig;
    this.selectedCharacter = selectedCharacter;
    this.callbacks = callbacks;

    this.game = new Phaser.Game(600, 560, Phaser.AUTO, element);

    this.initTime = Math.floor(Date.now());
    this.game.state.add('initGame', {
      preload: () => {
        this.preload();
      },
      create: () => {
        this.initGame();
      }
    });
    this.game.state.add('playGame', {
      create: () => {
        this.startGame();
      },
      update: () => {
        this.tick();
      },
    });
    this.game.state.start('initGame');
  }
  preload() {
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.game.load.atlasJSONHash('objects', '/static/objects.png', '/static/objects.json');
    this.GameMap = new GameMap(this.game, this.levelConfig);
    this.Character = new Character(this.game, this.GameMap, this.selectedCharacter);
    this.BonusCollection = new BonusCollection(this.game, this.GameMap, this.Character, this.levelConfig, {
      onScore: this.callbacks.onScore
    });
    this.EnemyCollection = new EnemyCollection(this.game, this.GameMap, this.Character, this.levelConfig);
    this.BulbCollection = new BulbCollection(this.game, this.GameMap, this.Character, this.EnemyCollection, this.levelConfig, {
      onScore: this.callbacks.onScore,
      onAllOff: this.callbacks.onFinish
    });
  }
  initGame() {
    let holdTime = 4000 - (Math.floor(Date.now()) - this.initTime);
    setTimeout(() => {
      this.callbacks.onStart();
      this.game.state.start('playGame')
    }, (holdTime > 0 ? holdTime : 0));
  }
  startGame() {
    this.gameTimer = this.game.time.create(false);
    this.gameTime = 0;
    //  Set a TimerEvent to occur after 2 seconds
    this.gameTimer.loop(1000, () => {
      this.gameTime++;
      this.callbacks.onTime();
      if (this.gameTime == 60) {
        this.game.paused = true;
        this.gameTimer.stop();
        this.callbacks.onFinish();
      }
    });

    //  Start the timer running - this is important!
    //  It won't start automatically, allowing you to hook it to button events and the like.
    this.gameTimer.start();

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.GameMap.create();
    this.Character.create();
    this.BonusCollection.create();
    this.EnemyCollection.create();
    this.BulbCollection.create();
  }
  tick() {
    this.GameMap.update();
    this.Character.update();
    this.BonusCollection.update();
    this.EnemyCollection.update();
    this.BulbCollection.update();
  }
  destroy() {
    this.game.destroy();
  }
}
