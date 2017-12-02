<style scoped>
    @import "../fonts/fonts.css";

    .col-xs-3 {
        padding: 25px 0;
        text-align: center;
        font-family: "cartoon";
        font-size: 16px;
        cursor: pointer;
    }

    .router-link-active {
        border-bottom: 3px solid #6190e8;
    }
</style>

<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-1">
                
            </div>
            <div class="col-xs-5">
                <div class="row">
                    <div class="col-xs-3">
                        <router-link to="/index">首页</router-link>
                    </div>
                    <div class="col-xs-3">
                        <router-link to="/blog/1">博客</router-link>
                    </div>
                    <div class="col-xs-3">
                        <router-link to="/photos">照片墙</router-link>
                    </div>
                    <div class="col-xs-3">
                        <router-link to="/about">关于</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
module.exports = {
    data() {
        return {};
    }
};
</script>

