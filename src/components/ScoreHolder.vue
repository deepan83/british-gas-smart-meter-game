<template>
  <span class="score-holder">{{ score }}</span>
</template>

<script>
export default {
  props: ['score']
}
</script>

<style lang="scss" scoped>
.score-holder {
  width: 17.3vw;
  height: 3.83vw;
  color: #fff;
  display: inline-flex;
  align-items: center;
  padding-left: 4.3vw;
  margin-right: 2.6vw;
  font: 2.6vw/1 Minecraft;
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url('~img/score-holder.png')
}
</style>
