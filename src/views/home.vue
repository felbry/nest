<style scoped>
    .body {
        padding-top: 250px;
        text-align: center;
        font-size: 26px;
        font-weight: bolder;
    }
</style>

<template>
    <div class="body">
        和阿晶相恋 {{timer}} 天
    </div>
</template>

<script>
    module.exports = {
        data () {
            return {
                current: new Date(),
                start: new Date(2017, 4, 19)
            };
        },
        computed: {
            timer () {
                return Math.floor((this.current.getTime() - this.start.getTime()) / (24 * 3600 * 1000));
            }
        }
    };
</script>

