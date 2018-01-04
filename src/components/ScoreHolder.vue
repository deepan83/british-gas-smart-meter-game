<template>
  <span class="score-holder">{{ displayScore }}</span>
</template>

<script>
export default {
  props: {score: {default: 0}},
  data() {
    return {
      displayScore: 0,
      interval: false
    }
  },
  mounted() {
    this.animateScore();
  },
  methods: {
    animateScore() {
      clearInterval(this.interval);
      if(this.score == this.displayScore) {
        return;
      }
      this.interval = setInterval(() => {
        if (this.displayScore != this.score) {
          var change = (this.score - this.displayScore) / 10;
          change = change >= 0 ? Math.ceil(change) : Math.floor(change);
          this.displayScore = this.displayScore + change;
        }
      }, 20);
    }
  },
  watch: {
    score() {
      this.animateScore();
    }
  }
}
</script>

<style lang="scss" scoped>
.score-holder {
  width: 17.3vw;
  height: 3.83vw;
  color: #fff;
  display: inline-flex;
  align-items: center;
  padding-left: 4.3vw;
  margin-right: 2.6vw;
  font: 3vw/1 Minecraft;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('~img/score-holder.png')
}
</style>
