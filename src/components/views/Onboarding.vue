<template>
  <div class="page">
    <div class="my-slider">
      <h1 class="title">How to play</h1>
      <div class="slides" :style="slideStyle" v-touch:swipe.left="next" v-touch:swipe.right="prev">
        <div v-for="(instruction, index) in instructions" class="slide">
          <img class="slide__image" :class="'slide__image--' + index" :src="instruction.img" alt="">
          <p class="slide__instruction" v-html="instruction.text"></p>
        </div>
      </div>
      <div class="slider-nav">
        <button class="slider-arrow -prev" :class="{'-inactive': isFirst }" @click="prev"></button>
        <button class="slider-arrow -next" @click="next"></button>
      </div>
      <div class="slider-dots">
        <div class="slider-dot" v-for="(instruction, index) in instructions" :class="{ '-active': current == index }" @click="select(index)"></div>
      </div>
      <button class="skip" @click.prevent="skip">Skip</button>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import image1 from 'img/instructions/1.png'
import image2 from 'img/instructions/2.png'
import image3 from 'img/instructions/3.png'
import image4 from 'img/instructions/4.png'
export default {
  data: () => ({
    instructions: [
      {
        img: image1,
        text: 'Use arrow keys to move',
        percent: '0'
      },
      {
        img: image2,
        text: 'Touch the bulbs to<br>turn them off.',
        percent: '25%'
      },
      {
        img: image3,
        text: 'Teenagers will try to turn<br>the bulbs back on. Run into<br>the teenagers to freeze them.',
        percent: '50%'
      },
      {
        img: image4,
        text: 'Pick up appliances<br>for bonus points.',
        percent: '75%'
      },
    ],
    current: 0
  }),
  computed: {
    ...mapGetters([
      'audio',
    ]),
    isFirst() {
      return this.instructions[this.current-1] ? false: true;
    },
    slideStyle() {
      return {
        transform: `translateX(-${this.instructions[this.current].percent})`
      }
    }
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    skip() {
      this.audio.stop('intro');
      this.changeRoute({name: 'game', params: {level: 1}});
    },
    prev() {
      this.current = this.current-1 < 0 ? this.current : this.current-1;
    },
    next() {
      var next = this.current+1;
      if (next > this.instructions.length-1) {
        this.skip();
      } else {
        this.current = next;
      }
    },
    select(slide) {
      this.current = slide;
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url('~img/background.png');
  }
  .my-slider {
    top: 50%;
    left: 50%;
    width: 84.83vw;
    height: 67.3vw;
    overflow: hidden;
    position: absolute;
    background-color: rgba(#ffffff, .5);
    transform: translate(-50%, -50%);
  }
  .title {
    top: 4vw;
    width: 100%;
    color: #fff;
    text-align: center;
    position: absolute;
    font: 7vw/1 Minecraft;
    text-shadow: 0 2px 4px rgba(#000, .5);
  }
  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 84.83vw;
    height: 67.3vw;
    &__image {
      &#{&} {
        margin-bottom: 3.3vw;
        display: inline-block;
        height: auto;
        &--0 {
          width: 27vw;
        }
        &--1 {
          width: 9vw;
        }
        &--2 {
          width: 11vw;
        }
        &--3 {
          width: 30vw;
        }
      }
    }
    &__instruction {
      color: #1d8e42;
      font: 3.5vw/1.2 Minecraft;
      letter-spacing: 0.16vw;
      text-align: center;
    }
  }
  .slides {
    width: 400%;
    display: flex;
    transition: .2s;
  }
  .skip {
    z-index: 2;
    right: 2.3vw;
    color: #fff;
    bottom: 2.83vw;
    position: absolute;
    font: 16px/1.15 Gillsans;
    text-transform: uppercase;
    background-color: transparent;
    border: 0;
  }
  .slider-nav {
    top: 50%;
    width: 100%;
    padding: 0 5.5vw;
    display: flex;
    justify-content: space-between;
    position: absolute;
  }
  .slider-arrow {
    padding: 3vw;
    font-size: 0;
    line-height: 0;
    outline: 0;
    border: 0;
    background-color: transparent;
    &.-inactive {
      opacity: 0;
    }
    &.-next {
      transform: rotate(180deg);
    }
    &::after {
      content: '';
      display: inline-block;
      width: 3.3vw;
      height: 3.8vw;
      background-size: contain;
      background-repeat: no-repeat;
      background-image: url('~img/carousel-arrow.svg');
    }
  }
  .slider-dots {
    left: 50%;
    bottom: 2.8vw;
    display: flex;
    position: absolute;
    transform: translateX(-50%);
  }
  .slider-dot {
    padding: 0.6vw;
    line-height: 0;
    font-size: 0;
    &::after {
      content: '';
      display: inline-block;
      border-radius: 50%;
      width: 1.6vw;
      height: 1.6vw;
      background-color: #d8d8d8;
      transition: background-color .2s;
    }
    &.-active::after {
      background-color: #bab9b9;
    }
  }

</style>
