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
    <div class="handbox">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="手机号">
          <el-input v-model="searchForm.phone" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="searchForm.nickname" placeholder="昵称"></el-input>
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
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.avatarUrl" alt="" class="avatar">
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="grade" label="年级"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column label="性别">
          <template slot-scope="scope">
            {{ scope.row.gender }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" @click="handleCheck(scope.row)">查看优惠券</el-button>
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
    <coupon-dialog ref="couponDialog"/>
  </div>
</template>

<script>

import { pagination } from '@/mixins'
import { getUserList } from '@/api/user'
import { ProductDialog, couponDialog } from './components'

export default {
  name: 'Role',
  components: {
    ProductDialog,
    couponDialog
  },
  mixins: [pagination], // 封装分页相关函数
  data () {
    return {
      searchForm: {
        nickname: '',
        phone: ''
      },
      listApi: getUserList, // 列表请求地址
      multipleSelection: []
    }
  },
  mounted () {
    this.getListData()
  },
  methods: {
    onSubmit () {
      this.refresh()
    },
    handleEdit (row) {
      this.$refs.ProductDialog.openDialog(row)
    },
    handleAdd () {
      this.$refs.ProductDialog.openDialog()
    },
    handleCheck (row) {
      this.$refs.couponDialog.openDialog(row)
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 50px;
  height: 50px;
}
</style>
