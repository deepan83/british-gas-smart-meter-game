<template>
  <div class="share">Share<!--
    --><a :href="'https://www.facebook.com/sharer/sharer.php?u=' + siteUrl" class="share__button -facebook" target="_blank"></a><!--
    --><a :href="'https://twitter.com/intent/tweet?text=Play the free \'Smart Meter Maze\' game&url=' + siteUrl" class="share__button -twitter" target="_blank"></a><!--
    --></div>
</template>

<script>
export default {
  computed: {
    siteUrl() {
      return window.location.origin;
    }
  }
}
</script>

<style lang="scss" scoped>
.share {
  top: 2%;
  color: #007dc4;
  right: 4%;
  display: flex;
  align-items: center;
  position: absolute;
  font: 2.6vw/1 Minecraft;
  letter-spacing: 0.16vw;
  &__button {
    display: inline-block;
    width: 6vw;
    height: 6vw;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform .4s;
    &:hover {
      transform: rotate(10deg);
    }
    &.-facebook {
      margin-left: 0.6vw;
      background-image: url('~img/facebook.svg');
    }
    &.-twitter {
      background-image: url('~img/twitter.svg');
    }
  }
}
</style>
