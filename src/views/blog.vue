<style scoped>
    /* .content {
        position: relative;
        float: left;
        width: 740px;
        height: 100%;
        padding: 25px 55px 25px 60px;
        background-color: #000;
        opacity: 0.8;
        overflow: auto;
    }

    .category {
        padding: 25px 0;
        margin-bottom: 25px;
    }

    .menu-item {
        color: #fff;
        margin-right: 18px;
        font-size: 24px;
        transition: font-size 0.6s;
    }

    .menu-item:hover, .router-link-active {
        font-size: 28px;
        background-color: #fff;
        color: #000;
        cursor: pointer;
    } */

    .blog-container {
        margin: 50px auto 0;
        max-width: 990px;
    }
    .recent-posts {
        max-width: 630px;
    }
    .h2 {
        padding: 8px 0;
        font-size: 22px;
        font-weight: 400;
        border-bottom: 1px dashed #ccc;
        margin-bottom: 15px;
    }
    .li {
        margin-bottom: 5px;
        list-style: circle;
        line-height: 28px;
        font-size: 16px;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .title {
        color: #4a75b5;
    }
    .title:hover {
        color: #e58c7c;
        text-decoration: underline;
        cursor: pointer;
    }
</style>

<template>
    <div class="blog-container">
        <!-- <div class="category">
            <router-link class="menu-item" to="/blog/all">全部</router-link>
            <router-link
                v-for="tag in tagList"
                :key="tag.id"
                :to="'/blog/' + tag.id"
                class="menu-item">
                {{tag.name}}
            </router-link>
        </div> -->
        <div class="recent-posts">
            <h2 class="h2">近期文章</h2>
            <ul>
                <li
                    class="li"
                    v-for="item in articalList">
                    {{new Date(item.createdAt).toISOString().slice(0, 10)}} » 
                    <span
                        @click="detailBlog(item.id)"
                        class="title">
                        {{item.title}}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';    

    module.exports = {
        asyncData ({ store, route }) {
            // return store.dispatch('getTagList');
            return store.dispatch('getArticalList');
        },
        data () {
            return {
                // url: ''
            };
        },
        computed: mapState({
            // tagList: state => state.blog.tagList
            articalList: state => state.blog.articalList,
            total: state => state.blog.total,
        }),
        methods: {
            detailBlog (id) {
                this.$router.push(`/blog/articals/${id}`);
            },
        }
    };
</script>

