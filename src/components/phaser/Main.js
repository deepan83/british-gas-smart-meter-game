import 'pixi'
import 'p2'
import Phaser from 'phaser';
import Preload from './states/Preload';
import Game from './states/Game';

export default class Main extends Phaser.Game {

  onStart = new Phaser.Signal();
  onTime = new Phaser.Signal();
  onFinish = new Phaser.Signal();
  onScore = new Phaser.Signal();

  constructor(levelConfig, selectedCharacter, element) {
    super(600, 560, Phaser.AUTO, element, null);

    this.levelConfig = levelConfig;
    this.selectedCharacter = selectedCharacter;

    this.state.add('Preload', Preload, false);
    this.state.add('Game', Game, false);

    this.state.start('Preload');
  }

}
