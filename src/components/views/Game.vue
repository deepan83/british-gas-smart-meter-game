<template>
  <div id="game">
    <div v-if="showGame" class="top-bar">{{ score }} {{ time }}</div>
    <div v-if="!showGame" class="preload">
      <div class="level">Level {{ this.levelConfig.id }}</div>
      <div class="level-name">{{ this.levelConfig.name }}</div>
    </div>
  </div>
</template>

<script>
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import create from 'components/phaser/create'
  import preload from 'components/phaser/preload'
  import update from 'components/phaser/update'
  import levelConfig from '@/assets/levels.json'

  export default {
    name: 'game',
    props: ['level'],
    mounted () {
      this.initTime = Math.floor(Date.now());
      this.levelConfig = levelConfig.levels[this.level];
      let self = this
      if (this.game == null) {
        this.game = new Phaser.Game(600, 560, Phaser.AUTO, this.$el)
        this.game.state.add('preload', {
          preload: function() {
            preload(this, self)
          },
          create: function() {
            let startNowDifference = Math.floor(Date.now()) - self.initTime;
            let holdTime = 4000 - startNowDifference;
            self.holdCreate(() => {
              self.showGame = true;
              this.game.state.start('game')
            }, (holdTime > 0 ? holdTime : 0));
          },
        })
        this.game.state.add('game', {
          create: function() {
            let timer = this.game.time.create(false);

            //  Set a TimerEvent to occur after 2 seconds
            timer.loop(1000, () => {
              self.time++;
              if (self.time == 60) {
                timer.stop();
                self.finished();
              }
            }, this);

            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            timer.start();
            create(this, self);
          },
          update: function() {
            update(this, self)
          },
        })
        this.game.state.start('preload');
      }
    },
    methods: {
      finished() {
        this.game.paused = true;
        this.$store.commit('updateScore', this.score);
        if (this.level === Object.keys(levelConfig.levels).length) {
          this.$router.push({ name: 'finish'});
        } else {
          this.$router.push({ name: 'video', params: { level: this.level }});
        }
      },
      holdCreate(callback, time) {
        setTimeout(callback, time);
      },
    },
    destroyed() {
      this.game.destroy()
    },
    data: () => ({
      game: null,
      score: 0,
      levelConfig: false,
      showGame: false,
      time: 0
    })
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    height: 40px;
  }
  .preload {
    top: 0;
    left: 0;
    position: absolute;
    width: 600px;
    height: 600px;
    background-image: url('~img/gradient.svg');

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font: 26px/1.4 Minecraft;
  }
  .level {
    text-transform: uppercase;
  }
  .level-name {

  }
</style>
