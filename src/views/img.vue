<template>
  <!-- <img class="bg" src="https://api.yingjoy.cn/pic/?t=bing&w=1920" /> -->
  <div class="bg">
    <img src="http://pcon69vb0.bkt.clouddn.com/18-8-14/9930112.jpg" />
    <dog></dog>
  </div>
</template>
<script>
import dog from './dog.vue';
export default {
  data () {
    return {};
  },
  components: {
    dog
  }
};
</script>
<style lang="scss" scoped>
  .bg {
    position: relative;
    float: left;
    margin-top: 180px;
    width: 720px;
    height: 540px;
    // box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 5px;

    img {
      width: 100%;
      height: 100%;
    }

    /deep/ .dog {
      position: absolute;
      right: -150px;
      top: 200px;
    }
  }
</style>

