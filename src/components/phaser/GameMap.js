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
    this.setSpawns();
    this.map.setCollisionBetween(1,27, true, this.tileLayer);
  }
  randomSafeTile() {
    var safeTiles = []
    var tiles = this.tileLayer.getTiles(0,0, this.tileLayer.width, this.tileLayer.height)
    tiles.forEach(tile => {
      if(tile.index === this.phaser.safetile) {
        safeTiles.push(tile)
      }
    })
    return Phaser.ArrayUtils.getRandomItem(safeTiles)
  }
  setSpawns() {
    this.spawns = {};
    var tiles = this.tileLayer.getTiles(0,0, this.tileLayer.width, this.tileLayer.height)
    tiles.forEach(tile => {
      if (tile.properties.hasOwnProperty('spawn')) {
        if (typeof this.spawns[tile.properties.spawn] === 'undefined') {
          this.spawns[tile.properties.spawn] = [];
        }
        this.spawns[tile.properties.spawn].push(tile);
      }
    })
    for (var i = 29; i < 33; i++) {
      this.map.replace(i, -1);
    }
  }
  getSpawnsByType(type) {
    return this.spawns[type];
  }
  getFriendlySpawn() {
    return this.spawns.friendly[0];
  }
}
