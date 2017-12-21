<template>
  <div class="share">Share<!--
    --><v-share-button network="facebook"></v-share-button><!--
    --><v-share-button network="twitter"></v-share-button><!--
    --></div>
</template>

<script>
import ShareButton from 'components/ShareButton'
export default {
  components: {
    'v-share-button': ShareButton,
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
}
</style>
