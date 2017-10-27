<template>
    <div class="hello">
        <Game :width="600" :height="600"/>
        <!-- <button @click.prevent="startGame">Start Game</button> -->
        <!-- <button v-if="game" @click.prevent="destroyGame">Destroy Game</button> -->
    </div>
</template>

<script>
import Game from 'components/Game'

export default {
  name: 'hello',
  components: {
    Game
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      game: false
    }
  },
  methods: {
    // startGame() {
    //   this.game = phaser();
    // },
    // destroyGame() {
    //   this.game.destroy();
    //   this.game = false;
    // }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
