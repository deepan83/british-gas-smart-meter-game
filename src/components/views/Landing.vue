<template>
  <div class="page">
    <div class="page-content">
      <h1 class="title" :class="{ 'title--typewriting': typewriting, 'title--transition': transition }">{{ typewritingTitle }}</h1>
      <div class="objects" :class="{ 'objects--transition': transition }">
        <img src="~img/dad-character.gif" alt="">
        <img src="~img/radio.png" alt="">
        <img src="~img/mum-character.gif" alt="">
        <img src="~img/bulb-1.png" alt="">
        <img src="~img/boy-character.gif" alt="">
        <img src="~img/washer.png" alt="">
        <img src="~img/girl-character.gif" alt="">
      </div>
      <div class="page-transition-content" :class="{ 'page-transition-content--transition': transition }">
        <p class="description" v-html="description"></p>
        <label class="chose-player-label">Choose Player</label>
        <div class="player-select">
          <button v-for="character in ['mum', 'dad']" class="player-select-button" :class="playerSelectClasses(character)" @click.prevent="changeCharacter(character)"></button>
        </div>
        <button class="start" @click.prevent="start"></button>
      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
import {mapGetters, mapMutations} from 'vuex';
import {getQueryVariable} from '@/util';

export default {
  data() {
    return {
      title: 'Smart Meter Maze',
      typewritingTitle: '',
      typewriting: true,
      transition: false,
      description: 'It\'s a race against time and we need your help.<br>Locate and switch off as many energy draining appliances as you can spot in our Smart Meter Maze.<br>Faster than the teenagers switching them back on.<br><br>Good luck!'
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.typewritingTitle = this.title.slice(0, this.typewritingTitle.length + 1);
      if (this.typewritingTitle.length == this.title.length) {
        this.typewriting = false;
        window.clearInterval(this.interval)
        setTimeout(() => {
          this.transition = true;
        }, 2000);
      }
    }, 100);
  },
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
    font: 58px/1 Minecraft;
    margin-bottom: 10px;
    letter-spacing: 1.51px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 2px 2px #000;
    transition: font-size 1s .5s;
    &--typewriting {
      &::after {
        content: '';
        height: 62px;
        width: 20px;
        margin-top: -12px;
        display: inline-block;
        background-color: #fff;
        animation: blink .5s infinite;
        @keyframes blink {
          0%   {opacity: 1}
          50% {opacity: 0}
          100% {opacity: 1}
        }
      }
    }
    &--transition {
      font-size: 38px;
      transform: translateY(275%);
      animation: title-transition 1s .5s forwards;
      @keyframes title-transition {
        0%   {transform: translateY(275%)}
        100% {transform: translateY(0)}
      }
    }
  }
  .objects {
    display: flex;
    width: 100%;
    justify-content: center;
    &--transition {
      position: absolute;
      top: 52%;
      animation: objects-transition 1.5s forwards;
      @keyframes objects-transition {
        0%   {
          transform: translateX(0);
        }
        10%   {
          transform: translateX(10%);
        }
        100% {
          transform: translateX(-100%);
          opacity: 0;
        }
      }
    }
  }
  .page-transition-content {
    display: none;
    &--transition {
      display: block;
      opacity: 0;
      transform: translate(10%, 50%) scale(.5);
      animation: page-content-transition 1s 1s forwards;
      @keyframes page-content-transition {
        100% {
          transform: translate(0, 0) scale(1);
          opacity: 1;
        }
      }
    }
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
