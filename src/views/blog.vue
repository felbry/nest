<style scoped>
    .content {
        float: left;
        width: 740px;
        height: 100%;
        padding: 25px 55px 25px 60px;
        background-color: #000;
        opacity: 0.8;
        overflow: auto;
    }

    .category {
        padding: 25px 0;
        margin-bottom: 25px;
    }

    .menu-item {
        color: #fff;
        margin-right: 18px;
        font-size: 24px;
        transition: font-size 0.6s;
    }

    .menu-item:hover, .router-link-active {
        font-size: 28px;
        background-color: #fff;
        color: #000;
        cursor: pointer;
    }
</style>

<template>
    <div class="content">
        <div class="category">
            <router-link class="menu-item" to="/blog/">全部</router-link>
            <router-link class="menu-item" to="/blog/fed">前端</router-link>
            <router-link class="menu-item" to="/blog/blockchain">区块链</router-link>
            <router-link class="menu-item" to="/blog/python">Python</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    module.exports = {
        data () {
            return {
                // url: ''
            };
        },
    };
</script>

