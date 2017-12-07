<template>
  <div id="game">
    <div v-if="showGame" class="top-bar">{{ score }} {{ time }}</div>
    <div v-if="!showGame" class="preload">
      <div class="level">Level {{ levelConfig.id }}</div>
      <div class="level-name">{{ levelConfig.name }}</div>
    </div>
  </div>
</template>

<script>
import Main from 'components/phaser/Main'
import levelConfig from '@/assets/levels.json'
import { mapGetters, mapMutations } from 'vuex'

export default {
  mounted () {
    this.game = new Main(this.levelConfig, this.selectedCharacter, this.$el);
    this.game.onStart.add(() => {
      this.showGame = true;
    });
    this.game.onTime.add(() => {
      this.time++;
    });
    this.game.onFinish.add(() => {
      this.finished();
    });
    this.game.onScore.add(score => {
      this.score += score;
    });
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    finished() {
      this.$store.commit('updateScore', this.score);
      if (this.level === Object.keys(levelConfig.levels).length) {
        this.changeRoute({name: 'finish'});
      } else {
        this.changeRoute({name: 'video', params: {level: this.level}});
      }
    },
  },
  destroyed() {
    this.game.destroy();
  },
  computed: {
    ...mapGetters({
      selectedCharacter: 'character',
      routerParams: 'router/params'
    }),
    level() {
      return this.routerParams.level;
    },
    levelConfig() {
      return levelConfig.levels[this.level];
    }
  },
  data: () => ({
    score: 0,
    showGame: false,
    time: 0
  })
}
</script>

<style lang="scss" scoped>
  .top-bar {
    height: 40px;
  }
  .preload {
    top: 0;
    left: 0;
    position: absolute;
    width: 600px;
    height: 600px;
    background-image: url('~img/gradient.svg');

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font: 26px/1.4 Minecraft;
  }
  .level {
    text-transform: uppercase;
  }
  .level-name {

  }
</style>
