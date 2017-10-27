<template>
  <div id='gameScreen' :style="{ width: width + 'px', height: height + 'px' }"></div>
</template>

<script>
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import create from 'components/phaser/create'
  import preload from 'components/phaser/preload'
  import update from 'components/phaser/update'

  export default{
    name: 'game',
    props: {
      width: Number,
      height: Number
    },
    mounted () {
      let self = this
      if (this.game == null) {
        this.game = new Phaser.Game(this.width, this.height, Phaser.AUTO, this.$el, {
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
      update
    },
    destroyed () {
      this.game.destroy()
    },
    data () {
      return {
        game: null
      }
    }
  }
</script>

<style>
  #gameScreen {
    margin: 0 auto;
  }

  #gameScreen canvas {
    display: block;
    margin: 0 auto;
  }
</style>
