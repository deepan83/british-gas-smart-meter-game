<template>
  <div class="page">
    <div class="my-slider owl-carousel">
      <div class="slide"></div>
      <div class="slide"></div>
      <div class="slide"></div>
      <div class="slide"></div>
    </div>
  </div>
</template>

<script>
import 'owl.carousel'
export default {
  mounted() {
    $('.my-slider').owlCarousel({
      loop:true,
      nav:true,
      autoplay: true,
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
    width: 509px;
    height: 404px;
  }
</style>
