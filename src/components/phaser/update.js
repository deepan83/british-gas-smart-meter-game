import Phaser from 'phaser'

export default function update(phaser, vGame, gameObject) {
  for (var i = 0; i <= gameObject.lifeCycleListeners.length - 1; i++) {
    gameObject.lifeCycleListeners[i].update();
  }
}
