import request from '@/utlis/request.js'

// 按需导出
export const getMdAPI = function () {
  return request.get('/api/mbdata', {
  })
}

export const getCotApi = function () {
  return request.get('/api/cotdata', {
  })
}
export const getdorApi = function () {
  return request.get('/api/orderdata', {
  })
}
export const getuserApi = function (name) {
  return request.get('/api/name', {
    params: {
      name
    }
  })
}

export const infoApi = function (obj) {
  return request.get('/api/account', {
    params: {
      pageSize: obj.pageSize,
      currentPage: obj.currentPage
    }
  })
}

export const registerApi = function (ruleForm) {
  return request.post('/api/reguser', {
    data: {
      ruleForm
    }
  })
}

export const goodsApi = function () {
  return request.get('/api/goods', {})
}
