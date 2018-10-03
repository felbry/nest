<template>
  <div class="body">
    <router-view/>
  </div>
</template>

<script>
module.exports = {
  data () {
    return {

    }
  }
}
</script>

<style scoped>
  .body {
    position: absolute;
    top: 0;
    left: 50%;
    width: 1100px;
    height: 100%;
    padding: 20px 0;
    transform: translateX(-50%);
    color: #fff;
  }
</style>
