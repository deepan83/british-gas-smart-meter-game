<template>
  <div id="game">
    <div class="top-bar">{{ score }}</div>
  </div>
</template>

<script>
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import create from 'components/phaser/create'
  import preload from 'components/phaser/preload'
  import update from 'components/phaser/update'

  export default {
    name: 'game',
    props: {
      level: String
    },
    mounted () {
      let self = this
      if (this.game == null) {
        this.game = new Phaser.Game(600, 560, Phaser.AUTO, 'game', {
          preload: function preload () {
            self.preload(this)
          },
          create: function create () {
            self.create(this)
          },
          update: function update () {
            self.update(this)
          }
        })
      }
    },
    methods: {
      preload,
      create,
      update,
      finished() {
        console.log('Fin')
      }
    },
    destroyed() {
      this.game.destroy()
    },
    data () {
      return {
        game: null,
        score: 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top-bar {
    height: 40px;
  }
</style>
