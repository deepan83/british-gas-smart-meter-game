<template>
  <div class="page">
    <div class="page-content">
      <h1 class="title">Name Of Game</h1>
      <p class="description">Lorem ipsum dolor sit amet.<br>Sed in rebus apertissimis.</p>
      <label class="chose-player-label">Choose Player</label>
      <div class="player-select">
        <button class="player-select-button player-select-button--female" :class="{'player-select-button--selected': selected == 'female'}" @click.prevent="select('female')"></button>
        <button class="player-select-button player-select-button--male" :class="{'player-select-button--selected': selected == 'male'}" @click.prevent="select('male')"></button>
      </div>
      <button class="start" @click.prevent="start"></button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: 'female'
    }
  },
  methods: {
    select(selection) {
      this.selected = selection;
    },
    start() {
      console.log('start')
      console.log(this.selected)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .page {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url('~img/landing-background.jpg');
  }
  .page-content {
    text-align: center;
    color: #fff;
    width: 100%;
    font: 16px/1 Minecraft;
    letter-spacing: .32px;
  }
  .title {
    text-transform: uppercase;
    font: 38px/1 Minecraft;
    margin-bottom: 10px;
    letter-spacing: 1.51px;
  }
  .description {
    margin-bottom: 60px;
  }
  .chose-player-label {
    display: block;
    margin-bottom: 20px;
  }
  .player-select {
    display: flex;
    margin-bottom: 33px;
    justify-content: center;
  }
  .player-select-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 88px;
    outline: 0;
    margin: 0 8px;
    height: 88px;
    background-color: #fff;
    border: 1px solid #979797;
    border-radius: 50%;
    transition: border .1s;
    &--selected {
      border: 4px solid #5ba329;
    }
    &::before {
      content: '';
      display: block;
      width: 30px;
      height: 62px;
      background-position: center;
      background-repeat: no-repeat;
      background-color: transparent;
    }
    &--male::before {
      background-image: url('~img/male-character.png');
    }
    &--female::before {
      background-image: url('~img/female-character.png');
    }
  }
  .start {
    width: 176px;
    height: 41px;
    background-color: transparent;
    border: 0;
    outline: 0;
    background-image: url('~img/start-button.png');
  }
</style>
