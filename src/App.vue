<template>
  <div class="app">
    <component v-bind:is="view"></component>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      intoMusic: new Audio('/static/audio/intro.mp3')
    }
  },
  computed: {
    ...mapGetters({
      view: 'router/view',
      route: 'router/route',
    }),
  },
  mounted() {
    if (this.route.name === 'landing' || this.route.name === 'onboarding') {
      this.intoMusic.play();
    }
  },
  watch: {
    route() {
      if (this.route.name === 'game') {
        this.intoMusic.pause();
      }
    }
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
