import Phaser from 'phaser'
import background from 'img/background.png'
import Character from './Character'
import GameMap from './GameMap'
import BonusCollection from './BonusCollection'
import SwitchCollection from './SwitchCollection'
import EnemyCollection from './EnemyCollection'

export default function preload(phaser) {
    phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    phaser.map = new GameMap(phaser);
    phaser.character = new Character(phaser);
    phaser.objects = new BonusCollection(phaser);
    phaser.switchCollection = new SwitchCollection(phaser);
    phaser.enemyCollection = new EnemyCollection(phaser);
    phaser.load.image('background', background);
}
