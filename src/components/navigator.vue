<template>
  <nav class="nav">
    <div
      :class="{burger: true, 'burger--active': isActive}"
      @click="isActive = !isActive">
      <div class="burger__patty"></div>
    </div>
    <transition name="slide-fade">
      <div
        v-show="isActive"
        class="nav-list">
        <router-link
          to="/"
          class="nav-item">
          <img
            src="../imgs/home.png"
            alt="首页">
        </router-link>
        <router-link
          to="/blog"
          class="nav-item">
          <img
            src="../imgs/blog.png"
            alt="博客">
        </router-link>
        <router-link
          to="/photos"
          class="nav-item">
          <img
            src="../imgs/camera.png"
            alt="相片">
        </router-link>
      </div>
    </transition>
  </nav>
</template>
<script>
export default {
  data () {
    return {
      isActive: false
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
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100px;
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
    height: 10vh;

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
</style>
