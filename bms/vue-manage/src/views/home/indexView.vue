<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" alt="">
          <div class="userinfo">
            <p class="name"> 殷修连</p>
            <p class="access">超级管理员</p>
             </div>
        </div>
        <div class="login-info">
          <p>上次登录时间: <span>2022-4-14</span></p>
         <p>上次登录地点: <span>长沙</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="margin-top:20px;height:460px">
        <el-table :data="tableData">
          <el-table-column v-for="(val,key) in tableLabel"
          :key="key"
          :prop="key"
          :label="val"
           >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      <div class="num">
        <el-card shadow="hover" v-for="item in countData" :key="item.name" :body-style="{display:'flex',padding:0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ background:item.color}"></i>
          <div class="detail">
            <p class="num">￥{{item.value}}</p>
            <p class="txt">{{item.name}}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height:280px" id="chart"></el-card>
      <div class="graph">
        <el-card style="height:260px">
          <div style="height:240px" id="user"></div>
        </el-card>
        <el-card style="height:260px">
          <div style="height:240px" id="video" ></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getMdAPI, getCotApi, getdorApi } from '@/api/mbapi.js'
import * as echarts from 'echarts'
export default {
  data () {
    return {
      userImg: require('../../assets/images/user.png'),
      tableData: [],
      tableLabel: {
        name: '课程',
        todayBuy: '今日购买',
        monthBuy: '本月购买',
        totalBuy: '总购买'
      },
      countData: [],
      list: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007']
    }
  },
  async created () {
    const { data: mdRes } = await getMdAPI()
    this.tableData = mdRes.data
    const { data: cotRes } = await getCotApi()
    this.countData = cotRes.data
  },
  mounted () {
    getdorApi().then(({ data }) => {
      console.log(data.data.userData)
      console.log(data)
      const order = data.data.orderData
      const keyArray = Object.keys(order[0])
      const series = []
      keyArray.forEach(key => {
        series.push(
          {
            name: key,
            data: order.map(item => item[key]),
            type: 'line'
          })
      })
      // 折线图
      const option = {
        xAxis: {
          data: this.list
        },
        yAxis: {},
        legend: {
          data: keyArray
        },
        series
      }
      const dom = document.querySelector('#chart')
      const E = echarts.init(dom)
      E.setOption(option)

      // 用户图
      const userOption = {
        legend: {
          // 图例文字颜色
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%'
        },
        // 提示框
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category', // 类目轴
          data: data.data.userData.map(item => item.date),
          axisLine: {
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            interval: 0,
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用户',
            data: data.data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.data.userData.map(item => item.active),
            type: 'bar'
          }
        ]
      }
      const dom1 = document.querySelector('#user')
      const U = echarts.init(dom1)
      U.setOption(userOption)
      // 扇形图
      const videoOption = {
        tooltip: {
          trigger: 'item'
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf'
        ],
        series: [
          {
            data: data.data.videoData,
            type: 'pie'
          }
        ]
      }
      const video = document.querySelector('#video')
      const V = echarts.init(video)
      V.setOption(videoOption)
    })
  }
}

</script>

<style>

</style>
