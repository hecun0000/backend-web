<template>
  <div class="page-container">
    <div class="page-title">{{ title }}</div>
    <div class="dialog-body">
      <el-form :model="form" :rules="rules" ref="Form" label-width="140px" class="demo-ruleForm">
        <el-form-item label="活动名称" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="活动封面" prop="headImg">
          <upload @getImgUrl="getImgUrl" ref="upload"></upload>
        </el-form-item>
        <el-form-item label="活动结束时间" prop="endDate">
          <el-date-picker
            v-model="form.endDate"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="活动类型" prop="type">
          <el-radio-group v-model="form.type" @change="handleChange">
            <el-radio label="group">拼团</el-radio>
            <el-radio label="share">助力</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="原价" prop="originalPrice">
          <el-input-number v-model="form.originalPrice" :precision="2"  label="原价"></el-input-number>
        </el-form-item>
        <el-form-item label="现价" prop="activityPrice">
          <el-input-number v-model="form.activityPrice" :precision="2"  label="现价"></el-input-number>
        </el-form-item>
        <el-form-item label="成团人数" v-if="form.type === 'group'">
          <el-input-number v-model="form.teamCount" label="成团人数"></el-input-number>
        </el-form-item>

        <el-form-item label="优惠券发放规则" prop="actSetting" v-if="form.type">
          <template v-if="form.type === 'group'">
            <!-- 拼团 -->
            拼团成功后， 每人发放
            <el-input-number v-model="form.actSetting" :precision="2"  label="金额"></el-input-number>
            元优惠券
          </template>
          <template v-else>
            <ul>
              <li v-for="(item, index) in form.actSetting" :key="index" class="actSetting-item">
                当人数达到
                <el-input-number v-model="item.number" label="人数"></el-input-number>
                发放
                <el-input-number v-model="item.actSetting" label="金额"></el-input-number>
                元优惠券
                <el-button type="text" @click="handleAdd">添加</el-button>
                <el-button type="text" v-if="index > 0" @click="handleDel(index)">删除</el-button>
              </li>
            </ul>
          </template>
        </el-form-item>

        <el-form-item label="活动详情" prop="detail">
          <quill @getEditorHtml="getEditorHtml" :editDetail="editDetail" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">保 存</el-button>
          <el-button @click="handleCancel">取 消</el-button>
          <!-- <quill @getEditorHtml="getEditorHtml" /> -->
        </el-form-item>
      </el-form>
    </div>
    <div></div>
  </div>
</template>
<script>
import quill from './components/quill'
// import uploadImgs from './components/uploadImgs'
import { addActivity, editActivity, getAtivityById } from '@/api/activity'
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
        endDate: '',
        type: '',
        originalPrice: 0,
        activityPrice: 0,
        teamCount: 0,
        detail: '',
        actSetting: ''
      },
      editDetail: '',
      rules: {
        title: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        headImg: [{ required: true, message: '请上传活动封面', trigger: 'blur' }],
        endDate: [{ required: true, message: '请选择活动结束时间', trigger: 'blur' }],
        type: [{ required: true, message: '请选择活动类型', trigger: 'blur' }],
        originalPrice: [{ required: true, message: '请输入原价', trigger: 'blur' }],
        activityPrice: [{ required: true, message: '请输入现价', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.init()
    console.log(this.$route)
    this.id = this.$route.query.id
    if (this.id) {
      this.getDetail(this.id)
    }
  },
  methods: {
    handleDel (index) {
      this.form.actSetting.splice(index, 1)
    },
    handleAdd () {
      this.form.actSetting.push({
        number: '',
        actSetting: ''
      })
    },
    handleChange () {
      if (this.form.type === 'group') {
        this.form.actSetting = ''
      } else {
        const result = []
        result.push({
          number: '',
          actSetting: ''
        })
        this.form.actSetting = result
      }
    },
    async getDetail (id) {
      const res = await getAtivityById(id)
      if (res.code === 200) {
        this.form = res.data
        this.editDetail = res.data.detail
        this.$refs.upload.imageUrl = res.data.headImg

        if (res.data.actSetting) {
          if (this.form.type === 'group') {
            this.form.actSetting = res.data.actSetting
          } else {
            const result = []
            const actSetting = JSON.parse(res.data.actSetting)
            Object.keys(actSetting).map(item => {
              console.log(actSetting[item])
              result.push({
                number: item,
                actSetting: actSetting[item]
              })
            })
            this.form.actSetting = result
          }
        }
      }
    },
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
      this.$router.push('/activity')
    },
    async handleSave () {
      this.$refs.Form.validate(async (valid) => {
        if (valid) {
          const data = deepCopy(this.form)
          let res
          if (data.actSetting.length > 0) {
            const actSetting = {}
            data.actSetting.map(item => {
              actSetting[item.number] = item.actSetting
            })
            data.actSetting = JSON.stringify(actSetting)
          }

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
        } else {
          console.log('error submit!!')
          return false
        }
      })
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

.item-box {
  display: flex;
  .left {
    width: 600px;
    margin-right: 20px;
  }
}

.actSetting-item {
  margin-bottom: 10px;
}
</style>
