<template>
    <div class="body">
        <div class="header">
            <h2>Control Panel</h2>
        </div>
        <ul class="sidebar">
            <router-link
                tag="li"
                to="/admin/post">
                新博客
            </router-link>
            <router-link
                tag="li"
                to="/admin/test">
                测试内容
            </router-link>
        </ul>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data () {
            return {};
        },
        methods: {},
    };
</script>

<style scoped>
    .body {
        height: 100%;
        width: 100%;
        background-color: #fff;
        color: #000;
    }

    .header {
        height: 60px;
        border-bottom: 1px solid #e6e6e6;
    }

    .header h2 {
        float: left;
        margin-left: 30px;
        line-height: 60px;
    }

    .container {
        width: 100%;
        overflow: hidden;
    }

    .sidebar {
        float: left;        
        width: 200px;
        height: calc(100vh - 60px);
        border-right: 1px solid #e6e6e6;
    }

    .sidebar li {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
    }

    .sidebar li:hover {
        cursor: pointer;
        background-color: #ecf5ff;
        color: #409EFF;
    }

    .router-link-active {
        background-color: #ecf5ff;        
        color: #409EFF;
    }

    .content {
        height: calc(100vh - 60px);
        padding: 20px;
        overflow: hidden;        
    }
</style>


