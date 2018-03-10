<style scpoed>
    @import url("../lib/lightgallery/css/lightgallery.min.css");
    .photo-content {
        float: left;
        width: 740px;
        height: 100%;
        padding: 25px 0px 25px 0px;
        background-color: #000;
        opacity: 0.8;
    }

    #lightgallery {
        float: left;
    }

    .lg-item {
        float: left;
        width: 184px;
        height: 120px;
        margin: 0 1px 1px 0;
    }

    .category {
        padding: 25px;
        margin-bottom: 25px;
    }

    .category span {
        margin-right: 18px;
        font-size: 24px;
        transition: font-size 0.6s;
    }

    .category span:hover {
        font-size: 28px;
        background-color: #fff;
        color: #000;
        cursor: pointer;
    }
</style>

<template>
    <div class="photo-content">
        <div class="category">
            <span>全部</span>
            <span>风景山水</span>
            <span>生活照</span>
            <span>lover</span>
        </div>
        <div id="lightgallery">
            <a class="lg-item" v-for="i in 16" href="https://p.upyun.com/docs/cloud/demo.jpg">
                <img style="width: 184x; height: 120px" src="https://p.upyun.com/docs/cloud/demo.jpg">
            </a>
        </div>
    </div>
</template>

<script src="../lib/lightgallery.min.js"></script>
<script>
    module.exports = {
        mounted () {
            require('../lib/lightgallery/js/lightgallery.min.js');
            require('../lib/lightgallery/js/lg-thumbnail.min.js');
            require('../lib/lightgallery/js/lg-zoom.min.js');
            lightGallery(document.getElementById('lightgallery'));
        },
        data () {
            return {
                // url: 'context.url'
            };
        },
    };
</script>

