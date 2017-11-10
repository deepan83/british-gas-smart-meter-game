import Phaser from 'phaser'

export default function create(phaser, vGame) {
  phaser.physics.startSystem(Phaser.Physics.ARCADE);

  for (var i = 0; i <= vGame.lifeCycleListeners.length - 1; i++) {
    vGame.lifeCycleListeners[i].create();
  }

  vGame.bonusCollection.onScore = (score) => {
    vGame.score += score;
  };

  vGame.switchCollection.onAllOff = () => {
    vGame.finished();
  };
}
