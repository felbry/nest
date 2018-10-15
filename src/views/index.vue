<template>
  <div class="index-body">
    <navigator/>
    <div class="body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Navigator from '../components/navigator.vue'
export default {
  components: {
    Navigator
  },
  data () {
    return {
      // url: 'context.url'
    }
  }
}
</script>

<style lang="scss" scoped>
.index-body {
  display: flex;
  width: 100vw;
  height: 100vh;

  .body {
    flex-grow: 1;
  }
}
</style>
