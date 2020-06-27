<template>
  <div class="roleDialog">
    <el-dialog :visible.sync="visible" custom-class="dialog-md-width">
      <div class="dialog-title" slot="title">设置问答</div>
      <div class="dialog-body">
        <el-form
          :model="form"
          :rules="rules"
          ref="form"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="two-column-dialog">
            <div class="left-column-item">
              <el-form-item label="问题" prop="question">
                <el-input v-model="form.question" placeholder="请输入问题"></el-input>
              </el-form-item>
              <el-form-item label="答案" prop="answer">
                <el-input v-model="form.answer" placeholder="请输入答案"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSave">保 存</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { putQa, addQa } from '@/api/activity'
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
      title: '设置问答',
      visible: false,
      form: {
        question: '',
        answer: ''
      },
      rules: {
        question: [
          { required: true, message: '请输入问题', trigger: 'blur' }
        ],
        answer: [
          { required: true, message: '请输入答案', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    openDialog (row) {
      this.visible = true
      if (row) {
        this.type = 'edit'
        this.form = row
      } else {
        this.type = 'add'
        this.form = {
          question: '',
          answer: ''
        }
      }
    },
    handleCancel () {
      this.visible = false
      this.form = {
        question: '',
        answer: ''
      }
    },
    handleSave () {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res
          if (this.type === 'add') {
            res = await addQa({
              ...this.form,
              activityId: this.activityId
            })
          } else {
            res = await putQa({
              ...this.form,
              activityId: this.activityId
            })
          }

          if (res.code === 200) {
            this.$message.success('设置成功')
            this.$emit('refresh')
            this.handleCancel()
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
