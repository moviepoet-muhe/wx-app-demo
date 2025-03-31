import request, { get } from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    banners: [],
    categories: [],
    goods: [],
    nextIndex: 0, // 下一页推荐商品起始索引
    isEnd: false, // 是否所有数据全部查询结束
    loading: true, // 是否数据加载中...
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 发送网络请求，查询轮播图数据
    // wx.request({
    //   url: 'http://113.45.10.129:3000/api/tab/1',
    //   success: res => {
    //     console.log('查询数据成功:', res);
    //   },
    //   fail: error => {
    //     console.log('失败:', error)
    //   },
    // })

    // request({
    //   url: '/api/tab/1'
    // })
    // .then(console.log)
    // .catch(console.error)

    try {
      // const result = await request({url: '/api/tab/1'})
      // 网络请求（串行执行）
      // const result = await get('/api/tab/1')
      // const res = await get('/api/tabs')

      // 同时发送两个网络请求（并行执行）
      const result = await new Promise(resolve => {
        setTimeout(async () => {
          const res = await Promise.allSettled([
            get('/api/tab/1'), // 查询轮播及首页推荐商品
            get('/api/tabs'), // 查询分类数据
          ])
          resolve(res)
        }, 5000)
      })
      // Promise.allSettled() 返回的 Promise 对象是 fulfilled 状态。
      // 携带数组数据返回。数组中元素的类型为对象，结构: {status, value} 或 {status, reason}
      console.log('Promise.allSettled()返回两个查询结果对象：', result);
      this.setData({
        banners: result[0].value.banners,
        categories: result[1].value.list,
        goods: result[0].value.items.list,
        nextIndex: result[0].value.items.nextIndex,
        isEnd: result[0].value.items.isEnd,

        loading: false,
      })
    } catch (error) {
      console.log('error:', error);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: async function () {
    console.log('主页下拉刷新...');
    try {
      // 同时发送两个网络请求（并行执行）
      const result = await Promise.allSettled([
        get('/api/tab/1'), // 查询轮播及首页推荐商品
        get('/api/tabs'), // 查询分类数据
      ])
      // Promise.allSettled() 返回的 Promise 对象是 fulfilled 状态。
      // 携带数组数据返回。数组中元素的类型为对象，结构: {status, value} 或 {status, reason}
      this.setData({
        banners: result[0].value.banners,
        categories: result[1].value.list.slice(1),
        goods: result[0].value.items.list.slice(2),
        nextIndex: result[0].value.items.nextIndex,
        isEnd: result[0].value.items.isEnd,
      })
      // 手动关闭下拉刷新效果
      wx.stopPullDownRefresh()
    } catch (error) {
      console.log('error:', error);
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function () {
    if (this.data.isEnd) {
      console.log('主页上滑所有数据全部查询结束')
      return
    }
    console.log('主页正在上滑查询更多推荐商品数据...')
    try {
      // 发送网络请求，查询更多首页推荐数据
      const result = await get('/api/tab/1/feeds', { start: this.data.nextIndex })
      console.log('首页上滑查询的商品数据result:', result)
      this.setData({
        goods: [
          ...this.data.goods,
          ...result.list,
        ],
        nextIndex: result.nextIndex,
        isEnd: result.isEnd,
      })
    } catch (error) {
      console.error('error:', error)
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 跳转到详情页面
   */
  jumpToDetail: (event) => {
    console.log('跳转到详情页面，事件源对象：', event)
    // 从事件源对象的 dataset 中，可以获取到对应节点中定义的 `data-*` 的自定义属性值
    const id = event.target.dataset.id
    // // 也可以借助本地存储的方式向另一个页面传递数据 todo
    // wx.setStorage({
    //   key: 'goods',
    //   data: {id, title, price}
    // })
    // 使用 wx.navigateTo() 跳转到应用内的某个页面，是跳转到非tabBar页面
    wx.navigateTo({
      url: `/pages/detail/index?id=${id}`,
    })
  },

  /**
   * 跳转到分类页面
   */
  jumpToCategory: (event) => {
    // console.log('跳转到分类页面...');
    // 调用 wx.switchTab() 方法，向 tabBar 页面跳转
    // 向 tabBar 页面跳转时，不能在 URL 后拼接参数传递，
    // 但可以借助本地存储的方式进行数据传递。
    // 也可以借助 globalData 进行数据传递。

    // // 跳转前，保存数据到本地存储中
    // wx.setStorageSync('categoryInfo', event.target.dataset)

    // 跳转前，将需要传递的数据保存到 globalData 中
    // 可以调用全局的 getApp() 方法获取到小程序应用实例（即 app.js 中调用 App() 注册的应用实例）
    // console.log(getApp());
    const app = getApp()
    app.globalData.category = event.target.dataset
    // 跳转到 tabBar 页面
    wx.switchTab({
      url: '/pages/category/index',
    })
  },

  /**
   * 测试 点击下拉刷新
   */
  startPullDownRefresh() {
    wx.startPullDownRefresh()
  }

})