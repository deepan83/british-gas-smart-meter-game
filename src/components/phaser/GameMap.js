import Phaser from 'phaser'
import tiles from 'img/tiles.png'
import map from '@/assets/map.json'

export default class GameMap {
  constructor(phaser) {
    this.phaser = phaser;
    this.phaser.load.tilemap('map', null, map, Phaser.Tilemap.TILED_JSON);
    this.phaser.load.image('tiles', tiles);
  }
  create() {
    this.map = this.phaser.add.tilemap('map');
    this.map.addTilesetImage('tiles', 'tiles');

    this.tileLayer = this.map.createLayer('Tile Layer 1');

    this.map.setCollisionBetween(1,26, true, this.tileLayer);
  }
}
