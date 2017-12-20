<template>
  <div class="page">
    <v-logo></v-logo>
    <v-share></v-share>
    <v-wilbur-looking-up></v-wilbur-looking-up>
    <v-smart-meter :score="score"></v-smart-meter>
    <p class="copy">Better luck in Level {{ nextLevel }}</p>
    <button @click.prevent="next" class="button">Play level {{ nextLevel }}</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Logo from 'components/Logo'
import Share from 'components/Share'
import WilburLookingUp from 'components/WilburLookingUp'
import SmartMeter from 'components/SmartMeter'
export default {
  components: {
    'v-logo': Logo,
    'v-share': Share,
    'v-wilbur-looking-up': WilburLookingUp,
    'v-smart-meter': SmartMeter,
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    next() {
      this.changeRoute({name: 'game', params: {level: this.nextLevel}});
    }
  },
  computed: {
    ...mapGetters({
      routerParams: 'router/params',
      scores: 'scores'
    }),
    level() {
      return this.routerParams.level;
    },
    nextLevel() {
      return this.level + 1;
    },
    score() {
      return this.scores[this.level];
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
}
.copy {
  top: 68.5vw;
  left: 7.5vw;
  color: #007dc4;
  width: 85vw;
  text-align: center;
  position: absolute;
  letter-spacing: 0.17vw;
  font: 3.5vw/1.4 Minecraft;
}
.button {
  top: 75.5vw;
  left: 33.83vw;
  position: absolute;
  border: 0;
  color: #d0021b;
  padding: 7px 21px 2px;
  font: 3.5vw/1.4 Minecraft;
  text-transform: uppercase;
  background-color: transparent;
  background-size: 100% 100%;
  background-image: url('~img/button.png');
}
</style>
