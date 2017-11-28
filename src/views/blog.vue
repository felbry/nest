<style>
    
</style>

<template>
    <div>
        <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown>
    </div>
</template>

<script>
    import VueMarkdown from 'vue-markdown';

    module.exports = {
		created () {
			
		},
        data () {
            return {
                // url: ''
            };
		},
		components: {
			VueMarkdown
		}
    };
</script>

