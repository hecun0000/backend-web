<!--
 * @Author: your name
 * @Date: 2020-06-04 10:19:23
 * @LastEditTime: 2020-06-04 14:10:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \backend-web\src\views\user\index.vue
-->
<template>
  <div class="role common-table">
    <div class="code-box">
      <div>
        <el-input class="code-input" v-model="code" placeholder="请输入核销码"></el-input>
        <el-button type="primary" @click="handleCode">核销</el-button>
      </div>
    </div>
    <div class="handbox">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchForm.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="searchForm.id" placeholder="请输入订单号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="avatar" label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" alt="" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="id" label="订单号"></el-table-column>
        <!-- <el-table-column prop="orderNum" label="核销码"></el-table-column> -->
        <el-table-column prop="nickname" label="昵称"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="handleCheck(scope.row)">查看成员</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <pagination
        :total="total"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <product-dialog ref="ProductDialog" />
  </div>
</template>

<script>
import { pagination } from '@/mixins'
import { getOrderList } from '@/api/order'
import { ProductDialog } from './components'

export default {
  name: 'Role',
  components: {
    ProductDialog
  },
  mixins: [pagination], // 封装分页相关函数
  data () {
    return {
      code: '',
      searchForm: {
        nickname: '',
        phone: '',
        id: ''
      },
      listApi: getOrderList, // 列表请求地址
      multipleSelection: []
    }
  },
  mounted () {
    this.getListData()
  },
  methods: {
    onSubmit () {
      console.log('搜索')
      this.refresh()
    },
    handleCheck (row) {
      this.$refs.ProductDialog.openDialog(row, 'check')
    },
    handleCode () {
      if (!this.code) {
        this.$message.error('请输入核销码')
      }
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
.code-input {
  width: 360px;
  margin-right: 30px;
}
.code-box {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
