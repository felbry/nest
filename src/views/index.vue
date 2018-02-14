<template>
    <div class="body">
        <my-header></my-header>
        <transition name="right-area">
            <div class="content">
                <router-view></router-view>
            </div>
        </transition>
    </div>
</template>

<script>
    import Header from '../components/header.vue';

    module.exports = {
        data () {
            return {
                
            };
        },
        components: {
            myHeader: Header
        }
    };
</script>

<style scoped>
    .body {
        position: absolute;
        top: 0;
        left: 50%;
        width: 1100px;
        height: 100%;
        padding: 20px 0;        
        transform: translateX(-50%);
    }

    .content {
        float: left;
        width: 740px;
        height: 100%;
        padding: 25px 55px 25px 60px;
        background-color: #000;
        opacity: 0.8;
    }

    .right-area-leave-active {
        height: 0;
    }
</style>

