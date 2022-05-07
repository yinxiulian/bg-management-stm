<template>
  <div class="footer-container">
    <!-- 左侧的全选 -->
    <div class="custom-control custom-checkbox">
      <input @change="fullChange" type="checkbox" class="custom-control-input" id="cbFull" :checked="isFull" />
      <label class="custom-control-label" for="cbFull">全选</label>
    </div>

    <!-- 中间的合计 -->
    <div>
      <span>合计：</span>
      <span class="total-price">￥{{PriceSum}}</span>
    </div>

    <!-- 结算按钮 -->
    <button type="button" class="btn btn-primary btn-settle">结算（{{goodsSum}}）</button>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    isFull: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    fullChange (e) {
      const state = e.target.checked
      this.$store.state.goodsData.forEach(item => {
        item.good_state = state
      })
    }
  },
  computed: {
    ...mapState({
      goods: state => state.goodsData
    }),
    goodsSum () {
      return this.goods.filter(item => item.good_state === true).reduce((total, item) => {
        return (total += item.goos_count)
      }, 0)
    },
    PriceSum () {
      return this.goods.filter(item => item.good_state === true).reduce((total, item) => {
        return (total += item.goos_count * item.goos_price)
      }, 0)
    }
  }
}
</script>

<style lang="less" scoped>
.footer-container {
  font-size: 12px;
  height: 50px;
  width: 100%;
  border-top: 1px solid #efefef;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  left: 5px;
  bottom: 10px;
  right: 15px;
}

.custom-checkbox {
  display: flex;
  align-items: center;
}

#cbFull {
  margin-right: 5px;
}

.btn-settle {
  height: 80%;
  min-width: 110px;
  border-radius: 25px;
  font-size: 12px;
  margin-right: 15px;
}

.total-price {
  font-weight: bold;
  font-size: 14px;
  color: red;
}
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
