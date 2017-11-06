<style>

</style>

<template>
    <div id="app">现在访问的 URL 是： {{ url }}</div>
</template>

<script>
    module.exports = {
        data () {
            return {
                url: 'context.url'
            };
        }
    };
</script>

