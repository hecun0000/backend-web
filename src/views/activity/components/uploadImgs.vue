<template>
    <div class="add-store">
        <el-upload class="upload-pic" action="//upload.qiniup.com"  :http-request="()=>{}" :data="form"
                :file-list="fileList" :on-error="handleErrorpics" :on-success="handleSuccesspics" :before-upload="beforeUploadpics" list-type="picture-card"
                :on-preview="handlePictureCardPreview" :on-remove="handleRemove" accept="image/*">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" width="40%" center>
            <img width="80%" :src="dialogImageUrl" alt="" class="img">
        </el-dialog>
    </div>
</template>

<script>
import { Loading } from 'element-ui'
import { uploadFile } from '@/api/activity'
import env from '@/utils/env'

export default {
  name: 'edit',
  props: ['editPics'],
  data () {
    return {
      pics: [], // 商品主图
      form: {
        key: '',
        token: ''
      },
      fileList: [

      ],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  watch: {
    editPics (val) {
      this.editPics.forEach((v, i) => {
        this.fileList.push({ name: i, url: v })
        this.pics.push(v)
        this.$emit('productImgs', this.pics)
      })
    }
  },
  methods: {
    handleImageList (fileList) {
      this.$emit('productImgs', this.pics)
    },
    // 门店照片上传成功fileList
    handleSuccesspics (res, file, fileList) {
      Loading.service({}).close()
      this.$message.success('图片上传成功')
      this.handleImageList(fileList)
    },
    // 门店照片上传之前
    async beforeUploadpics (file) {
      Loading.service({ fullscreen: true, text: '图片上传中' })
      const data = new FormData()
      data.append('photo', file)
      const res = await uploadFile(data)
      console.log(res)
      Loading.service({}).close()
      if (res.code === 200) {
        const url = '/images/' + res.data.path
        this.pics.push(env.hostUrl + url)
        this.$emit('getPics', this.pics)
      }
      console.log(file, res)
    },
    // 门店照片上传失败
    handleErrorpics () {
      Loading.service({}).close()
      this.$message.error('上传图片失败')
    },
    // 照片墙删除照片
    handleRemove (file, fileList) {
      this.fileList = fileList
      this.handleImageList(fileList)
    },
    // 照片墙照片预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style >
    .add-store .info {
        font-size: 12px;
        line-height: 20px;
        margin-top: 8px;
        color: #999;
    }
    .add-store .img {
        margin: 0 auto;
    }
    .add-store .el-upload--picture-card ,.add-store .el-upload-list--picture-card .el-upload-list__item {
        width: 172px;
        height: 172px;
        line-height: 172px;
    }
</style>
