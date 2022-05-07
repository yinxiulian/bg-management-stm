<template>
<div></div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    tate: {
      type: Number,
      default: 1
    },
    id: {
      type: Number,
      default: 1
    }
  },
  methods: {
    add () {
      console.log(this.goods)
      this.$store.commit('cmyGoos', this.id)
    }
  },
  computed: {
    ...mapState({
      goods: state => state.goodsData
    })
  }
}
</script>

<style lang="less" scoped>
.number-box {
  display: inline-block;
  width: 40px;
  text-align: center;
  margin: 0 5px;
  font-size: 12px;
  height: 25px;
}

.btn-sm {
  width: 30px;
  margin-top: 10px;
}
</style>
