<template>
  <div class="page">
    <button @click.prevent="next" class="next">Next</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    next() {
      this.changeRoute({name: 'game', params: {level: this.level + 1}});
    }
  },
  computed: {
    ...mapGetters({
      routerParams: 'router/params'
    }),
    level() {
      return this.routerParams.level;
    },
  }
}
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-image: url('~img/background.png');
  }
</style>
