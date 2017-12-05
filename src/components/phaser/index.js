import create from 'components/phaser/create'
import preload from 'components/phaser/preload'
import update from 'components/phaser/update'

export default {
  init() {
    console.log('stuff')
  }
}

// this.initTime = Math.floor(Date.now());
// this.levelConfig = levelConfig.levels[this.level];
// let self = this
// if (this.game == null) {
//   this.gameObject = {};
//   this.game = new Phaser.Game(600, 560, Phaser.AUTO, this.$el)
//   this.game.state.add('preload', {
//     preload: function() {
//       preload(this, self, self.gameObject)
//     },
//     create: function() {
//       let startNowDifference = Math.floor(Date.now()) - self.initTime;
//       let holdTime = 4000 - startNowDifference;
//       self.holdCreate(() => {
//         self.showGame = true;
//         this.game.state.start('game')
//       }, (holdTime > 0 ? holdTime : 0));
//     },
//   })
//   this.game.state.add('game', {
//     create: function() {
//       let timer = this.game.time.create(false);

//       //  Set a TimerEvent to occur after 2 seconds
//       timer.loop(1000, () => {
//         self.time++;
//         if (self.time == 60) {
//           timer.stop();
//           self.finished();
//         }
//       }, this);

//       //  Start the timer running - this is important!
//       //  It won't start automatically, allowing you to hook it to button events and the like.
//       timer.start();
//       create(this, self, self.gameObject);
//     },
//     update: function() {
//       update(this, self, self.gameObject)
//     },
//   })
//   this.game.state.start('preload');
// }
