import Phaser from 'phaser'

export default function update(phaser) {
  phaser.character.update();
  phaser.objects.update();
  phaser.switchCollection.update();
  phaser.enemyCollection.update();
}
