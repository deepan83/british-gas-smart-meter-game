<template>
  <div class="page">
    <v-logo></v-logo>
    <div class="share">Congratulations!<br>Why not share and challenge your friends?
      <div class="share__buttons"><!--
        --><v-share-button class="share__button" network="facebook" large="true"></v-share-button><!--
        --><v-share-button class="share__button" network="twitter" large="true"></v-share-button><!--
      --></div>
    </div>
    <a href="" class="link">Learn more about smart meters</a>
    <button class="play-again" @click.prevent="playAgain">Play Again</button>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import Logo from 'components/Logo'
import ShareButton from 'components/ShareButton'
export default {
  components: {
    'v-logo': Logo,
    'v-share-button': ShareButton,
  },
  computed: {
    ...mapGetters([
      'audio',
      'scores'
    ]),
  },
  mounted() {
    this.audio.play('wilburCheer', true);
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change',
      resetScores: 'resetScores'
    }),
    playAgain() {
      this.resetScores();
      this.changeRoute({name: 'landing'});
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  background-size: cover;
  background-image: url('~img/wilbur.gif');
}
.share {
  color: #007dc4;
  top: 15.6vw;
  left: 50%;
  text-align: center;
  white-space: nowrap;
  transform: translateX(-50%);
  position: absolute;
  font: 3vw/1 Gillsans;
  &__buttons {
    width: 100%;
    justify-content: center;
    display: flex;
  }
  &__button {
    margin: 0 2.6vw;
  }
}
.link {
  color: #007dc4;
  padding: 8px 20px;
  font: 3vw/1 Gillsans;
  text-transform: uppercase;
  text-decoration: none;
  position: absolute;
  border: 2px solid #4a90e2;
  top: 31.6vw;
  left: 21.5vw;
  background-color: rgba(#fff, .6);
}
.play-again {
  right: 3vw;
  top: 6vw;
  display: flex;
  align-items: center;
  white-space: nowrap;
  cursor: pointer;
  position: absolute;
  padding: 1vw 1vw 1vw 0;
  color: #007bc7;
  letter-spacing: 0.16vw;
  font: 18px/1 Gillsans;
  border: 0;
  text-decoration: underline;
  background-color: transparent;
  transition: transform .4s;
  &::after {
    content: '';
    display: inline-block;
    width: 14px;
    height: 14px;
    margin-left: 4px;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('~img/play-again.svg');
  }
  &:hover {
    transform: scale(1.1);
  }
}
</style>
