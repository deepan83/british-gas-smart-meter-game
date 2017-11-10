import Phaser from 'phaser'
import tiles from 'img/tiles.png'
import map from '@/assets/map.json'

export default class GameMap {
  safetile = -1;
  gridsize = 40;
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
      if(tile.index === this.safetile) {
        safeTiles.push(tile)
      }
    })
    return Phaser.ArrayUtils.getRandomItem(safeTiles)
  }
  setSpawns() {
    this.spawns = {};
    var id = 1;
    var tiles = this.tileLayer.getTiles(0,0, this.tileLayer.width, this.tileLayer.height)
    tiles.forEach(tile => {
      if (tile.properties.hasOwnProperty('spawn')) {
        tile.id = id;
        id++;
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
  getRandomSpawnsByType(type, quantity) {
    // Shuffle the array to be randomly ordered
    var spawns = this.spawns[type].slice(0);
    spawns.sort(function() { return 0.5 - Math.random() });

    return spawns.slice(0, quantity);
  }
  getFriendlySpawn() {
    return this.spawns.friendly[0];
  }
  update() {
    return;
  }
  getLayerData() {
    return this.map.layers[0].data;
  }
}
