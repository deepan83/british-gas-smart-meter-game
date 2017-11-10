import Phaser from 'phaser'

export default function update(phaser, vGame) {
  for (var i = 0; i <= vGame.lifeCycleListeners.length - 1; i++) {
    vGame.lifeCycleListeners[i].update();
  }
}
