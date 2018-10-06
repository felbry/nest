<style scoped>
@import url("../lib/lightgallery/css/lightgallery.min.css");

#lightgallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.lg-item {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 185px;
  height: 111px;
  border: 2px solid #fff;
  /* border-radius: 50px; */
  overflow: hidden;
  margin-bottom: 15px;
}
</style>

<template>
  <div id="lightgallery">
    <a
      v-for="item in photoList"
      :key="item.url"
      :href="item.url"
      class="lg-item">
      <img :src="item.thumbUrl">
    </a>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('getPhotoList', {
      tid: route.params.tid === 'all' ? '' : route.params.tid,
      page: 1
    })
  },
  beforeRouteUpdate (to, from, next) {
    // 重置下分页状态
    this.$store.dispatch('getPhotoList', {
      tid: to.params.tid === 'all' ? '' : to.params.tid,
      page: 1
    }).then(() => {
      next(vm => {
        vm.page = 1
      })
    })
  },
  data () {
    return {
      page: 1
    }
  },
  computed: mapState({
    photoList: state => state.photo.photoList,
    total: state => state.photo.total
  }),
  mounted () {
    require('../lib/lightgallery/js/lightgallery.min.js')
    require('../lib/lightgallery/js/lg-thumbnail.min.js')
    require('../lib/lightgallery/js/lg-zoom.min.js')
    lightGallery(document.getElementById('lightgallery'))
  },
  methods: {
    // pageChange (page) {
    //   this.$store.dispatch('getPhotoList', {
    //     tid: this.$route.params.tid === 'all' ? '' : this.$route.params.tid,
    //     page: page
    //   })
    // }
  }
}
</script>
