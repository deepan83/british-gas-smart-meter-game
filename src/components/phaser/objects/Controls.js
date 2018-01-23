class Controls {
  direction = false;
  keyCodes = {
    '37': Phaser.LEFT,
    '38': Phaser.UP,
    '39': Phaser.RIGHT,
    '40': Phaser.DOWN,
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
      x: this.game.world.width - 230,
      y: this.game.world.height - 230,
    }
    this.controls = this.game.add.sprite(this.position.x + 20, this.position.y + 20, 'objects', this.frames[Phaser.NONE]);
    this.origin = new Phaser.Point(this.position.x + 110, this.position.y + 110);
    this.initialPoints = [
      new Phaser.Point(this.position.x, this.position.y + 70),
      new Phaser.Point(this.position.x + 70, this.position.y + 70),
      new Phaser.Point(this.position.x + 110, this.position.y + 110),
      new Phaser.Point(this.position.x + 70, this.position.y + 150),
      new Phaser.Point(this.position.x, this.position.y + 150),
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
    // this.debugButtons();
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
  debugButtons() {
    this.buttons.forEach((button) => {
      button.graphics = this.game.add.graphics(0, 0);
      button.graphics.lineStyle(2, 0xffd900, 1);
      button.graphics.beginFill(0x000000);
      button.graphics.drawPolygon(button.polygon.points);
      button.graphics.endFill();
      button.graphics.alpha = .8;
      this.graphics.add(button.graphics);
    });
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
    this.game.world.bringToTop(this.graphics);
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
    this.resetDirection();
  }
  keyPressesDown(event) {
    if (this.keyCodes.hasOwnProperty(event.keyCode)) {
      this.direction = this.keyCodes[event.keyCode];
      this.highlightButton(this.direction);
    }
  }
  keyReleased() {
    this.resetDirection();
  }
  highlightButton(direction) {
    this.controls.frameName = this.frames[direction];
  }
  resetDirection() {
    if (this.resetHold) {
      this.game.time.events.remove(this.resetHold);
      this.resetHold = false;
    }
    this.resetHold = this.game.time.events.add(1000, () => {
      this.direction = Phaser.NONE;
      this.highlightButton(Phaser.NONE);
    });
  }
}
export default Controls;
