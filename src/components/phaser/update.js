import Phaser from 'phaser'

export default function update(phaser) {
  for (var i = 0; i <= phaser.lifeCycleListeners.length - 1; i++) {
    phaser.lifeCycleListeners[i].update();
  }
}
