import Mock from 'mockjs'

import userApi from './mockServerData/user.js'
// Mock.mock('/api/user/getUser', userApi.getUserList)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)
