<style>
    
</style>

<template>
    <div>
        <vue-markdown>i am a ~~tast~~ **test**.  {{item}}</vue-markdown>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('fetchItem', route.params.id);
        },
        data () {
            return {
                // url: ''
            };
        },
        computed: {
            item () {
                return this.$store.state.item;
            }
        },
		components: {
			VueMarkdown
		}
    };
</script>

