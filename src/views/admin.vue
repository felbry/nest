<template>
    <div class="body">
        <div class="header">
            <h2>Control Panel</h2>
        </div>
        <div class="container">
            <!-- <div class="sidebar">
                <el-menu
                    class="el-menu-vertical-demo"
                    router>
                    <el-menu-item index="/admin/post">
                        <i class="el-icon-plus"></i>
                        <span slot="title">新博客</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/test">
                        <i class="el-icon-location"></i>
                        <span slot="title">测试</span>
                    </el-menu-item>
                </el-menu>
            </div> -->
            <ul class="sidebar">
                <li>1</li>
                <li>2</li>
                <li>3</li>
                <li>4</li>
            </ul>
            <!-- <router-view></router-view> -->
            <div class="content">content</div>
        </div>
    </div>
</template>

<script>
    import { Menu, MenuItem } from 'element-ui';

    module.exports = {
        data () {
            return {
                logo: '管理面板',
            };
        },
        methods: {
            logout () {

            }
        },
        components: {
            [Menu.name]: Menu,
            [MenuItem.name]: MenuItem,
        }
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
        height: calc(100vh - 60px);
    }

    .sidebar {
        width: 200px;
        height: 100%;
        border-right: 1px solid #e6e6e6;
        overflow: hidden;
    }

    .sidebar li {
        height: 50px;
        line-height: 50px;
        padding: 0 20px;
    }

    .sidebar li:hover {
        background-color: #ecf5ff;
        color: #409EFF;
    }

    .content {
        float: left;
        height: 100%;
    }

    .el-menu {
        height: 100%;
    }
</style>


