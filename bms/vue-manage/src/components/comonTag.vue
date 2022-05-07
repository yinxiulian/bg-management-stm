<template>
<div class="tabs">
   <el-tag
  v-for="(tag,index) in tags"
  :key="tag.name"
  :closable="tag.name !=='home'"
  :effect="$route.name === tag.name?'dark':'plain'"
  @click="changeMenu(tag)"
  @close="handleClose(tag,index)"
  size="small">
  {{tag.label}}
</el-tag>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
    }
  },
  methods: {
    changeMenu (item) {
      this.$router.push({ name: item.name })
    },
    handleClose (item, index) {
      const length = this.$store.state.tabList.length - 1
      this.$store.commit('closeTag', item)
      if (item.name !== this.$route.name) {
        return console.log(length) // 如果点击删除这个选项卡不是当前所展示这一项就保持不动
      }
      if (index === length) { // 如果点击删除这个选项卡是当前所展示这一项就向前推进一位
        this.$router.push({ name: this.$store.state.tabList[index - 1].name })
      } else {
        this.$router.push({ name: this.$store.state.tabList[index].name })
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

<style lang='less'  scoped>
.tabs{
  margin: 10px 0 10px 10px;
}

</style>
