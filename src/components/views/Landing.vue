<template>
  <div class="page">
    <div class="page-content">
      <h1 class="title">Name Of Game</h1>
      <p class="description">Lorem ipsum dolor sit amet.<br>Sed in rebus apertissimis.</p>
      <label class="chose-player-label">Choose Player</label>
      <div class="player-select">
        <button v-for="character in ['mum', 'dad']" class="player-select-button" :class="playerSelectClasses(character)" @click.prevent="changeCharacter(character)"></button>
      </div>
      <button class="start" @click.prevent="start"></button>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import {mapGetters, mapMutations} from 'vuex';
import {getQueryVariable} from '@/util';

export default {
  computed: {
    ...mapGetters([
      'character'
    ])
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    start() {
      if (!Cookies.get('onboarding') || getQueryVariable('onboarding_always')) {
        Cookies.set('onboarding', true, { expires: 365 });
        this.changeRoute({name: 'onboarding'});
      } else {
        this.changeRoute({name: 'game', params: {level: 1}});
      }
    },
    ...mapMutations([
      'changeCharacter'
    ]),
    playerSelectClasses(character) {
      return {
        'player-select-button--selected': this.character == character,
        ['player-select-button--' + character]: true
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('~img/background.png');
  }
  .page-content {
    text-align: center;
    color: #fff;
    width: 100%;
    font: 16px/1 Minecraft;
    letter-spacing: .32px;
  }
  .title {
    text-transform: uppercase;
    font: 38px/1 Minecraft;
    margin-bottom: 10px;
    letter-spacing: 1.51px;
  }
  .description {
    margin-bottom: 60px;
  }
  .chose-player-label {
    display: block;
    margin-bottom: 20px;
  }
  .player-select {
    display: flex;
    margin-bottom: 33px;
    justify-content: center;
  }
  .player-select-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    outline: 0;
    margin: 0 8px;
    height: 88px;
    background-color: #fff;
    border: 1px solid #979797;
    border-radius: 50%;
    transition: border .1s;
    &--selected {
      border: 4px solid #5ba329;
    }
    &::before {
      content: '';
      display: block;
      width: 30px;
      height: 62px;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
    }
    &--dad::before {
      background-image: url('~img/dad-character.png');
    }
    &--mum::before {
      background-image: url('~img/mum-character.png');
    }
  }
  .start {
    width: 176px;
    height: 41px;
    background-color: transparent;
    border: 0;
    outline: 0;
    background-image: url('~img/start-button.png');
  }
</style>
