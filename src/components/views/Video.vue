<template>
  <div>
    <div class="videoWrapper">
      <iframe width="560" height="315" :src="levelVideo" frameborder="0" allowfullscreen></iframe>
    </div>
    <router-link v-if="showSkip" :to="{name: 'score', params: {level: level}}" class="skip">Skip</router-link>
  </div>
</template>

<script>
import levelConfig from '@/assets/levels.json'
export default {
  props: ['level'],
  data: () => ({
    showSkip: false
  }),
  mounted() {
    setTimeout(() => {
      this.showSkip = true;
    }, 5000);
  },
  computed: {
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
