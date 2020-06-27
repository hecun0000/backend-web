<template>
<div>

  <el-dialog title="添加问答" :visible.sync="visible">
    <div class="dialog-body">
      <el-button type="primary" @click="addQA">添加轮播图</el-button>
      <div class="table-box">
        <el-table :data="tasks" style="width: 100%">
          <el-table-column prop="date" label="问题">
            <template slot-scope="scope">
              <template>
                <img :src="url + scope.row" alt="" srcset="">
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作" width="80">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="handleSave">确 定</el-button>
    </span>
  </el-dialog>
  <add-swiper ref="addSwiper" :activityId="activityId" @refresh="refreshList"/>
</div>
</template>
<script>
import { getSwiper } from '@/api/activity'
import addSwiper from './addSwiper'
import env from '@/utils/env'

export default {
  components: {
    addSwiper
  },
  data () {
    return {
      url: env.hostUrl + 'images/',
      visible: false,
      activityId: '',
      tasks: []
    }
  },
  methods: {
    async refreshList () {
      const res = await getSwiper(this.activityId)
      if (res.code === 200) {
        this.tasks = res.data
      }
    },
    async openDialog (row) {
      this.visible = true
      this.activityId = row.id
      this.tasks = []
      this.refreshList()
    },
    handleClose () {
      this.visible = false
    },
    async handleSave () {
      this.visible = false
    },
    delQA (index) {
      this.tasks.splice(index, 1)
    },
    handleEdit (row) {
      this.$refs.addSwiper.openDialog(row)
    },
    addQA () {
      this.$refs.addSwiper.openDialog()
    }
  }
}
</script>

<style scoped>
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
}
.item-box .left {
  width: 600px;
  margin-right: 20px;
}
</style>
