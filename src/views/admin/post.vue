<template>
    <div class="post-body">
        <el-form>
            <el-form-item label="文章标题">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
        </el-form>
        <el-upload
            ref="upload"
            action="/api/admin/posts"
            :on-change="onChange"
            :on-success="onSuccess"
            :on-error="onError"
            :auto-upload="false"
            :data="form">
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
                form: {
                    title: ''
                },
                hasSuccess: false,
            };
        },
        methods: {
            onChange (file, fileList) {

            },
            onSuccess () {

            },
            onError () {

            },
            upload () {

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


