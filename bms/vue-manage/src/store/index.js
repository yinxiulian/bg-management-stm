import Vue from 'vue'
import Vuex from 'vuex'
import { getuserApi, infoApi, goodsApi } from '@/api/mbapi.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isCollapsee: false,
    tabList: [{ path: '/', name: 'home', label: '首页', icon: 'home' }],
    curenMenu: null,
    tableData: [],
    totals: 0,
    goodsData: []
  },

  getters: {
  },
  mutations: {
    CollapseeMenu (state) {
      state.isCollapsee = !state.isCollapsee
    },
    selectMenu (state, val) {
      if (val.name !== 'home') {
        state.curenMenu = val
        const result = state.tabList.findIndex(item => item.name === val.name)
        if (result === -1) {
          state.tabList.push(val)
        }
      } else {
        state.curenMenu = null
      }
    },
    closeTag (state, val) {
      const result = state.tabList.findIndex(item => item.name === val.name)
      state.tabList.splice(result, 1)
    },
    initList (state, data) {
      const res = JSON.parse(JSON.stringify(data))
      res.data = res.data.map(item => {
        item.sex = parseInt(item.sex) === 0 ? '女' : '男'
        return item
      })
      state.tableData = res.data
    },
    infoList (state, data) {
      const res = JSON.parse(JSON.stringify(data))
      res.data = res.data.map(item => {
        item.sex = parseInt(item.sex) === 0 ? '女' : '男'
        return item
      })
      state.tableData = res.data
      state.totals = res.total
    },
    goods (state, data) {
      const res = JSON.parse(JSON.stringify(data))
      res.data.forEach(function (item) {
        if (item.good_state === 1) {
          item.good_state = true
        } else {
          item.good_state = false
        }
      })
      state.goodsData = res.data
    },
    changeState (state, val) {
      state.goodsData.some(item => {
        if (item.id === val.item.id) {
          item.good_state = val.flag
          return true
        }
        return undefined
      })
    },
    cmyGoos (state, id) {
      state.goodsData.some(item => {
        if (item.id === id) {
          item.goos_count++
          return true
        }
        return undefined
      })
    },
    cutGoos (state, id) {
      state.goodsData.some(item => {
        if (item.id === id) {
          item.goos_count--
          return true
        }
        return undefined
      })
    }
  },
  actions: {
    async getList (context, val) {
      const { data: res } = await getuserApi(val)
      context.commit('initList', res)
    },
    async userList (context, obj) {
      const { data: res } = await infoApi(obj)
      context.commit('infoList', res)
    },
    async goosList (context) {
      const { data: res } = await goodsApi()
      context.commit('goods', res)
    }
  },
  modules: {
  }
})
