<template>
  <div class="app">
    <component v-bind:is="view"></component>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import VAudio from './util/VAudio'
export default {
  computed: {
    ...mapGetters({
      view: 'router/view',
    }),
  },
  mounted() {
    var audio = new VAudio();
    audio.add('/static/audio/intro.mp3', 'intro');
    audio.add('/static/audio/level-change.mp3', 'levelChange');
    audio.add('/static/audio/end-score.mp3', 'endScore');
    audio.add('/static/audio/wilbur-cheer.mp3', 'wilburCheer');
    this.$store.commit('setAudio', audio);
  }
}
</script>

<style lang="scss">
  @import "~scss/_settings";
  @import "~scss/_global";
  body {
  }
  .app {
    width: 100vw;
    height: 100vw;
    top: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
  }
</style>
