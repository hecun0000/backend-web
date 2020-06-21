<template>
    <div>
        <div :id="refId" class='quill-header'>
            <select class="ql-header" title="标题样式">
                <option value="1"></option>
                <option value="2"></option>
                <option value="3"></option>
                <option value="4"></option>
                <option value="5"></option>
                <option value="6"></option>
                <option selected></option>
            </select>
            <button class="ql-bold" title="粗体"></button>
            <button class="ql-italic" title="斜体"></button>
            <button class="ql-underline" title="下划线"></button>
            <button class="ql-strike" title="删除线"></button>
            <button class="ql-list" value="ordered" title="编号"></button>
            <button class="ql-list" value="bullet" title="项目符号"></button>
            <button class="ql-indent" value="-1" title="减少缩进量"></button>
            <button class="ql-indent" value="+1" title="增加缩进量"></button>
            <select class="ql-color" title="字体颜色"> </select>
            <select class="ql-align" title="对齐方式"> </select>
            <button class="ql-image" title="添加图片"></button>
        </div>

        <quill-editor :style="{width:width,height:height}" :ref="'Quill'+refId" :options="editorOption"
                      @change="onEditorChange($event)"></quill-editor>
        <el-upload class="uploader" action="//upload.qiniup.com" :data="form" :show-file-list="false"
                   :on-error="handleError" ref="upload" accept="image/*"
                   :on-success="handleSuccess" :before-upload="beforeUpload">
            <el-button size="small" type="primary" :id="'imgInput'+this.refId">点击上传</el-button>
        </el-upload>

    </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import * as Quill from 'quill'
// import getUpToken from '@/api/getUpToken'
import { Loading } from 'element-ui'

import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'editor-vue',
  data () {
    return {
      editorOption: {
        modules: {
          toolbar: '#' + this.refId
        },
        placeholder: this.placeholder
      },
      imageUrl: '',
      form: {
        key: '',
        token: ''
      },
      addRange: []
    }
  },
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '200px'
    },
    editDetail: {
      type: String,
      default: ''
    },
    refId: {
      type: String,
      default: 'quillEdit'
    },
    placeholder: {
      type: String,
      default: '请在此处编辑活动详情'
    }
  },
  watch: {
    editDetail (val) {
      if (val !== '') {
        // 将请求回来的HTML插入到编辑器中
        this.$refs['Quill' + this.refId].quill.clipboard.dangerouslyPasteHTML(val)
        // 获取HTML的长度
        let length = this.$refs['Quill' + this.refId].quill.getLength()
        // 将光标移到最后
        this.$refs['Quill' + this.refId].quill.setSelection(length)
        document.querySelector('.app-main').scrollTop = 0
      }
    }
  },
  methods: {
    onEditorChange ({ editor, html, text }) {
      this.$emit('getEditorHtml', html)
    },
    // 图片上传成功
    handleSuccess (res, file) {
      Loading.service({}).close()
      this.$message.success('图片上传成功')
      this.imageUrl = res.domain + res.truekey
      this.$emit('getImgUrl', this.imageUrl)
      let vm = this
      let url = this.imageUrl
      if (url != null && url.length > 0) {
        // 将文件上传后的URL地址插入到编辑器文本中
        let value = url
        // API: https://segmentfault.com/q/1010000008951906
        // this.$refs.myTextEditor.quillEditor.getSelection();
        // 获取光标位置对象，里面有两个属性，一个是index 还有 一个length，这里要用range.index，即当前光标之前的内容长度，然后再利用 insertEmbed(length, 'image', imageUrl)，插入图片即可。
        vm.addRange = vm.$refs['Quill' + this.refId].quill.getSelection()
        let index = vm.addRange !== null ? vm.addRange.index : 0
        vm.$refs['Quill' + this.refId].quill.insertEmbed(
          index,
          'image',
          value,
          Quill.sources.USER
        ) // 调用编辑器的 insertEmbed 方法，插入URL
        vm.$refs['Quill' + this.refId].quill.setSelection(index + 1, 0)
      } else {
        this.$message.error(`${vm.uploadType}插入失败`)
      }
      this.$refs.upload.clearFiles() // 插入成功后清除input的内容
    },
    // 图片上传之前
    beforeUpload (file) {
      // Loading.service({ fullscreen: true, text: '图片上传中' })
      // let splitArray = file.name.split('.')
      // let current = moment()
      //   .format('YYYYMMDD')
      //   .toString()
      // let prefix = moment(file.lastModified)
      //   .format('HHmmss')
      //   .toString()
      // let suffix = new Date().getTime() + '.' + splitArray[splitArray.length - 1]
      // let key = encodeURI(`${current}/${prefix}_${suffix}`)

      // if (file.type.indexOf('image') == -1) {
      //   Loading.service({}).close()
      //   this.$message.error('请选择图片文件')
      //   return false
      // } else {
      //   return getUpToken({ key })
      //     .then(res => {
      //       this.form = {
      //         key: key,
      //         token: res.data.uptoken
      //       }
      //     })
      //     .catch(() => {
      //       Loading.service({}).close()
      //       this.$message.error('上传图片失败')
      //     })
      // }
    },
    // 图片上传失败
    handleError () {
      Loading.service({}).close()
      this.$message.error('上传图片失败')
    },
    imgHandler () {
      document.getElementById('imgInput' + this.refId).click()
    }
  },
  mounted () {
    this.$refs['Quill' + this.refId].quill
      .getModule('toolbar')
      .addHandler('image', this.imgHandler)
  },
  components: { quillEditor }
}
</script>

<style scoped>
    .uploader {
        display: none;
    }

    .quill-header {
        border-bottom: 0;
    }
</style>
