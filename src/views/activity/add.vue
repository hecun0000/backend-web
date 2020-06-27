<template>
  <div class="page-container">
    <div class="page-title">{{ title }}</div>
    <div class="dialog-body">
      <el-form :model="form" :rules="rules" ref="Form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动封面" prop="region">
          <upload @getImgUrl="getImgUrl"></upload>
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
            <el-radio label="拼团" value="group"></el-radio>
            <el-radio label="助力" value="share"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原价" prop="original_price">
          <el-input-number v-model="form.originalPrice" label="原价"></el-input-number>
        </el-form-item>
        <el-form-item label="现价" prop="type">
          <el-input-number v-model="form.activityPrice" label="现价"></el-input-number>
        </el-form-item>
        <el-form-item label="成团人数" prop="desc" v-if="form.type === 'group'">
          <el-input-number v-model="form.teamCount" label="成团人数"></el-input-number>
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
// import uploadImgs from './components/uploadImgs'
import { addActivity, editActivity } from '@/api/activity'
import { deepCopy } from '@/utils/tools'
export default {
  name: 'ProductDialog',
  components: {
    quill
    // uploadImgs
  },
  data () {
    return {
      title: '编辑角色',
      visible: false,
      form: {
        headImg: '',
        title: '',
        time: [],
        type: '',
        originalPrice: 0,
        activityPrice: 0,
        teamCount: 0,
        detail: ''
      },
      rules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }]
        // originalPrice: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        // title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        // title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],

      }
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    getImgUrl (url) {
      console.log(url)
      this.form.headImg = url
    },
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
      const data = deepCopy(this.form)
      data.startTime = this.form.time[0]
      data.endTime = this.form.time[1]
      let res
      if (this.$route.query && this.$route.query.id) {
        data.id = this.$route.query.id
        res = await editActivity(data)
      } else {
        res = await addActivity(data)
      }

      if (res.code === 200) {
        this.$message.success('操作成功')
        this.$router.push('/activity')
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
.task-item-q {
  margin-bottom: 10px;
}
.task-item {
  padding: 10px 0;
}

.task-item + .task-item {
  border-top: 1px solid #eee;
}

.item-box  {
  display: flex;
  .left {
    width: 600px;
    margin-right: 20px;
  }
}
</style>
