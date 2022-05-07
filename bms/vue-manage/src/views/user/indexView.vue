<template>
  <div class="manage">
    <el-dialog
    :title="operateType === 'add'?'新增用户':'更新用户'"
    :visible.sync="isShow"
    >
    <comonForm
    :formLable="operateFormLabel"
    :form="operateForm"
    :inline="true"
    ref="form"
    ></comonForm>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取消</el-button>
      <el-button type="primary" @click="confirm" @munchange="getElementform">确定</el-button>
    </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
    <comonForm
    :formLable="formLable"
    :form="searchForm"
    :inline="true"
    ref="form"
    >
    <el-button type="primary"  @click="goback">回到首页</el-button>
     <el-input class="mininput"
    placeholder="请输入用户姓名" v-model="inputvalue" >
    </el-input>
    <el-button type="primary" @click="getList(inputvalue)">搜索</el-button>
    </comonForm>
    </div>
    <comonTable
    @gopage="getpage"
    @updataUser="updataUserInfo"
    :tableData="this.$store.state.tableData"
    :tableLabel="tableLabel"
    ></comonTable>
  </div>
</template>

<script>
import comonForm from '@/components/comonForm.vue'
import comonTable from '@/components/comonTable.vue'
export default {
  data () {
    return {
      operateType: 'add',
      isShow: false,
      inputvalue: '',
      pageSize: 0,
      currentPage: 0,
      userid: 0,
      operateFormLabel: [
        {
          model: 'name',
          label: '姓名',
          type: 'input'
        },
        {
          model: 'age',
          label: '年龄',
          type: 'input'
        },
        {
          model: 'sex',
          label: '性别',
          type: 'select',
          opts: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 0
            }
          ]
        },
        {
          model: 'birth',
          label: '出生日期',
          type: 'date'
        },
        {
          model: 'addr',
          label: '地址',
          type: 'input'
        }
      ],
      operateForm: {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      },
      formLable: [
        {
          model: 'keyword',
          label: '',
          type: 'input'
        }
      ],
      searchForm: {
        keyword: ''
      },
      tableLabel: [
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'age',
          label: '年龄'
        },
        {
          prop: 'sex',
          label: '性别'
        },
        {
          prop: 'birth',
          label: '出生日期',
          width: 200
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        }
      ]
    }
  },
  components: {
    comonForm,
    comonTable
  },
  methods: {
    getElementform (val) {
      this.elementForm = val
    },
    confirm () {
      if (this.operateType === 'edit') {
        this.$http.post('http://127.0.0.1:3007/api/updataUser', { data: { id: this.userid, operateForm: this.operateForm } }).then(res => {
          console.log(res)
          this.isShow = false
          this.goback()
        })
      } else {
        console.log(this.operateForm)
        this.$http.post('http://127.0.0.1:3007/api/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
        })
      }
    },
    addUser () {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        name: '',
        addr: '',
        age: '',
        birth: '',
        sex: ''
      }
    },
    getList (val) {
      this.$store.dispatch('getList', val)
      this.inputvalue = ''
    },
    getpage (obj) {
      this.currentPage = obj.currentPage
      this.pageSize = obj.pageSize
    },
    goback () {
      this.$store.dispatch('userList', { pageSize: this.pageSize, currentPage: this.currentPage })
    },
    updataUserInfo (row) {
      this.userid = row.id
      this.operateType = 'edit'
      this.isShow = true
      this.operateForm = row
    }
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.mininput{
  width: 220px;
  margin: 0 5px 0 0;
}
</style>
