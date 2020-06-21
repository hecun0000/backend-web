<template>
  <div class="roleDialog">
    <el-dialog :visible.sync="visible" custom-class="dialog-md-width">
      <div class="dialog-title" slot="title">{{ title }}</div>
      <div class="dialog-body">
        <el-table
        ref="table"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :height="500"
      >
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" alt="" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{ scope.row.gender===1?"男":'女' }}
          </template>
        </el-table-column>
      </el-table>
      </div>
      <div class="dialog-footer">
        <el-button @click="handleCancel">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getCouponById } from '@/api/coupon'
export default {
  name: 'ProductDialog',
  data () {
    return {
      visible: false,
      title: '',
      tableData: []
    }
  },
  methods: {
    openDialog (id) {
      this.visible = true
      this.title = '查看成员'
      this.getCouponList(id)
    },
    async getCouponList (id) {
      const res = await getCouponById(id)
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    handleCancel () {
      this.visible = false
      this.tableData = []
    }
  }
}
</script>
<style scoped>
.dialog-body {
  margin-bottom: 20px;
}
</style>
