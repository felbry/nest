<template>
  <div class="sidebar">
    <h1 class="logo">
      <span class="logo-day">{{timer}}</span>days<br>
    </h1>
    <ul class="header-menu">
      <router-link
        active-class="header-router-link-active"
        tag="li"
        to="/index">
        <a>Home</a>
      </router-link>
      <router-link
        active-class="header-router-link-active"
        tag="li"
        to="/blog">
        <a>Blog</a>
      </router-link>
      <router-link
        active-class="header-router-link-active"
        tag="li"
        to="/photos">
        <a>Photos</a>
      </router-link>
      <router-link
        active-class="header-router-link-active"
        tag="li"
        to="/about">
        <a>About</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
module.exports = {
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

<style scoped>
    .sidebar {
        width: 360px;
        float: left;
    }

    .logo {
        color: #000;
        width: 280px;
        height: 128px;
        padding: 48px 0 0;
    }

    .logo-day {
        font-size: 50px;
    }

    .header-menu {
        margin: 0;
        padding: 122px 0 0;
    }

    .header-menu li {
        /* display: inline-block; */
        list-style: none;
        height: 60px;
        padding-bottom: 4px;
    }

    a {
        display: inline-block;
        height: 56px;
        line-height: 56px;
        background-color: #000;
        padding: 0 95px 0 40px;
        color: #fff;
        font-size: 26px;
        font-weight: bolder;
        cursor: pointer;
        transition: background-color 1s;
    }

    a:hover {
        background-color: #fff;
        color: #000;
    }

    .header-router-link-active a {
        background-color: #fff;
        color: #000;
    }
</style>
