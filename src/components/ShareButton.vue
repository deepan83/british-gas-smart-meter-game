<template>
  <a :href="href" class="button" :class="{ [`-${network}`]: true, '-large': large }" target="_blank"></a>
</template>

<script>
export default {
  props: ['network', 'large'],
  computed: {
    siteUrl() {
      return window.location.origin;
    },
    href() {
      if (this.network == 'facebook') {
        return `https://www.facebook.com/sharer/sharer.php?u=${this.siteUrl}`;
      } else {
        return `https://twitter.com/intent/tweet?text=Play the free 'Smart Meter Maze' game&url=${this.siteUrl}`;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button {
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
  &.-large {
    width: 7.6vw;
    height: 7.6vw;
  }
}
</style>
