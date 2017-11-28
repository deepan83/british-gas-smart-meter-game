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
    height: 600px;
    width: 600px;
  }
  .app {
    height: 100%;
    background-color: #ddd;
  }
</style>
