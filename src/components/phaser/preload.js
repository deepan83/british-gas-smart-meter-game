import Phaser from 'phaser'
import Character from './Character'
import GameMap from './GameMap'
import BonusCollection from './BonusCollection'
import SwitchCollection from './SwitchCollection'
import EnemyCollection from './EnemyCollection'

export default function preload(phaser, vGame) {
    phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    vGame.map = new GameMap(phaser, vGame);
    vGame.character = new Character(phaser, vGame);
    vGame.bonusCollection = new BonusCollection(phaser, vGame);
    vGame.enemyCollection = new EnemyCollection(phaser, vGame);
    vGame.switchCollection = new SwitchCollection(phaser, vGame);
    vGame.lifeCycleListeners = [
      vGame.map,
      vGame.bonusCollection,
      vGame.switchCollection,
      vGame.character,
      vGame.enemyCollection
    ];
}
