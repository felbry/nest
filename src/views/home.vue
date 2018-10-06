<template>
  <div class="home-body">
    <h1 class="logo">
      <span class="logo-day">{{timer}}</span>days<br>
    </h1>
    <img src="http://pcon69vb0.bkt.clouddn.com/18-8-14/9930112.jpg">
    <dog/>
  </div>
</template>

<script>
import dog from './dog.vue'

export default {
  components: {
    dog
  },
  data () {
    return {
      current: new Date(),
      start: new Date(2017, 4, 19)
    }
  },
  computed: {
    timer () {
      return Math.floor((this.current.getTime() - this.start.getTime()) / (24 * 3600 * 1000))
    }
  }
}
</script>

<style lang="scss" scoped>
.home-body {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  img {
    border-color: rgb(85, 85, 85);
    border-radius: 3px;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
    width: 60%;
  }
  /deep/ .dog {
    position: fixed;
    right: 0;
    bottom: 20px;
  }
}
.logo {
  color: #000;
  width: 60%;
  margin-bottom: 20px;
}
.logo-day {
  font-size: 50px;
}
@media only screen and (max-width: 1146px) {
  .home-body img {
    width: 96%;
  }
  .logo {
    width: 96%;
  }
}
</style>
