<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {

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
