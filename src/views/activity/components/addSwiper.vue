<template>
  <div class="roleDialog">
    <el-dialog :visible.sync="visible" custom-class="dialog-md-width">
      <div class="dialog-title" slot="title">设置轮播图</div>
      <div class="dialog-body">
        <div class="upload-item">

        <span>
          上传图片
        </span>
        <el-upload class="uploader" v-bind="$attrs" action="//upload.qiniu.com" :data="form" :http-request="()=>{}" :show-file-list="false" :on-error="handleError"
        :on-success="handleSuccess" :before-upload="beforeUpload">
        <img v-if="imageUrl" :src="imageUrl" class="preview">
        <i class="el-icon-plus uploader-icon" v-else></i>
    </el-upload>
        </div>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSave">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { uploadFile } from '@/api/activity'
import { Loading } from 'element-ui'

import env from '@/utils/env'
export default {
  name: 'ProductDialog',
  props: {
    activityId: {
      type: [String, Number],
      default: ''
    }
  },
  data () {
    return {
      title: '设置轮播图',
      visible: false,
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
      data.append('photo', file)
      data.append('activityId', this.activityId)
      const res = await uploadFile(data)
      console.log(res)
      Loading.service({}).close()
      if (res.code === 200) {
        const url = '/images/' + res.data.path
        this.imageUrl = env.hostUrl + url
        this.$emit('getImgUrl', this.imageUrl)
      }
      console.log(file, res)
    },
    handleError () {
      Loading.service({}).close()
      this.$message.error('上传图片失败')
    },
    openDialog (row) {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
    },
    handleSave () {
      this.$emit('refresh')
      this.handleCancel()
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-item {
  display: flex;
  > span {
    margin-right: 20px;
  }
}
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
