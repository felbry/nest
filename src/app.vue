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
    * {
        box-sizing: border-box;
    }
    
    html, body {
        font-family: Georgia, Palatino, serif;
        font-size: 16px;
    }

    h1, h2, ul, html, body {
        margin: 0;
        padding: 0;
    }
</style>

