<template>
<header style="color:">
  <div class="l-content">
    <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini"></el-button>
    <el-breadcrumb separator="/">
  <el-breadcrumb-item v-for="item in tags" :key="item.name" :to="{ path:item.path }">{{item.label}}</el-breadcrumb-item>
</el-breadcrumb>
  </div>
  <div class="r-content">
    <el-dropdown trigger="click" size="mini">
      <span>
         <img class="user" :src="userImg" >
      </span>
      <el-dropdown-menu slot="dropdown">
    <el-dropdown-item @click.native="user">个人中心</el-dropdown-item>
    <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
  </el-dropdown-menu>
    </el-dropdown>
  </div>
</header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'comonHeader',
  data () {
    return {
      userImg: require('../assets/images/user.png')
    }
  },
  methods: {
    handleMenu () {
      this.$store.commit('CollapseeMenu')
      console.log(this.$route.path)
    },
    logout () {
      // 1. 清空 token
      localStorage.removeItem('token')
      // 2. 跳转到登录页面
      this.$router.push('/login')
      this.$message({
        type: 'success',
        message: '退出登录成功!'
      })
    },
    user () {
      if (this.$route.path === '/main') {
        this.$message({
          type: 'success',
          message: '当前位置已在个人中心！'
        })
      } else {
        this.$router.push('/main')
        this.$message({
          type: 'success',
          message: '已返回个人中心!'
        })
      }
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tabList
    })
  }
}
</script>

<style lang="less" scoped>
.layout-header-container {
  height: 60px;
  border-bottom: 1px solid #eaeaea;
}
header{
  display: flex;
  height: 100%;
  width: 100%;
  justify-content: space-between;
  align-items: center;

}
.l-content{
  display: flex;
  align-items: center;
  .el-button{
    margin-right: 20px;
  }
}
.r-content{
  .user{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: rgb(153, 153, 153);
}
/deep/  .el-breadcrumb__inner.is-link {
   color: rgb(102, 171, 255);
}
/deep/ [data-v-b111fd26] .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: white;
}
</style>
