<template>
  <div class="page">
    <div class="my-slider">
      <div class="owl-carousel">
        <div v-for="(instruction, index) in instructions" class="slide">
          <img class="slide__image" :class="'slide__image--' + index" :src="instruction.img" alt="">
          <p class="slide__instruction" v-html="instruction.text"></p>
        </div>
      </div>
      <button class="skip" @click.prevent="skip">Skip</button>
    </div>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import 'owl.carousel'
import image1 from 'img/instructions/1.png'
import image2 from 'img/instructions/2.png'
import image3 from 'img/instructions/3.png'
import image4 from 'img/instructions/4.png'
export default {
  data: () => ({
    instructions: [
      {
        img: image1,
        text: 'Use arrow keys to move'
      },
      {
        img: image2,
        text: 'Touch the bulbs to turn<br>them off before the<br>timer reaches 0.'
      },
      {
        img: image3,
        text: 'Teenagers will try to turn<br>the bulbs back on. Touch the<br>teenagers to freeze them.'
      },
      {
        img: image4,
        text: 'Pick up appliances<br>for bonus points.'
      },
    ]
  }),
  mounted() {
    $('.owl-carousel').owlCarousel({
      loop:false,
      nav:true,
      autoplay: false,
      items: 1,
      navText: ['','']
    })
  },
  methods: {
    ...mapMutations({
      changeRoute: 'router/change'
    }),
    skip() {
      this.changeRoute({name: 'game', params: {level: 1}});
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
    position: absolute;
    background-color: rgba(#ffffff, .5);
    transform: translate(-50%, -50%);
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
  .skip {
    z-index: 2;
    right: 2.3vw;
    color: #fff;
    bottom: 2.83vw;
    position: absolute;
    font: 2.3vw/1.15 Gillsans;
    text-transform: uppercase;
    background-color: transparent;
    border: 0;
  }
</style>
