<template>
  <div>
   <el-card shadow="always" style="height:600px">
      <div class="goods-container" style="" v-for=" item in goods" :key="item.id">
    <!-- 左侧图片 -->
    <div class="thumb">
      <div class="custom-control custom-checkbox">
        <!-- 复选框 -->
        <input type="checkbox" @click="stateChange(item,$event)" class="custom-control-input"
        :id="'cd'+item.id"  :checked="item.good_state" />
        <label :for="'cd'+item.id" class="custom-control-label">
        </label>
      </div>
    </div>
    <!-- 右侧信息区域 -->
    <div class="goods-info">
      <!-- 商品标题 -->
      <h5 class="goods-title">{{item.goods_name}}</h5>
        <!-- 商品价格 -->
        <span class="goods-price">￥{{item.goos_price}}</span>
    </div>
     <div class="number-container d-flex justify-content-center align-items-center">
    <!-- 减 1 的按钮 -->
    <button type="button" class="btn btn-light btn-sm" @click="cut(item.id)">-</button>
    <!-- 购买的数量 -->
    <span class="number-box">{{item.goos_count}}</span>
    <!-- 加 1 的按钮 -->
    <button   type="button" class="btn btn-light btn-sm" @click="add(item.id)">+</button>
  </div>
  </div>
     <FooterView :isFull="StateChange"></FooterView>
   </el-card>
  </div>
</template>

<script>
import FooterView from '@/components/comonFooter.vue'
import { mapState } from 'vuex'
export default {
  data () {
    return {

    }
  },
  components: {
    FooterView
  },
  methods: {
    add (id) {
      this.$store.commit('cmyGoos', id)
    },
    cut (id) {
      this.$store.commit('cutGoos', id)
    },
    stateChange (item, $event) {
      const flag = $event.target.checked
      this.$store.commit('changeState', { item, flag })
    }
  },
  created () {
    this.$store.dispatch('goosList')
  },
  computed: {
    ...mapState({
      goods: state => state.goodsData
    }),
    StateChange () {
      return this.goods.every(item => item.good_state === true)
    }
  }
}
</script>

<style lang="less" scoped>
.el-card{
  position: relative;
}
.goods-container {
  + .goods-container {
    height:68px
  }
  padding: 10px;
  display: flex;
    border-top: 1px solid #d7d7d7;
  .thumb {
    display: flex;
    align-items: center;
    height:40px;
    img {
      width: 100px;
      height: 100px;
      margin: 0 10px;
    }
  }

  .goods-info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    height: 40px;
    .goods-title {
      display: inline-block;
      height: 100%;
      font-weight: bold;
      width: 30%;
      font-size: 16px;
      line-height: 40px;
      margin-left: 120px;

    }
      .goods-price {
        display: inline-block;
        width: 20%;
        color: red;
        font-size: 18px;
        height: 40px;
        line-height: 40px;
      }
  }
}
</style>
