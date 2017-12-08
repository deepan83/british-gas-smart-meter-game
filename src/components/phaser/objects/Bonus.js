import getFrameKeys from '../util/getFrameKeys'

class Bonus extends Phaser.Sprite {
  hitting = false;
  tweens = {};
  onRemove = new Phaser.Signal();
  onScore = new Phaser.Signal();
  constructor(game, character, position, type) {
    super(game, position.x, position.y, 'objects', 'bonuses/' + type.name)
    this.anchor.set(0.5);
    this.tweens.puls = this.game.add.tween(this);
    // properties, duration, ease, autoStart, delay, repeat, yoyo
    this.tweens.puls.to({alpha: 0}, 200, "Linear", false, 0, 5).yoyo(true, 0);
    this.game.physics.enable(this, Phaser.Physics.ARCADE);
    this.character = character;
    this.type = type;
    this.bonusAudio = this.game.add.audio('bonus');
    this.createScoreSprite();
    this.createPoofSprite();
    this.initRemove();
  }
  createScoreSprite() {
    this.scoreSprite = this.game.add.sprite(this.x, this.y, 'objects', 'score/' + this.type.score + '/1');
    this.scoreSprite.scale.setTo(0,0);
    this.scoreSprite.anchor.set(0.5,1);
    this.scoreAnimation = this.scoreSprite.animations.add('score', getFrameKeys('score/' + this.type.score, this.game.cache.getFrameData('objects')));
  }
  createPoofSprite() {
    this.poofSprite = this.game.add.sprite(this.x, this.y, 'objects', 'poof/1');
    this.poofSprite.scale.setTo(0,0);
    this.poofSprite.anchor.set(0.5);
    this.poofAnimation = this.poofSprite.animations.add('poof', getFrameKeys('poof', this.game.cache.getFrameData('objects')));
  }
  initRemove() {
    this.removeTimer = this.game.time.create(false);
    this.removeTimer.create(5000, false, 0, () => {
      this.tweens.puls.onComplete.add(() => {
        this.killAll();
        this.onRemove.dispatch();
      });
      this.tweens.puls.start();
    }, this);
    this.removeTimer.start();
  }
  hit() {
    this.hitting = true;
    this.removeTimer.stop();
    this.tweens.puls.stop();
    this.kill();
    this.bonusAudio.play();
    this.poofAnimation.onComplete.add(() => {
      this.poofSprite.kill();
      this.scoreAnimation.onComplete.add(() => {
        setTimeout(() => {
          this.scoreSprite.kill();
          this.onScore.dispatch(this.type.score);
        }, 250);
      });
      this.scoreSprite.scale.setTo(1,1);
      this.scoreAnimation.play(15);
    });
    this.poofSprite.scale.setTo(1,1);
    this.poofAnimation.play(10);
  }
  update() {
    if (!this.hitting) {
      this.game.physics.arcade.overlap(this, this.character, this.hit, null, this);
    }
  }
  killAll() {
    this.kill();
    this.scoreSprite.kill();
    this.poofSprite.kill();
  }
}
export default Bonus
