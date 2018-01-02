class Preload extends Phaser.State {

  preload() {
    this.initTime = Math.floor(Date.now());
    this.game.load.atlasJSONHash('objects', '/static/objects.png', '/static/objects.json');
    this.game.load.tilemap('map', '/static/maps/levels/' + this.game.levelConfig.id + '-' + this.game.levelConfig.short + '/map.json', null, Phaser.Tilemap.TILED_JSON);
    this.game.load.image('tiles', '/static/maps/levels/' + this.game.levelConfig.id + '-' + this.game.levelConfig.short + '/tiles.png');
    this.game.load.image('spawns', '/static/maps/spawns.png');
    this.game.load.image('background', '/static/backgrounds/' + this.game.levelConfig.short + '.png');
    this.game.load.audio('steps', '/static/audio/steps.mp3');
    this.game.load.audio('bonus', '/static/audio/bonus.mp3');
    this.game.load.audio('bonus-timer', '/static/audio/bonus-timer.mp3');
    this.game.load.audio('light-on', '/static/audio/light-on.mp3');
    this.game.load.audio('light-off', '/static/audio/light-off.mp3');
    this.game.load.audio('freeze', '/static/audio/freeze.mp3');
    this.game.load.audio('end-game', '/static/audio/end-game.mp3');
    this.game.load.audio('end-game-split', '/static/audio/end-game-split.mp3');
  }

  create() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    let holdTime = 4000 - (Math.floor(Date.now()) - this.initTime);
    setTimeout(() => {
      this.game.state.start('Game')
    }, (holdTime > 0 ? holdTime : 0));
  }

}

export default Preload;
