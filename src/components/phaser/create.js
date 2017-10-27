import Phaser from 'phaser'

export default function create(phaser) {
    phaser.add.sprite(0, 0, 'background');
    phaser.map = phaser.add.tilemap('map');
    phaser.map.addTilesetImage('tiles', 'tiles');
    phaser.map.createLayer('Tile Layer 1');
}
