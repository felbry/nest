<template>
    <div class="body">
        <my-header></my-header>
        <!-- <transition
            name="right-area"
            mode="out-in"> -->
        <router-view></router-view>
        <!-- </transition> -->
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

    /* .right-area-enter-active, .right-area-leave-active {
        transition: opacity .3s;
    }

    .right-area-enter, .right-area-leave-to {
        opacity: 0;
    } */
</style>

