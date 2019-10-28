<template>
  <div id="app">
    <navigator/>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>
<script>
import Navigator from '@/components/navigator.vue'
export default {
  components: {
    Navigator
  }
}
</script>
<style lang="scss" scoped>
#app {
  width: 100vw;
  height: 100vh;
}
.main {
  width: calc(100vw - 100px);
  height: 100%;
}
</style>
