class Controls {
  direction = false;
  keyCodes = {
    'ArrowLeft': Phaser.LEFT,
    'ArrowUp': Phaser.UP,
    'ArrowRight': Phaser.RIGHT,
    'ArrowDown': Phaser.DOWN,
  }
  frames = {
    [Phaser.LEFT]: 'd-pad/left',
    [Phaser.UP]: 'd-pad/up',
    [Phaser.RIGHT]: 'd-pad/right',
    [Phaser.DOWN]: 'd-pad/down',
    [Phaser.NONE]: 'd-pad/inactive',
  }
  constructor(game) {
    this.game = game;
    this.position = {
      x: this.game.world.width - 140,
      y: this.game.world.height - 140,
    }
    this.controls = this.game.add.sprite(this.position.x, this.position.y, 'objects', this.frames[Phaser.NONE]);
    this.origin = new Phaser.Point(this.position.x + 60, this.position.y + 60);
    this.initialPoints = [
      new Phaser.Point(this.position.x, this.position.y + 41),
      new Phaser.Point(this.position.x + 37, this.position.y + 41),
      new Phaser.Point(this.position.x + 56, this.position.y + 60),
      new Phaser.Point(this.position.x + 37, this.position.y + 79),
      new Phaser.Point(this.position.x, this.position.y + 79),
    ]
    this.setButtons();
    this.game.input.onDown.add(this.pointerDown, this);
    this.game.input.onUp.add(this.pointerUp, this);
    this.keyboard = this.game.input.keyboard;
    this.keyboard.addCallbacks(this, this.keyPressesDown, this.keyReleased);

  }
  setButtons() {
    this.buttons = [];
    this.graphics = this.game.add.group();
    Object.keys(this.keyCodes).forEach((key, index) => {
      this.setButton(this.keyCodes[key],index);
    })
  }
  setButton(direction,index) {
    var points = [];
    this.initialPoints.forEach((point) => {
      points.push(this.rotatePoint(point, this.origin, index * 90));
    })
    this.buttons.push({
      polygon: new Phaser.Polygon(points),
      direction
    })
  }
  rotatePoint(point, origin, angle) {
    angle = angle * Math.PI / 180.0;
    return new Phaser.Point(
      Math.cos(angle) * (point.x-origin.x) - Math.sin(angle) * (point.y-origin.y) + origin.x,
      Math.sin(angle) * (point.x-origin.x) + Math.cos(angle) * (point.y-origin.y) + origin.y
    )
  }
  bringToTop() {
    this.game.world.bringToTop(this.controls);
  }
  pointerDown(pointer) {
    this.buttons.every((button) => {
      if (button.polygon.contains(pointer.x, pointer.y)) {
        this.direction = button.direction;
        this.highlightButton(this.direction);
        return false;
      }
      return true;
    });
  }
  pointerUp() {
    this.direction = Phaser.NONE;
    this.highlightButton(Phaser.NONE);
  }
  keyPressesDown(event) {
    if (typeof this.keyCodes[event.key] !== 'undefined') {
      this.direction = this.keyCodes[event.key];
      this.highlightButton(this.direction);
    }
  }
  keyReleased() {
    this.direction = Phaser.NONE;
    this.highlightButton(Phaser.NONE);
  }
  highlightButton(direction) {
    this.controls.frameName = this.frames[direction];
  }
}
export default Controls;
