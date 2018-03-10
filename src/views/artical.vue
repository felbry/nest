<style scoped>
    .artical-content {
        float: left;
        width: 740px;
        height: 100%;
        padding: 0px 55px 0px 60px;
        background-color: #000;
        opacity: 0.8;
        overflow: auto;
    }

    .artical-header {
        padding: 25px 0;
        margin-bottom: 25px;
    }

    .artical-time {
        display: block;
    }
</style>

<template>
    <div
        class="artical-content">
        <div class="artical-header">
            <h2>
                {{artical.title}}
                <small class="artical-time">{{new Date(artical.createdAt).toLocaleDateString()}}</small>
            </h2>
        </div>
        <div v-html="artical.content"></div>
        <div style="height: 25px"></div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import Scrollbar from 'smooth-scrollbar';

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getArtical', route.params.id);
        },
        mounted () {
            Scrollbar.init(document.querySelector('.artical-content'));
        },
        data () {
            return {
                // url: 'context.url'
            };
        },
        computed: mapState({
            artical: state => state.blog.artical
        }),
    };
</script>

