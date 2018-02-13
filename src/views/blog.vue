<style scoped>
    .blog-list {
        width: 768px;
        margin: 0 auto;
        padding: 35px 0;
        /* outline: 1px solid red; */
    }

    .blog-item {
        padding: 50px 0;
        border-top: 1px solid #f4f3f3;
        border-bottom: 1px solid #f4f3f3;
        font-weight: bolder;
    }

    .date {
        font-size: 12px;
        color: #333;
        margin-bottom: 10px;
    }

    .title {
        font-size: 22px;
        cursor: pointer;
    }
</style>

<template>
    <div class="blog-list">
        <div v-for="item in articalList" class="blog-item">
            <div class="date">{{new Date(item.date).toDateString()}}</div>
            <div @click="detailBlog(item.id)" class="title">{{item.title}}</div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import blogModule from '../store/modules/blog';

    module.exports = {
        asyncData ({ store, route }) {
            store.registerModule('blog', blogModule);
            console.log('async:list');
            return store.dispatch('getArticalList');
        },
        destroyed () {
            console.log('destroyed:list');
            this.$store.unregisterModule('blog');
        },
        data () {
            return {
                // url: ''
            };
        },
        // computed: mapState({
        //     articalList: state => state.blog.articalList
        // }),
        computed: {
            articalList () {
                console.log('computed:list');
                console.log(this.$store.state.blog);
                return this.$store.state.blog.articalList;
            }
        },
        methods: {
            detailBlog (id) {
                this.$router.push(`/blog/articals/${id}`);
            }
        },
    };
</script>

