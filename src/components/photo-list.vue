<style scoped>
    @import url("../lib/lightgallery/css/lightgallery.min.css");
    
    #lightgallery {
        float: left;
    }

    .lg-item {
        float: left;
        width: 184px;
        height: 120px;
        margin: 0 1px 1px 0;
    }

    .el-pagination {
        position: absolute;
        bottom: 60px;
    }
</style>

<template>
    <div>
        <div id="lightgallery">
            <a class="lg-item" v-for="i in 16" href="https://p.upyun.com/docs/cloud/demo.jpg">
                <img style="width: 184x; height: 120px" src="https://p.upyun.com/docs/cloud/demo.jpg">
            </a>
        </div>
        <el-pagination
            @current-change="pageChange"
            :current-page.sync="page"
            background
            :total="total"
            layout="prev, pager, next, total">
        </el-pagination>
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