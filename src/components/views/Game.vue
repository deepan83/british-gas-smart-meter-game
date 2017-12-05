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
import phaser from 'compponents/phaser'
import levelConfig from '@/assets/levels.json'
import { mapGetters, mapMutations } from 'vuex'

export default {
  mounted () {
    this.game = phaser.init();
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    finished() {
      this.game.paused = true;
      this.$store.commit('updateScore', this.score);
      if (this.level === Object.keys(levelConfig.levels).length) {
        this.changeRoute({name: 'finish'});
      } else {
        this.changeRoute({name: 'video', params: {level: this.level}});
      }
    },
    holdCreate(callback, time) {
      setTimeout(callback, time);
    },
  },
  destroyed() {
    this.game.destroy()
  },
  computed: {
    ...mapGetters({
      selectedCharacter: 'character',
      routerParams: 'router/params'
    }),
    level() {
      return this.routerParams.level;
    }
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
