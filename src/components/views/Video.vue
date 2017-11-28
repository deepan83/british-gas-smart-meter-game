<template>
  <div>
    <div class="videoWrapper">
      <iframe width="560" height="315" :src="levelVideo" frameborder="0" allowfullscreen></iframe>
    </div>
    Calculating Score
    <button v-if="showSkip" @click.prevent="skip" class="skip">Skip</button>
  </div>
</template>

<script>
import levelConfig from '@/assets/levels.json'
import { mapGetters, mapMutations } from 'vuex'
export default {
  data: () => ({
    showSkip: false
  }),
  mounted() {
    setTimeout(() => {
      this.showSkip = true;
    }, 5000);
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    skip() {
      this.changeRoute({name: 'score', params: {level: this.level}});
    }
  },
  computed: {
    ...mapGetters({
      routerParams: 'router/params'
    }),
    level() {
      return this.routerParams.level;
    },
    levelConfig() {
      return levelConfig.levels[this.level];
    },
    levelVideo() {
      return this.levelConfig.video;
    }
  }
}
</script>

<style lang="scss" scoped>
.videoWrapper {
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 25px;
  height: 0;
}
.videoWrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
