import Phaser from 'phaser'
import background from 'img/background.png'
import tiles from 'img/tiles.png'
import map from '@/assets/map.json'

export default function preload(phaser) {
    phaser.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    console.log(phaser)


    phaser.load.tilemap('map', null, map, Phaser.Tilemap.TILED_JSON);
    phaser.load.image('background', background);
    phaser.load.image('tiles', tiles);
}
