<style scoped>
    @import url('../css/markdown.css');
    .artical-content {
        float: left;
        width: 740px;
        height: 100%;
        padding: 25px 55px 25px 60px;
        background-color: #000;
        opacity: 0.8;
        overflow: auto;
    }
</style>

<template>
    <div
        class="artical-content"
        v-html="artical">
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

