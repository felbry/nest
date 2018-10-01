<template>
  <nav
    class="nav"
    @click="isActive = !isActive">
    <div :class="{burger: true, 'burger--active': isActive}">
      <div class="burger__patty"></div>
    </div>

    <!-- <ul class="nav__list">

    </ul> -->
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
