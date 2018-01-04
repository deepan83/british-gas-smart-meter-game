<template>
  <div class="page">
    <div class="page-content">
      <h1 class="title" :class="{ 'title--typewriting': typewriting, 'title--transition': transition }" v-html="pageTitle"></h1>
      <div class="objects" :class="{ 'objects--transition': transition }">
        <img src="~img/dad-character.gif" alt="">
        <img src="~img/radio.png" alt="">
        <img src="~img/mum-character.gif" alt="">
        <img src="~img/bulb-1.png" alt="">
        <img src="~img/boy-character.gif" alt="">
        <img src="~img/washer.png" alt="">
        <img src="~img/girl-character.gif" alt="">
      </div>
      <div class="page-transition-content">
        <p class="description" :class="{ 'description--transition': transition }" v-html="description"></p>
        <label class="chose-player-label" :class="{ 'chose-player-label--transition': transition }">Choose Player</label>
        <div class="player-select" :class="{ 'player-select--transition': transition }">
          <button v-for="character in ['mum', 'dad']" class="player-select-button" :class="playerSelectClasses(character)" @click.prevent="changeCharacter(character)"></button>
        </div>
        <div class="start-holder" :class="{ 'start-holder--transition': transition }">
          <button class="start" @click.prevent="start"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import {getQueryVariable} from '@/util';

export default {
  data() {
    return {
      title: 'Smart Meter Maze',
      typewritingTitle: '',
      initialTitle: '&nbsp;',
      typewriting: true,
      transition: false,
      description: 'A RACE TO SAVE ENERGY<br><br><br>It\'s a race against time and we need your help.<br>Locate and switch off as many energy draining appliances as you can spot in our Smart Meter Maze.<br>Faster than the teenagers switching them back on.<br><br>Good luck!<br><br>',
      canType: true
    }
  },
  mounted() {
    if (getQueryVariable('no_transition')) {
      this.transition = true;
    } else {
      setTimeout(() => {
        this.interval = setInterval(() => {
          this.typewritingTitle = this.title.slice(0, this.typewritingTitle.length + 1);
          if (this.typewritingTitle.length == this.title.length) {
            window.clearInterval(this.interval)
            setTimeout(() => {
              this.typewriting = false;
              this.transition = true;
            }, 2000);
          }
        }, 100);
      }, 2000);
    }
  },
  computed: {
    ...mapGetters([
      'character'
    ]),
    pageTitle() {
      return this.typewritingTitle.length < 1 ? this.initialTitle : this.typewritingTitle;
    }
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    start() {
      this.changeRoute({name: 'onboarding'});
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
    position: relative;
    -webkit-backface-visibility: hidden;
    background-size: cover;
    background-image: url('~img/background.png');
  }
  .page-content {
    text-align: center;
    color: #fff;
    width: 100%;
    font: 2.7vw/1 Minecraft;
    letter-spacing: 0.04vw;
    text-shadow: 0 2px 4px rgba(#000, .5);
  }
  .title {
    position: absolute;
    white-space: nowrap;
    top: 11%;
    left: 50%;
    font: 9.6vw/1 Minecraft;
    margin-bottom: 1.6vw;
    letter-spacing: 0.16vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: 0 2px 2px #000;
    transition: all 1s .5s;
    transform: translate(-50%, 275%);
    &--typewriting {
      &::after {
        left: 100%;
        top: -0.83vw;
        position: absolute;
        content: '';
        height: 10.3vw;
        width: 3.3vw;
        display: block;
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
      font-size: 6.3vw;
      transform: translate(-50%, 0);
    }
  }
  .objects {
    display: flex;
    top: 48vw;
    position: absolute;
    width: 100%;
    justify-content: center;
    transition: all 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &--transition {
      transform: translate(-100%, 30%);
      opacity: 0;
    }
  }
  .page-transition-content {
    position: absolute;
    top: 20.83vw;
  }
  .description {
    opacity: 0;
    transform: translateX(100%);
    transition: all .8s 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &--transition {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .chose-player-label {
    display: block;
    margin-bottom: 3.3vw;
    opacity: 0;
    transform: translateY(100%);
    transition: all .8s 1.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &--transition {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .player-select {
    display: flex;
    margin-bottom: 5.5vw;
    justify-content: center;
    opacity: 0;
    transform: translateX(100%);
    transition: all .8s 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &--transition {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .player-select-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 14.6vw;
    outline: 0;
    margin: 0 1.3vw;
    height: 14.6vw;
    background-color: #fff;
    border: 1px solid #979797;
    border-radius: 50%;
    transition: border .1s;
    &--selected {
      border: calc(1px + 0.5vw) solid #5ba329;
    }
    &::before {
      content: '';
      display: block;
      width: 5vw;
      height: 10.3vw;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
      background-size: cover;
    }
    &--dad::before {
      background-image: url('~img/dad-character.gif');
    }
    &--mum::before {
      background-image: url('~img/mum-character.gif');
    }
  }
  .start {
    width: 29.3vw;
    height: 6.83vw;
    background-color: transparent;
    border: 0;
    outline: 0;
    background-size: cover;
    background-image: url('~img/start-button.png');
  }
  .start-holder {
    width: 100%;
    opacity: 0;
    transform: translateX(100%);
    transition: all .8s 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    &--transition {
      opacity: 1;
      transform: translateX(0);
    }
  }
</style>
