<template>
  <div id="app">
    <navigator/>
    <div class="body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigator from './components/navigator.vue'
module.exports = {
  data () {
    return {
      // url: 'context.url'
    }
  },
  components: {
    Navigator
  }
}
</script>

<style lang="scss" scoped>
#app {
  display: flex;
  width: 100vw;
  height: 100vh;

  .body {
    flex-grow: 1;
  }
}
</style>
