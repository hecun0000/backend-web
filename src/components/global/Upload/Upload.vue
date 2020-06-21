<template>
    <el-upload class="uploader" v-bind="$attrs" action="//upload.qiniu.com" :data="form" :http-request="()=>{}" :show-file-list="false" :on-error="handleError"
        :on-success="handleSuccess" :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="preview">
        <i class="el-icon-plus uploader-icon" v-else></i>
    </el-upload>
</template>

<script>
import { Loading } from 'element-ui'
import { uploadFile } from '@/api/activity'

export default {
  name: 'Upload',
  data () {
    return {
      imageUrl: '',
      form: {
        key: '',
        token: ''
      }
    }
  },
  methods: {
    handleSuccess (res, file) {
      Loading.service({}).close()
      this.$message.success('图片上传成功')
      this.imageUrl = res.domain + res.truekey
    },
    async beforeUpload (file) {
      Loading.service({ fullscreen: true, text: '图片上传中' })
      const data = new FormData()
      data.append('image', file)
      const res = await uploadFile(data)
      console.log(file, res)
    },
    handleError () {
      Loading.service({}).close()
      this.$message.error('上传图片失败')
    }
  }
}
</script>

<style scoped>
    .uploader {
        border: 1px dashed #d9d9d9;
        width: 178px;
        height: 178px;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .preview {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
