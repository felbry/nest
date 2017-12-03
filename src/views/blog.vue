<style>
    
</style>

<template>
    <div>
        <div v-for="item in articalList">
            {{item.title}} - {{item.date}}
        </div>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';
    import { mapState } from 'vuex';
    import blogModule from '../store/modules/blog';

    module.exports = {
        asyncData ({ store, route }) {
            store.registerModule('blog', blogModule);
            return store.dispatch('getArticalList');
        },
        destroyed () {
            this.$store.unregisterModule('blog');
        },
        data () {
            return {
                // url: ''
            };
        },
        computed: mapState({
            articalList: state => state.blog.articalList
        }),
		components: {
			VueMarkdown
		}
    };
</script>

