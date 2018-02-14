<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    module.exports = {
        data () {
            return {
                // url: 'context.url'
            };
        }
    };
</script>

<style>
    html, body {
        height: 100vh;
        width: 100wh;
        font-family: Arial, Helvetica, sans-serif;
        background-image: url('./imgs/bg_3.jpg');
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    #app {
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
    }
</style>

