<template>
  <div class="role common-table">
    <div class="handle-box">
      <div class="handle-left">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="活动名称">
          <el-input v-model="searchForm.user" placeholder="请输入活动名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        </el-form>
      </div>
      <div class="handle-right">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <!-- <el-button type="danger">批量删除</el-button> -->
      </div>
    </div>
    <div class="table-box">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column prop="title" label="活动名称"></el-table-column>
        <el-table-column prop="endDate" label="活动时间"></el-table-column>
        <el-table-column prop="type" label="活动类型"></el-table-column>
        <el-table-column prop="teamCount" label="活动人数"></el-table-column>
        <el-table-column prop="activityPrice" label="价格"></el-table-column>
        <el-table-column prop="detail" label="描述"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" @click="handleCheck(scope.row)">查看</el-button> -->
            <el-button type="text" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
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
    <product-dialog ref='ProductDialog'/>
  </div>
</template>

<script>
import { pagination } from '@/mixins'
import { getActivityList } from '@/api/activity'
import { ProductDialog } from './components'

export default {
  name: 'Role',
  components: {
    ProductDialog
  },
  mixins: [pagination], // 封装分页相关函数
  data () {
    return {
      listApi: getActivityList, // 列表请求地址
      multipleSelection: [],
      searchForm: {}
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
    handleEdit (row) {
      this.$router.push({ name: 'activityEdit',
        query: {
          id: row.id
        } })
    },
    handleAdd () {
      // this.$refs.ProductDialog.openDialog()
      this.$router.push({ name: 'activityEdit' })
    },
    handleCheck (row) {
      this.$refs.ProductDialog.openDialog(row, 'check')
    },
    handleDel () {

    }
  }
}
</script>
