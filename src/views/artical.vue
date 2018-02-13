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
        <div v-html="artical"></div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import blogModule from '../store/modules/blog';

    module.exports = {
        asyncData ({ store, route }) {
            store.registerModule('blog', blogModule);
            console.log('async:artical');
            return store.dispatch('getArtical', route.params.id);
        },
        destroyed () {
            console.log('destroyed:artical'); 
            this.$store.unregisterModule('blog');
        },
        data () {
            return {
                // url: 'context.url'
            };
        },
        // computed: mapState({
        //     artical: state => state.blog.artical
        // }),
        computed: {
            artical () {
                console.log('computed:artical');
                console.log(this.$store.state.blog);
                return this.$store.state.blog.artical;
            }
        },
    };
</script>

