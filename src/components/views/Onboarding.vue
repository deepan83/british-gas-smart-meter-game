<template>
  <div class="page">
    <div class="my-slider owl-carousel">
      <div v-for="instruction in instructions" class="slide">
        <img class="slide__image" :src="instruction.img" alt="">
        <p class="slide__instruction" v-html="instruction.text"></p>
      </div>
    </div>
  </div>
</template>

<script>
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
    $('.my-slider').owlCarousel({
      loop:false,
      nav:true,
      autoplay: false,
      items: 1,
      navText: ['','']
    })
  }
}
</script>

<style lang="scss" scoped>
  .page {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url('~img/gradient.svg');
  }
  .my-slider {
    top: 50%;
    left: 50%;
    width: 509px;
    height: 404px;
    position: absolute;
    background-color: rgba(#ffffff, .5);
    transform: translate(-50%, -50%);
  }
  .slide {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 509px;
    height: 404px;
    &__image {
      &#{&} {
        margin-bottom: 20px;
        display: inline-block;
        width: auto;
        height: auto;
      }
    }
    &__instruction {
      color: #1d8e42;
      font: 21px/1.2 Minecraft;
      letter-spacing: 1.25px;
      text-align: center;
    }
  }
</style>
