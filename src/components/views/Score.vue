<template>
  <div class="page">
    <v-logo></v-logo>
    <v-share></v-share>
    <v-wilbur-looking-up></v-wilbur-looking-up>
    <p class="copy -top">You Scored...</p>
    <v-smart-meter :score="score"></v-smart-meter>
    <p v-if="!isLastLevel" class="copy">Better luck in Level {{ nextLevel }}</p>
    <button v-if="!isLastLevel" @click.prevent="next" class="button">Play level {{ nextLevel }}</button>
    <button v-if="isLastLevel" @click.prevent="finish" class="button">Continue</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import levelConfig from '@/assets/levels.json'
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
  mounted() {
    var endScoreAudio = new Audio('/static/audio/end-score.mp3');
    endScoreAudio.play();
  },
  computed: {
    ...mapGetters({
      routerParams: 'router/params',
      scores: 'scores',
      totalScore: 'totalScore'
    }),
    isLastLevel() {
      return this.level === Object.keys(levelConfig.levels).length;
    },
    level() {
      return this.routerParams.level;
    },
    nextLevel() {
      return this.level + 1;
    },
    score() {
      if (this.isLastLevel) {
        return this.totalScore;
      } else {
        return this.scores[this.level - 1];
      }
    }
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    next() {
      this.changeRoute({name: 'game', params: {level: this.nextLevel}});
    },
    finish() {
      this.changeRoute({name: 'finish'});
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
  &.-top {
    top: 14vw;
  }
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
  background-image: url('~img/button.svg');
}
</style>
