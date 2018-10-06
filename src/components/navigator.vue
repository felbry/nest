<template>
  <nav :class="{nav: true, 'nav-mob-active': isMobActive}">
    <div class="mask"></div>
    <div
      class="nav-toogle-btn"
      @click="isMobActive = !isMobActive">
    </div>
    <div
      :class="{burger: true, 'burger--active': isActive}"
      @click="isActive = !isActive">
      <div class="burger__patty"></div>
    </div>
    <div :class="{'nav-list': true, 'nav-list-active': isActive}">
      <router-link
        v-for="item in routes"
        :key="item.alt"
        :to="item.path"
        class="nav-item"
        @click.native="close">
        <img
          :src="item.src"
          :alt="item.alt">
      </router-link>
    </div>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      isActive: false,
      isMobActive: false,
      routes: [
        {
          path: '/',
          src: require('../imgs/home.png'),
          alt: '首页'
        },
        {
          path: '/blog',
          src: require('../imgs/blog.png'),
          alt: '博客'
        },
        {
          path: '/photos',
          src: require('../imgs/camera.png'),
          alt: '相片'
        }
      ]
    }
  },
  methods: {
    close () {
      this.isActive = false
      this.isMobActive = false
    }
  }
}
</script>
<style lang="scss" scoped>
$nav-bg: #2b3033;
$ease: all .5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
.nav-list {
  display: flex;
  flex-direction: column;
  height: 0;
  transition: all .3s;
  overflow: hidden;
}
.nav-list-active {
  height: 85vh;
}
.nav-item {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: $ease;
  background: $nav-bg;
  &:hover {
    background: mix(black, $nav-bg, 10);
  }
  & img {
    height: 40px;
  }
}
// 收缩展开实现
.nav {
  width: 100px;
  height: 100%;
  flex-shrink: 0;
}
.burger {
  height: 15vh;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background: $nav-bg;
  cursor: pointer;
  transition: $ease;

  &:hover {
    background: mix(black, $nav-bg, 10);
  }

  &__patty {
    position: relative;
    height: 2px;
    width: 40px;
    background: white;

    &:before {
      content: "";
      position: absolute;
      top: -10px;
      left: 0;
      height: 2px;
      width: 100%;
      background: white;
    }

    &:after {
      content: "";
      position: absolute;
      top: 10px;
      left: 0;
      height: 2px;
      width: 100%;
      background: white;
    }
  }

  &__patty,
  &__patty:before,
  &__patty:after {
    will-change: transform;
    transition: $ease;
  }

  &--active {
    .burger__patty {
      transform: rotate(90deg);
      &:before {
        transform: rotate(-45deg) translate(-7px,-7px) scaleX(0.7);
      }

      &:after {
        transform: rotate(45deg) translate(-7px,7px) scaleX(0.7);
      }
    }
  }

  @media (max-width: 640px) {
    // height: 10vh;

    &__patty {
      transform: scale(0.8);
    }

    &--active {
      .burger__patty {
        transform: scale(0.8) rotate(90deg);
      }
    }
  }
}
// 规定了右侧容器最大宽度为1146，达到1146 nav即收缩
@media only screen and (max-width: 1146px) {
  .burger {
    display: none!important;
  }
  .nav {
    position: fixed;
    left: -30vw;
    width: 30vw;
    z-index: 2;
    transition: left .5s;
    .nav-toogle-btn {
      display: block;
      width: 32px;
      height: 32px;
      position: absolute;
      right: -31px;
      top: 50%;
      background-image: url('../imgs/arrow.png');
      transform: translate(0, -50%);
      transform: rotate(0deg);
      opacity: 0.6;
      transition: all .5s;
      cursor: pointer;
    }
  }
  .nav-mob-active {
    left: 0;
    .nav-toogle-btn {
      width: 48px;
      height: 48px;
      top: 0;
      right: -47px;
      background: $nav-bg;
      opacity: 1;
      transform: translate(0, 0);
      transform: rotate(720deg);
      background-image: url('../imgs/close.png');
    }
    .mask {
      position: fixed;
      z-index: -5;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: #333;
      opacity: 0.5;
    }
  }
  .nav-list {
    height: 100vh!important;
  }
}
</style>
