<template>
 <el-container style="height:100%">
  <el-aside  width="auto">
    <Common-aside></Common-aside>
  </el-aside>
  <el-container>
    <el-header>
   <Common-Header></Common-Header>
    </el-header>
   <CommonTag></CommonTag>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
import CommonAside from '../components/comonAside.vue'
import CommonHeader from '../components/comonHeader.vue'
import CommonTag from '@/components/comonTag.vue'
export default {
  name: 'myHome',
  data () {
    return {}
  },
  components: {
    CommonAside,
    CommonHeader,
    CommonTag
  }
}
</script>

<style lang="less" scoped>
.el-header{
  background-color: rgb(48, 43, 43);
}
</style>
