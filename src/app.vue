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
    @import url('./css/markdown.css');

    * {
        box-sizing: border-box;
    }
    
    html, body {
        height: 100vh;
        width: 100wh;
        font-family: Georgia, Palatino, serif;
        background-image: url('./imgs/bg_3.jpg');
        background-size: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }

    h1, h2, ul, html, body {
        margin: 0;
        padding: 0;
    }

    #app {
        position: relative;
        width: 100%;
        height: 100%;
        color: #fff;
    }
</style>

