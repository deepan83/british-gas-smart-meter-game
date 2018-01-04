<template>
  <div class="page">
    <v-logo></v-logo>
    <v-share></v-share>
    <v-wilbur-looking-up></v-wilbur-looking-up>
    <p class="copy">Watch this video while we calculate your score and learn more about Smart Meters</p>
    <div class="video">
      <iframe class="video__iframe" width="560" height="315" :src="levelVideo" frameborder="0" allowfullscreen></iframe>
    </div>
    <button v-if="showSkip" @click.prevent="skip" class="skip">Skip Video</button>
  </div>
</template>

<script>
import levelConfig from '@/assets/levels.json'
import Logo from 'components/Logo'
import Share from 'components/Share'
import WilburLookingUp from 'components/WilburLookingUp'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {
    'v-logo': Logo,
    'v-share': Share,
    'v-wilbur-looking-up': WilburLookingUp,
  },
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
.page {
  height: 100%;
}
.copy {
  top: 16.6vw;
  left: 7.5vw;
  color: #007dc4;
  width: 85vw;
  text-align: center;
  position: absolute;
  letter-spacing: 0.17vw;
  font: 3.5vw/1.4 Minecraft;
}
.video {
  top: 29.16vw;
  left: 18.16vw;
  width: 64%;
  padding-top: 36%;
  position: absolute;
  &__iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
.skip {
  top: 65vw;
  cursor: pointer;
  left: 18.16vw;
  position: absolute;
  padding: 1vw 1vw 1vw 0;
  color: #007bc7;
  letter-spacing: 0.16vw;
  font: 12px/1 Gillsans;
  border: 0;
  text-decoration: underline;
  background-color: transparent;
  transition: transform .4s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
