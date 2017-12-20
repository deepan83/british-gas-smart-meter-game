<template>
  <div class="smart-meter">
    <v-score-holder class="score-holder" :score="score"></v-score-holder>
  </div>
</template>

<script>
import ScoreHolder from 'components/ScoreHolder'
export default {
  components: {
    'v-score-holder': ScoreHolder,
  },
  props: ['score']
}
</script>

<style lang="scss" scoped>
.smart-meter {
  top: 20vw;
  left: 15.6vw;
  position: absolute;
  width: 68.6vw;
  height: 42.3vw;
  background-image: url(~img/smart-meter.png);
  background-size: contain;
}
.score-holder {
  top: 32%;
  right: 10%;
  position: absolute;
}
</style>
