import { get } from "../../utils/request"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: '',
    price: 0,
    originPrice: 0,
    images: []
  },

  /**
   * 生命周期函数--监听页面加载
   * 可以在回调函数的参数中，获取到跳转到当前页面时，路径中传递的 ? 查询字符串参数数据
   */
  onLoad: async function (query) {
    console.log('参数:', query)
    // this.setData(query) 实际等效于
    this.setData({
      id: query.id, // 来自主页URL的字符串
    })

    // 根据获取到的商品 id 查询商品详情
    try {
      const result = await get('/api/detail', { id: query.id })
      console.log('详情:', result);
      this.setData({
        title: result.detail.title,
        price: result.detail.price,
        originPrice: result.detail.originPrice, // 原价字段
        images: result.detail.photo // 图片数组 [{id:,url:}]
      })
    } catch (error) {
      wx.showToast({ title: '加载失败', icon: 'none' })
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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})