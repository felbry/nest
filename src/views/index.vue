<template>
    <div class="body">
        <my-header></my-header>
        <router-view></router-view>
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
</style>

