<template>
  <el-card shadow="always" class="register">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm">
    <h3 class="title_text">系统登录</h3>
    <el-form-item class="formitem" label="账号" placeholder="请输入账号" prop="username">
    <el-input v-model.number="ruleForm.username" placeholder="请输入账号"></el-input>
  </el-form-item>
  <el-form-item class="formitem" label="密码" prop="password">
    <el-input type="password"  v-model="ruleForm.password" placeholder="请输入密码"  autocomplete="off"></el-input>
  </el-form-item>
      <el-form-item class="new_button"  style="margin-top:50px">
    <el-button class="regbutton" type="primary" @click="submitForm('ruleForm')">登录</el-button>
    <el-button class="regbutton" type="primary" @click="submitre">注册</el-button>
  </el-form-item>

</el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    const checkusername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('账号不能为空'))
      }
      setTimeout(() => {
        if (value instanceof Number) {
          callback(new Error('请输入数字值'))
        } else {
          const uPattern = /^[a-zA-Z0-9_-]{4,16}$/
          if (!uPattern.test(value)) {
            callback(new Error('账号长度不能少于8位'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    const validatepassword = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('密码不能为空'))
      }
      setTimeout(() => {
        if (value instanceof Number) {
          callback(new Error('请输入数字值'))
        } else {
          const uPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/
          if (!uPattern.test(value)) {
            callback(new Error('密码的强度不够,最少6位包括至少1个大写,字母1个小写字母1个数字,1个特殊字符'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      ruleForm: {
        username: '',
        password: '',
        checkPass: '',
        status: 0
      },
      rules: {
        password: [
          { validator: validatepassword, trigger: 'blur' }
        ],
        username: [
          { validator: checkusername, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$http.post('http://127.0.0.1:3007/api/login', { data: { ruleForm: this.ruleForm } })
        .then(res => {
          console.log(res)
          this.ruleForm = {
            username: '',
            password: '',
            checkPass: '',
            status: 0
          }
          if (res.data.status === 0) {
            localStorage.setItem('token', res.data.token)
            this.$router.push('/main')
            this.$message({
              type: 'success',
              message: '登录成功!'
            })
          } else {
            // 登录失败
            localStorage.removeItem('token')
            this.$message({
              type: 'info',
              message: `${res.data.message},登录失败!`
            })
          }
        })
    },
    submitre () {
      this.$router.push('/register')
    }
  }
}
</script>

<style lang="less" scoped>
.register{
  position: relative;
  width:450px;
  height:350px;
  top:20%;
  left: 50%;
  margin-left: -225px;
  background-color: rgb(255, 255, 255);
  border-radius: 3%;
 .demo-ruleForm{
   margin-top: 20px;
   .title_text{
     font-size: 25px;
     text-align: center;
     height: 30px;
     line-height: 30px;
     margin-bottom: 20px;
   }
   /deep/ .new_button{
     width:100%;
     display: flex;
     justify-content:center;
     .regbutton{
       margin-right: 60px;
     }
   }
 }
}

</style>
