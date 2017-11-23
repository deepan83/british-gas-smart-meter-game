<template>
  <div>
    <router-link :to="{name: 'game', params: {level: (parseInt(level) + 1)}}" class="next">Next</router-link>
  </div>
</template>

<script>
export default {
  props: ['level'],
}
</script>

<style lang="scss" scoped>
</style>
