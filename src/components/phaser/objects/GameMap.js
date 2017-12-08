import Phaser from 'phaser'

class GameMap extends Phaser.Tilemap {
  safetile = -1;
  tileSize = 40;
  halfTile = this.tileSize / 2;
  constructor(game, key) {
    super(game, key);
    this.game.add.sprite(0, 0, 'background');
    this.addTilesetImage('tiles', 'tiles');
    this.addTilesetImage('spawns', 'spawns');
    this.tileLayer = this.createLayer('Tile Layer 1');
    this.setSpawns();
    this.setCollision([5,6], true, this.tileLayer);
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
      this.replace(index, -1);
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
  getLayerData() {
    return this.layers[0].data;
  }
}
export default GameMap
