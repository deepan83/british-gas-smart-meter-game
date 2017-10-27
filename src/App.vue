<template>
    <div class="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    components: {
    },
    mounted() {
    }
}
</script>

<style lang="scss">
    @import "~scss/_settings";
    body {
        margin: 0;
    }
    .app {
        background-color: #ddd;
    }
</style>
