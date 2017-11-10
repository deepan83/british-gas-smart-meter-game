<template>
  <div id="game">
    <div v-if="showGame" class="top-bar">{{ score }} <router-link :to="{name: 'onboarding'}">Onboard</router-link></div>
    <div v-if="!showGame" class="preload"></div>
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
      this.levelConfig = levelConfig.levels[this.level];
      let self = this
      if (this.game == null) {
        this.game = new Phaser.Game(600, 560, Phaser.AUTO, this.$el)
        this.game.state.add('preload', {
          preload: function() {
            preload(this, self)
          },
          create: function() {
            self.holdCreate(() => {
              self.showGame = true;
              this.game.state.start('game')
            });
          },
        })
        this.game.state.add('game', {
          create: function() {
            create(this, self);
          },
          update: function() {
            update(this, self)
          }
        })
        this.game.state.start('preload');
      }
    },
    methods: {
      finished() {
        console.log('Fin')
      },
      holdCreate(callback) {
        setTimeout(callback, 5000);
      }
    },
    destroyed() {
      this.game.destroy()
    },
    data: () => ({
      game: null,
      score: 0,
      levelConfig: false,
      showGame: false
    })
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    height: 40px;
  }
  .preload {
    width: 600px;
    height: 600px;
    background-image: url('~img/gradient.svg');
  }
</style>
