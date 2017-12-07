class Preload extends Phaser.State {

  preload() {
    this.initTime = Math.floor(Date.now());
    this.game.load.atlasJSONHash('objects', '/static/objects.png', '/static/objects.json');
    this.game.load.tilemap('map', '/static/maps/levels/' + this.game.levelConfig.id + '-' + this.game.levelConfig.short + '/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', '/static/maps/levels/' + this.game.levelConfig.id + '-' + this.game.levelConfig.short + '/tiles.png');
    this.game.load.image('spawns', '/static/maps/spawns.png');
    this.game.load.image('background', '/static/backgrounds/' + this.game.levelConfig.short + '.png');
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    let holdTime = 4000 - (Math.floor(Date.now()) - this.initTime);
    setTimeout(() => {
      this.game.onStart.dispatch();
      this.game.state.start('Game')
    }, (holdTime > 0 ? holdTime : 0));
  }

}

export default Preload;
