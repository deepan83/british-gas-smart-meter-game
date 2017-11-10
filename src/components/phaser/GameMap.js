import Phaser from 'phaser'

export default class GameMap {
  safetile = -1;
  gridsize = 40;
  constructor(phaser, {levelConfig}) {
    this.phaser = phaser;
    this.phaser.load.tilemap('map', '/static/maps/levels/' + levelConfig.id + '-' + levelConfig.short + '/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.phaser.load.image('tiles', '/static/maps/levels/' + levelConfig.id + '-' + levelConfig.short + '/tiles.png');
    this.phaser.load.image('spawns', '/static/maps/spawns.png');
    this.phaser.load.image('background', '/static/backgrounds/' + levelConfig.short + '.png');
  }
  create() {
    this.phaser.add.sprite(0, 0, 'background');
    this.map = this.phaser.add.tilemap('map');
    this.map.addTilesetImage('tiles', 'tiles');
    this.map.addTilesetImage('spawns', 'spawns');
    this.tileLayer = this.map.createLayer('Tile Layer 1');
    this.setSpawns();
    this.map.setCollision(5, true, this.tileLayer);
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

    let id = 1;
    let tiles = this.tileLayer.getTiles(0,0, this.tileLayer.width, this.tileLayer.height)
    let spawnTileIndexes = [];
    tiles.forEach(tile => {
      if (tile.properties.hasOwnProperty('spawn')) {
        spawnTileIndexes.push(tile.index);
        tile.id = id;
        id++;
        if (typeof this.spawns[tile.properties.spawn] === 'undefined') {
          this.spawns[tile.properties.spawn] = [];
        }
        this.spawns[tile.properties.spawn].push(tile);
      }
    })
    spawnTileIndexes.forEach((index) => {
      this.map.replace(index, -1);
    });
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
  getRandomSpawnByType(type) {
    var spawn = this.getRandomSpawnsByType(type, 1);
    return spawn[0];
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
