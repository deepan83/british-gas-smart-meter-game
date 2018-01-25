<template>
  <div class="page" id="game">
    <div v-if="showGame" class="top-bar">
      <div class="top-bar__level">Level {{ levelConfig.id }} - {{ levelConfig.short }}</div>
      <div class="top-bar__stats">
        <v-score-holder :score="score"></v-score-holder>
        <span class="top-bar__time-holder"><span class="top-bar__time" :style="{width: timeWidth}"></span></span>
      </div>
    </div>
    <div class="finished" :class="{ '-show': gameFinished }">
      <div class="finished__text">Level {{ levelConfig.id }}<br>complete</div>
    </div>
    <div class="preload" :class="{ 'preload--transition': showGame }">
      <div class="level-objects-holder" :class="{'-transition': transition}">
        <div class="level-objects" :style="{ 'background-image': 'url(' + levelObjects[levelConfig.id] + ')' }"></div>
      </div>
      <div class="level" :class="{'level--transition': transition}">Level {{ levelConfig.id }}</div>
      <div class="level-name" :class="{'level-name--transition': transition}">{{ levelConfig.name }}</div>
      <div class="teens-holder" :class="{'-transition': transition}">
        <img class="teens" src="~img/level-objects/teens.png">
      </div>
    </div>
  </div>
</template>

<script>
import Main from 'components/phaser/Main'
import levelConfig from '@/assets/levels.json'
import { mapGetters, mapMutations } from 'vuex'
import ScoreHolder from 'components/ScoreHolder'
import levelObject1 from 'img/level-objects/1.png'
import levelObject2 from 'img/level-objects/2.png'
import levelObject3 from 'img/level-objects/3.png'
import levelObject4 from 'img/level-objects/4.png'
import levelObject5 from 'img/level-objects/5.png'

export default {
  components: {
    'v-score-holder': ScoreHolder,
  },
  mounted () {
    this.audio.play('levelChange');
    setTimeout(() => {
      this.transition = true;
    }, 500);
    this.game = new Main(this.levelConfig, this.selectedCharacter, this.$el);
    this.game.onReady.add(() => {
      this.showGame = true;
    });
    this.game.onStart.add(() => {
      // this.showGame = true;
    });
    this.game.onTime.add(() => {
      this.time++;
    });
    this.game.onFinish.add(() => {
      this.gameFinished = true;
    });
    this.game.onComplete.add(() => {
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
      var trackers = ga.getAll();
      trackers.forEach((tracker) => {
        tracker.send({
          hitType: 'event',
          eventCategory: 'Level Complete',
          eventAction: 'Level: ' + this.level,
          eventLabel: 'Score: ' + this.score
        });
      })
      this.$store.commit('updateScores', {score: this.score, level: this.level});
      if (this.level === Object.keys(levelConfig.levels).length) {
        this.changeRoute({name: 'score', params: {level: this.level}});
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
      routerParams: 'router/params',
      audio: 'audio',
    }),
    level() {
      return this.routerParams.level;
    },
    levelConfig() {
      return levelConfig.levels[this.level];
    },
    timeWidth() {
      return (100 - (this.time / 600 * 86)) + '%';
    }
  },
  data: () => ({
    score: 0,
    showGame: false,
    gameFinished: false,
    time: 0,
    transition: false,
    levelObjects: {
      1: levelObject1,
      2: levelObject2,
      3: levelObject3,
      4: levelObject4,
      5: levelObject5,
    }
  })
}
</script>

<style lang="scss" scoped>
  .page {
    height: 100%;
    width: 100%;
    position: relative;
    -webkit-backface-visibility: hidden;
  }
  .top-bar {
    color: #fff;
    padding: 0 2.5vw;
    background-color: #000;
    height: 6.6vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__level {
      padding-top: 1.4vw;
      font: 4.3vw/1 Minecraft;
      text-transform: capitalize;
    }
    &__stats {
      display: flex;
    }
    &__time-holder {
      width: 23vw;
      height: 3.83vw;
      display: inline-flex;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url('~img/time-holder.png');
    }
    &__time {
      display: inline-flex;
      width: 14%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url('~img/time.png');
    }
  }
  .preload {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-image: url('~img/background.png');

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font: 4.3vw/1.4 Minecraft;
    transition: all 1s;
    &--transition {
      top: -100%;
    }
  }
  .finished {
    top: 6.6vw;
    left: 100%;
    position: absolute;
    width: 100%;
    height: 93.4vw;
    background-color: rgba(#000000, .5);

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    font: 8vw/1.2 Minecraft;
    &.-show {
      left: 0;
    }
    &__text {
      width: 100%;
      text-align: center;
    }
  }
  .level-objects-holder {
    width: 100%;
    display: flex;
    justify-content: center;
    transform: translateX(100%);
    transition: all .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &.-transition {
      transform: translateX(0);
    }
  }
  .level-objects {
    width: 39vw;
    height: 14vw;
    margin-bottom: 5px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  .level {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    transform: translateX(100%);
    transition: all .4s .2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &--transition {
      transform: translateX(0);
    }
  }
  .level-name {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    transform: translateX(100%);
    transition: all .4s .4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &--transition {
      transform: translateX(0);
    }
  }
  .teens-holder {
    width: 100%;
    display: flex;
    justify-content: center;
    transform: translateX(100%);
    transition: all .4s .6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &.-transition {
      transform: translateX(0);
    }
  }
</style>
