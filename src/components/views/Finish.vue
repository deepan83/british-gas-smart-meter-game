<template>
  <div>
    Yey: Score: {{ score }}
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters([
      'score',
    ])
  }
}
</script>

<style lang="scss" scoped>
</style>
