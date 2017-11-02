import Phaser from 'phaser'
import checkKeys from './checkKeys'
import turn from './turn'

export default function update(phaser) {
  phaser.character.update();
  phaser.objects.update();
}
