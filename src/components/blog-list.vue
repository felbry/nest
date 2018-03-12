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
</style>

<template>
    <div v-if="articalList.length">
        <div v-for="item in articalList" class="blog-item">
            <div class="date">{{new Date(item.createdAt).toLocaleDateString()}}</div>
            <div @click="detailBlog(item.id)" class="title">{{item.title}}</div>
        </div>
    </div>
    <div v-else>暂无相关文章</div>
</template>

<script>
    import { mapState } from 'vuex';

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getArticalList', route.params.tid == 'all' ? '' : route.params.tid);
        },
        beforeRouteUpdate (to, from, next) {
            this.$store.dispatch('getArticalList', to.params.tid == 'all' ? '' : to.params.tid).then(() => {
                next();
            });
        },
        data () {
            return {
                // url: ''
            };
        },
        computed: mapState({
            articalList: state => state.blog.articalList
        }),
        methods: {
            detailBlog (id) {
                this.$router.push(`/blog/articals/${id}`);
            }
        },
    };
</script>

