<template>
  <div class="app">
    <component v-bind:is="view"></component>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      view: 'router/view'
    }),
  },
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
    position: absolute;
    background-color: #ddd;
  }
</style>
