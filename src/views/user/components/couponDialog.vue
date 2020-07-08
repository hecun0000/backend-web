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
        height="500"
      >
        <el-table-column prop="amount" label="金额"></el-table-column>
        <el-table-column prop="couponCode" label="核销码"></el-table-column>
        <el-table-column prop="expireDate" label="过期时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-if="scope.row.valid" @click="handleCheck(scope.row)">核销</el-button>
            <span v-else>---</span>
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
import { getCouponById, couponWirte } from '@/api/user'
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
    handleCheck (row) {
      this.$confirm('确认核销优惠券吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { couponCode } = row
        couponWirte({
          userId: this.openId,
          couponCode
        }).then(_ => {
          this.getCouponList(this.openId)
          this.$message({
            type: 'success',
            message: '核销成功!'
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消核销!'
        })
      })
    },
    openDialog (row) {
      this.visible = true
      this.title = row.nickName + '的优惠券'
      this.openId = row.openId
      this.getCouponList(this.openId)
    },
    async getCouponList (id) {
      const res = await getCouponById(id)
      if (res.code === 200) {
        this.tableData = res.data
      }
    },
    handleCancel () {
      this.visible = false
      this.openId = ''
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
