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

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getArtical', route.params.id);
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

