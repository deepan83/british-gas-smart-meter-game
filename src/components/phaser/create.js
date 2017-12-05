import Phaser from 'phaser'

export default function create(phaser, vGame, gameObject) {
  phaser.physics.startSystem(Phaser.Physics.ARCADE);

  for (var i = 0; i <= gameObject.lifeCycleListeners.length - 1; i++) {
    gameObject.lifeCycleListeners[i].create();
  }

  gameObject.bonusCollection.onScore = (score) => {
    vGame.score += score;
  };

  gameObject.switchCollection.onAllOff = () => {
    vGame.finished();
  };
  gameObject.switchCollection.onScore = (score) => {
    vGame.score += score;
  };
}
