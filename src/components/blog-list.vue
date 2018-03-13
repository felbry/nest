<style scoped>
    .blog-item {
        padding: 8px 0;
        font-weight: bolder;
    }

    .date {
        font-size: 12px;
        width: 88px;
        color: #333;
        margin-bottom: 10px;
        transition: color 1.6s;
    }

    .date:hover {
        color: #fff;
    }

    .title {
        font-size: 22px;
        cursor: pointer;
        text-overflow:ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    .el-pagination {
        position: absolute;
        left: 60px;
        bottom: 40px;
    }
</style>

<template>
    <div>
        <div v-if="articalList.length">
            <div v-for="item in articalList" class="blog-item">
                <div class="date">{{new Date(item.createdAt).toLocaleDateString()}}</div>
                <div @click="detailBlog(item.id)" class="title">{{item.title}}</div>
            </div>
        </div>
        <div v-else>暂无相关文章</div>
        <el-pagination
            @current-change="pageChange"
            :current-page.sync="page"
            background
            :total="total"
            layout="prev, pager, next, total">
        </el-pagination>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { Pagination } from 'element-ui';

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getArticalList', {
                tid: route.params.tid == 'all' ? '' : route.params.tid,
                page: 1
            });
        },
        beforeRouteUpdate (to, from, next) {
            // 重置下分页状态
            this.$store.dispatch('getArticalList', {
                tid: to.params.tid == 'all' ? '' : to.params.tid,
                page: 1
            }).then(() => {
                next(vm => {
                    vm.page = 1;
                });
            });
        },
        data () {
            return {
                page: 1
            };
        },
        computed: mapState({
            articalList: state => state.blog.articalList,
            total: state => state.blog.total,
        }),
        methods: {
            detailBlog (id) {
                this.$router.push(`/blog/articals/${id}`);
            },
            pageChange (page) {
                this.$store.dispatch('getArticalList', {
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

