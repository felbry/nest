<style scoped>
    .content {
        float: left;
        width: 740px;
        height: 100%;
        padding: 25px 55px 25px 60px;
        background-color: #000;
        opacity: 0.8;
        overflow: auto;
    }

    .blog-list {
        width: 768px;
        margin: 0 auto;
        padding: 35px 0;
    }

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
    }
</style>

<template>
    <div class="content">
        <div v-for="item in articalList" class="blog-item">
            <div class="date">{{new Date(item.createdAt).toLocaleDateString()}}</div>
            <div @click="detailBlog(item.id)" class="title">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getArticalList');
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

