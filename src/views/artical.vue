<style scoped>
    .body {
        width: 768px;
        margin: 0 auto;
        padding: 35px 0;
        /* outline: 1px solid red; */
    }
</style>

<template>
    <div class="body">
        <vue-markdown>{{artical}}</vue-markdown>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import { mapState } from 'vuex';
    import blogModule from '../store/modules/blog';

    module.exports = {
        asyncData ({ store, route }) {
            store.registerModule('blog', blogModule);
            return store.dispatch('getArtical', route.params.id);
        },
        destroyed () {
            this.$store.unregisterModule('blog');
        },
        data () {
            return {
                // url: 'context.url'
            };
        },
        computed: mapState({
            artical: state => state.blog.artical
        }),
        components: {
			VueMarkdown
		}
    };
</script>

