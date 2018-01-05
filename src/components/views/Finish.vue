<template>
  <div class="page">
    <v-logo></v-logo>
    <div class="share">Why not share and challenge your friends?
      <div class="share__buttons"><!--
        --><v-share-button class="share__button" network="facebook" large="true"></v-share-button><!--
        --><v-share-button class="share__button" network="twitter" large="true"></v-share-button><!--
      --></div>
    </div>
    <a href="" class="link">Learn more about smart meters</a>
  </div>
</template>

<script>
import Logo from 'components/Logo'
import ShareButton from 'components/ShareButton'
export default {
  components: {
    'v-logo': Logo,
    'v-share-button': ShareButton,
  },
  mounted() {
    var wilburCheerAudio = new Audio('/static/audio/wilbur-cheer.mp3');
    wilburCheerAudio.play();
  }
}
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  background-size: cover;
  background-image: url('~img/wilbur.gif');
}
.share {
  color: #007dc4;
  top: 15.6vw;
  left: 24vw;
  position: absolute;
  font: 3vw/1 Gillsans;
  &__buttons {
    width: 100%;
    justify-content: center;
    display: flex;
  }
  &__button {
    margin: 0 2.6vw;
  }
}
.link {
  color: #007dc4;
  padding: 8px 20px;
  font: 3vw/1 Gillsans;
  text-transform: uppercase;
  text-decoration: none;
  position: absolute;
  border: 2px solid #4a90e2;
  top: 31.6vw;
  left: 21.5vw;
  background-color: rgba(#fff, .6);
}
</style>
