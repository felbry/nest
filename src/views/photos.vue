<style scpoed>
    .photo-content {
        position: relative;
        float: left;
        width: 740px;
        height: 100%;
        padding: 25px 0px 25px 0px;
        background-color: #000;
        opacity: 0.8;
    }

    .photo-content .category {
        margin-left: 35px;
        padding: 25px;
        margin-bottom: 25px;
    }

    .menu-item {
        color: #fff!important;
        margin-right: 18px;
        font-size: 24px;
        transition: font-size 0.6s;
    }

    .menu-item:hover, .router-link-active {
        font-size: 28px;
        background-color: #fff;
        color: #000!important;
        cursor: pointer;
    }
</style>

<template>
    <div class="photo-content">
        <div class="category">
            <router-link class="menu-item" to="/photos/all">全部</router-link>
            <router-link
                v-for="tag in tagList"
                :key="tag.id"
                :to="'/photos/' + tag.id"
                class="menu-item">
                {{tag.name}}
            </router-link>
        </div>
        <router-view></router-view>        
    </div>
</template>

<script>
    import { mapState } from 'vuex';    

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getPhotoTagList');
        },
        data () {
            return {
                // url: ''
            };
        },
        computed: mapState({
            tagList: state => state.photo.tagList
        }),
    };
</script>

