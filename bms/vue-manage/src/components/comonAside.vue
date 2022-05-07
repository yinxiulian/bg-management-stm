<template>
  <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
   background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
    @open="handleOpen" @close="handleClose"
   :collapse="isCollspse">
   <h3>{{isCollspse?'后台':'通用后台管理系统'}}</h3>
   <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :key="item.path" :index="item.path+''">
    <i  :class="'el-icon-'+item.icon"></i>
    <span slot="title">{{item.label}}</span>
  </el-menu-item>
  <el-submenu :index="item.path+''" :key="item.path" v-for="item in hasChildren">
    <template slot="title">
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title" >{{item.label}}</span>
    </template>
    <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.id">
      <el-menu-item @click="clickMenu(subItem)" :index="subIndex.toString()">{{subItem.label}}</el-menu-item>
    </el-menu-item-group>
  </el-submenu>
</el-menu>
</template>

<script>
export default {
  data () {
    return {
      menu: [
        {
          id: 1,
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          id: 2,
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          id: 3,
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          id: 4,
          label: '其他',
          icon: 'location',
          children: [
            {
              id: 1,
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              id: 2,
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    clickMenu (item) {
      this.$router.push({ name: item.name })
      this.$store.commit('selectMenu', item)
    }
  },
  computed: {
    noChildren () {
      return this.menu.filter(item => !item.children)
    },
    hasChildren () {
      return this.menu.filter(item => item.children)
    },
    isCollspse () {
      return this.$store.state.isCollapsee
    }
  }
}
</script>

<style lang="less" scoped>
 .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.el-menu {
  height: 100%;
  border:none;
  h3 {
    color: aliceblue;
    text-align: center;
    line-height: 48px;
  }
}

</style>
