<template>
  <div id="app">
    <navigator/>
    <router-view/>
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
