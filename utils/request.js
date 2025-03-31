/**
 * 对 wx.request() 进行二次封装，使其支持 Promise 调用风格
 */
const baseURL = 'http://113.45.10.129:3000'

const request = ({url, method = 'GET', data, headers = {}} = {}) => {
  if (!url) {
    throw new Error('网络请求必须传递 url')
  }

  // 在 url 资源路径前拼接基准的 baseURL 前缀
  url = baseURL + url
  /* 处理请求头 */
  // 从本地存储中获取用户登录成功后保存的 token
  const token = wx.getStorageSync('token')
  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`
    }
  }

  // 网络请求
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header: headers,
      success: res => { // 响应拦截处理
        // 请求成功，http 状态码为 2xx 表示成功
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // res.data 中保存的是后端响应返回给前端的 JSON 对象数据
          // 后端与前端有统一规范的数据格式，如: {code, data, message}
          const { code, data, message } = res.data
          if (code === 200) {
            resolve(data)
          } else {
            reject(new Error(message))
          }
        } else {
          reject(new Error('HTTP状态码:' + res.statusCode))
        }
      },
      fail: error => {
        // 请求失败
        reject(error)
      }
    })
  })
}

// 基于 request() 封装 get 别名方法
export const get = (url, data) => request({
  url, 
  data,
})

// 基于 request() 封装 post 别名方法
export const post = (url, data) => request({
  url,
  method: 'POST',
  data,
})

// put() / delete() / ...

export default request
