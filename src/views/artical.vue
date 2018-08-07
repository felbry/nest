<style lang="scss" scoped>
    // 代码风格
    @import url('../css/atom-one-light.css');

    @mixin h-universal {
        -webkit-margin-before: 0px;
        font-weight: bolder;
        margin-bottom: 24px;
    }

    .artical-content {
        float: left;
        width: 740px;
        height: 100%;
        padding: 0px 55px 0px 60px;
        background-color: #000;
        font-size: 20px;
        opacity: 0.8;
        overflow: auto;
        word-break: break-all;
    }

    .blog-body {
        /deep/ h1 {
            @include h-universal;
            font-size: 48px;
            padding-bottom: 10px;
            border-bottom: 1px solid #fff;
        }

        /deep/ h2 {
            @include h-universal;
            font-size: 38px;
            width: 90%;
            padding-bottom: 10px;            
            border-bottom: 1px solid #fff;            
        }

        /deep/ h3 {
            @include h-universal;
            font-size: 28px;
            width: 80%;
            padding-bottom: 10px;            
            border-bottom: 1px solid #fff;
        }

        /deep/ h4 {
            @include h-universal;
            font-size: 25px;
        }

        /deep/ h5 {
            @include h-universal;
            font-size: 22px;
        }

        /deep/ p {
            -webkit-margin-before: 0px;
            margin-bottom: 24px;
        }

        /deep/ img {
            width: 100%;
            margin: 15px 0;
            border: 1px solid #ddd;
            background-color: #fff;
            border-radius: 4px;
            padding: 5px;
            cursor: pointer;
        }

        /deep/ ul, /deep/ ol {
            margin: 0 0 24px 0;
            padding-left: 25px;
            background-color:#333;
            border-radius: 10px;

            li {
                line-height: 28px;
                margin-bottom: 5px;

                p {
                    margin-bottom: 0;
                }
            }
        }

        /deep/ ul {
            list-style-type: square;            
        }

        /deep/ a {
            color: #61BFC1;
            font-weight: bold;
            cursor: alias;
            text-decoration: underline!important;
        }

        /deep/ blockquote {
            margin: 0 0 24px 0;
            padding: 20px;
            border: 1px dashed #b9d5ff;
            border-width: 1px 0;

            p {
                margin-bottom: 0;
            }
        }

        /deep/ pre {
            margin: 0 0 24px 0;
            padding: 24px;
            background-color:#333;
            white-space: pre-wrap;
            border-radius: 10px;

            code {
                font-family: Consolas, Monaco, Andale Mono, monospace;
                line-height: 1.5;
            }
        }
    }

    .artical-header {
        padding: 25px 0;
        margin-bottom: 25px;
    }

    .artical-time {
        display: block;
    }

    .el-dialog__wrapper /deep/ .el-dialog__header {
        padding: 0px;
    }

    .el-dialog__wrapper /deep/ .el-dialog__body img {
        width: 100%;
    }
</style>

<template>
    <div class="artical-content">
        <div class="artical-header">
            <h2>
                {{artical.title}}
                <small class="artical-time">{{new Date(artical.createdAt).toLocaleDateString()}} {{new Date(artical.createdAt).toLocaleTimeString()}}</small>
            </h2>
        </div>
        <div
            v-html="artical.content"
            class="blog-body">
        </div>
        <div style="height: 25px"></div>
        <el-dialog
            :visible.sync="isPreview"
            custom-class="blog-img-dialog"
            :append-to-body="true"
            :show-close="false">
            <img :src="previewUrl" />
        </el-dialog>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import { Dialog } from 'element-ui';

    module.exports = {
        asyncData ({ store, route }) {
            return store.dispatch('getArtical', route.params.id);
        },
        mounted () {
            Scrollbar.init(document.querySelector('.artical-content'));

            let imgs = document.querySelectorAll('.artical-content img');
            let that = this;
            Array.from(imgs).forEach(img => {
                img.addEventListener('click', function (e) {
                    that.previewUrl = e.target.src;
                    that.isPreview = true;
                });
            });
        },
        data () {
            return {
                isPreview: false,
                previewUrl: ''
            };
        },
        computed: mapState({
            artical: state => state.blog.artical
        }),
        components: {
            [Dialog.name]: Dialog
        }
    };
</script>

