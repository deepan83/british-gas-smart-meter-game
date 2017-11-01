import Phaser from 'phaser'
import background from 'img/background.png'
import tiles from 'img/tiles.png'
import character from 'img/character.png'
import map from '@/assets/map.json'
import Character from './Character'

export default function preload(phaser) {
    phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    phaser.character = new Character();
    phaser.load.tilemap('map', null, map, Phaser.Tilemap.TILED_JSON);
    phaser.load.image('character', character);
    phaser.load.image('background', background);
    phaser.load.image('tiles', tiles);
}
