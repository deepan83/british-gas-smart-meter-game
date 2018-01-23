<template>
  <div class="page">
    <div class="page-content">
      <p class="instruction" v-html="instruction"></p>
      <h1 class="title" v-html="title"></h1>
      <p class="subtitle">{{ subTitle }}</p>
      <div class="start-holder">
        <button class="start" @click.prevent="start"></button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import {getQueryVariable} from '@/util';

export default {
  data() {
    return {
      title: 'Smart Meter Maze',
      instruction: 'Click START to play our exciting new game.<br>You have 5 levels to complete.',
      subTitle: 'A RACE TO SAVE ENERGY',
    }
  },
  computed: {
    ...mapGetters([
      'audio',
    ]),
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    start() {
      this.audio.initiateAudio();
      this.audio.play('intro');
      this.changeRoute({name: 'landing'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .page {
    height: 100%;
    position: relative;
    -webkit-backface-visibility: hidden;
    background-size: cover;
    background-image: url('~img/background.png');
  }
  .page-content {
    width: 100%;
    height: 100%;
    text-align: center;
    color: #fff;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    font: 2.7vw/1.4 Minecraft;
    letter-spacing: 0.04vw;
    text-shadow: 0 2px 4px rgba(#000, .5);
  }
  .title {
    position: relative;
    white-space: nowrap;
    font: 9.6vw/1 Minecraft;
    letter-spacing: 0.16vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 2px 2px #000;
  }
  .subtitle {
    margin-bottom: 7.6vw;
  }
  .instruction {
    margin-bottom: 3.6vw;
  }
  .start {
    width: 29.3vw;
    height: 6.83vw;
    background-color: transparent;
    border: 0;
    outline: 0;
    background-repeat: no-repeat;
    background-size: contain;
    background-image: url('~img/button.svg');
    &::after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 100%;
      background-position: center;
      background-repeat: no-repeat;
      background-image: url('~img/start.svg');
    }
  }
  .start-holder {
    width: 100%;
  }
</style>
