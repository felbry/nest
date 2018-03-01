<template>
    <div class="post-body">
        <el-form>
            <el-form-item label="文章标题">
                <el-input v-model="title"></el-input>
            </el-form-item>
        </el-form>
        <el-upload
            ref="upload"
            :multiple="false"
            action="/api/blog/articals"
            :on-change="onChange"
            :on-success="onSuccess"
            :on-error="onError"
            :on-remove="onRemove"
            :auto-upload="false"
            :data="{title: title}">
            <el-button slot="trigger" size="small" type="primary">选择文章</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传至服务器</el-button>
        </el-upload>
    </div>
</template>

<script>
    import { Upload, Button, Form, FormItem, Input } from 'element-ui';

    module.exports = {
        data () {
            return {
                // form: {},
                hasSuccess: false,
                hasError: false,
                file: null,
            };
        },
        computed: {
            title: {
                get: function () {
                    return (this.file && this.file.name) || '';
                },
                set: function (val) {
                    this.file.name = val;
                }
            }
        },
        methods: {
            onChange (file, fileList) {
                if (this.hasSuccess || this.hasError) {
                    if (this.hasSuccess) this.hasSuccess = false;
                    if (this.hasError) this.hasError = false;
                    return;
                }
                // 本地选择
                this.file = fileList[0];
            },
            onSuccess () {
                this.hasSuccess = true;
            },
            onError () {
                this.hasError = true;
            },
            onRemove (file, fileList) {
                this.file = fileList[0];
            },
            upload () {
                this.$refs.upload.submit();
            }
        },
        components: {
            [Upload.name]: Upload,
            [Button.name]: Button,
            [Form.name]: Form,
            [FormItem.name]: FormItem,
            [Input.name]: Input,
        }
    };
</script>

<style scoped>
    
</style>


