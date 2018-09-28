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

    .el-pagination {
        position: absolute;
        left: 60px;
        bottom: 40px;
    }
</style>

<template>
  <div>
    <div id="lightgallery">
      <a
        v-for="item in photoList"
        :key="item.url"
        :href="item.url"
        class="lg-item">
        <img :src="item.thumbUrl">
      </a>
    </div>
    <el-pagination
      :current-page.sync="page"
      :total="total"
      background
      layout="prev, pager, next, total"
      @current-change="pageChange"/>
  </div>
</template>

<script src="../lib/lightgallery.min.js"></script>
<script>
    import { mapState } from 'vuex';
    import { Pagination } from 'element-ui';

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getPhotoList', {
                tid: route.params.tid == 'all' ? '' : route.params.tid,
                page: 1
            });
        },
        beforeRouteUpdate (to, from, next) {
            // 重置下分页状态
            this.$store.dispatch('getPhotoList', {
                tid: to.params.tid == 'all' ? '' : to.params.tid,
                page: 1
            }).then(() => {
                next(vm => {
                    vm.page = 1;
                });
            });
        },
        mounted () {
            require('../lib/lightgallery/js/lightgallery.min.js');
            require('../lib/lightgallery/js/lg-thumbnail.min.js');
            require('../lib/lightgallery/js/lg-zoom.min.js');
            lightGallery(document.getElementById('lightgallery'));
        },
        data () {
            return {
                page: 1
            };
        },
        computed: mapState({
            photoList: state => state.photo.photoList,
            total: state => state.photo.total,
        }),
        methods: {
            pageChange (page) {
                this.$store.dispatch('getPhotoList', {
                    tid: route.params.tid == 'all' ? '' : route.params.tid,
                    page: page
                });
            }
        },
        components: {
            [Pagination.name]: Pagination
        }
    };
</script>
