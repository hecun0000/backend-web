<template>
  <div class="page-container">
    <div class="page-title">{{ title }}</div>
    <div class="dialog-body">
      <el-form :model="form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动封面" prop="region">
          <upload></upload>
        </el-form-item>
        <el-form-item label="轮播图" prop="region">
          <el-upload
            action="//upload.qiniu.com"
            :http-request="()=>{}"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动时间" prop="delivery">
          <el-date-picker
            v-model="form.time"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动类型" prop="type">
          <el-radio-group v-model="form.type">
            <el-radio label="拼团"></el-radio>
            <el-radio label="助力"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原价" prop="original_price">
          <el-input-number v-model="form.original_price" label="原价"></el-input-number>
        </el-form-item>
        <el-form-item label="现价" prop="type">
          <el-input-number v-model="form.activity_price" label="现价"></el-input-number>
        </el-form-item>
        <el-form-item label="成团人数" prop="desc">
          <el-input-number v-model="form.team_count" label="成团人数"></el-input-number>
        </el-form-item>
        <el-form-item label="活动详情" prop="desc">
          <quill @getEditorHtml="getEditorHtml" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="handleSave">保 存</el-button>
            <el-button @click="handleCancel">取 消</el-button>
          <!-- <quill @getEditorHtml="getEditorHtml" /> -->
        </el-form-item>
      </el-form>
    </div>
    <div>
    </div>
  </div>
</template>
<script>
import quill from './components/quill'
import { addActivity, editActivity } from '@/api/activity'
import { deepCopy } from '@/utils/tools'
export default {
  name: 'ProductDialog',
  components: {
    quill
  },
  data () {
    return {
      title: '编辑角色',
      visible: false,
      form: {
        title: '',
        time: [],
        type: '',
        original_price: 0,
        activity_price: 0,
        team_count: 0,
        detail: ''
      },
      rules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        detail: [{ required: true, message: '请填写活动详情', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getEditorHtml (html) {
      console.log(html, 'html')
      this.form.detail = html
    },
    init (row, type = 'edit') {
      this.visible = true
      if (this.$route.query && this.$route.query.id) {
        this.id = this.$route.query.id
        // 编辑
        this.type = 'edit'
        this.title = '编辑活动'
      } else {
        this.type = 'add'
        this.title = '新增活动'
      }
    },
    handleCancel () {
      this.$router.push('activity')
    },
    async handleSave () {
      // this.$refs.Form.validate(valid => {
      //   if (valid) {

      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
      const data = deepCopy(this.form)
      let res
      if (this.$route.query && this.$route.query.id) {
        data.id = this.$route.query.id
        res = await editActivity(data)
      } else {
        res = await addActivity(data)
      }

      if (res.code === 200) {
        this.$message.success('操作成功')
        this.$router.push('activity')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  margin: 15px;
  background: #fff;
  border-radius: 4px;
  padding: 15px;
}
.page-title {
  line-height: 60px;
  text-align: center;
  font-size: 16px;
}
</style>
