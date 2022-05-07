<template>
  <div class="common-table" >
    <el-table :data="tableData" height=95% stripe="">
      <el-table-column
      show-overflow-tooltip
      v-for="item in tableLabel"
      :key="item.prop"
      :label="item.label"
      :width="item.width? item.width:125"
      >
      <template slot-scope="scope">
        <span style="margin-left:10px">{{scope.row[item.prop]}}</span>
      </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
       <template slot-scope="scope">
        <el-button size="mini" @click="handEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handDelete(scope.row)">删除</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-pagination
            class="pager"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 3, 5, 10, 20, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableData: Array,
    tableLabel: Array
  },
  data () {
    return {
      currentPage: 1, // 当前页
      total: 0, // 数据总条数
      pageSize: 12// 每页条数
    }
  },
  methods: {
    hanleEdit () {

    },
    handleDelete () {

    },
    changpage () {

    },
    getAccountListByPage () {
      // 收集当前页码 和 每页显示条数
      const pageSize = this.pageSize
      const currentPage = this.currentPage
      // 发送ajax请求 把分页数据发送给后端
      this.$store.dispatch('userList', { pageSize, currentPage })
      // 接收后端返回的数据总条数 total 和 对应页码的数据 data
      // 赋值给对应的变量即可
      this.total = this.$store.state.totals
      // 如果当前页没有数据 且 排除第一页
      if (!this.$store.state.tableData.length && this.currentPage !== 1) {
        // 页码减去 1
        this.currentPage -= 1
        // 再调用自己
        this.getAccountListByPage()
      }
    },

    // 每页显示条数改变 就会触发这个函数
    handleSizeChange (val) {
      // 保存每页显示的条数
      this.pageSize = val
      // 调用分页函数
      this.getAccountListByPage()
    },
    // 当前页码改变 就会触发这个函数
    handleCurrentChange (val) {
      // 保存当前页码
      this.currentPage = val
      // 调用分页函数
      this.getAccountListByPage()
    },
    handDelete (row) {
      console.log(row)
      this.$confirm('此操作将永久删除该用户信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const id = row.id
        this.$http.get('http://127.0.0.1:3007/api/delete', { params: { id } })
          .then(() => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getAccountListByPage()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handEdit (row) {
      this.$emit('updataUser', row)
    }
  },
  created () {
    this.$emit('gopage', { pageSize: this.pageSize, currentPage: this.currentPage })
    this.getAccountListByPage()
  }
}
</script>

<style lang="less" scoped>
.common-table {
  height: 580px;
  background-color: aliceblue;
  position: relative;
  .pager{
    position:fixed;
    top:680px;
    right: 40px;
    padding: 0;
  }
}
</style>
