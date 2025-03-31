Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    name: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    // // 从本地存储中读取保存的分类信息
    // const categoryInfo = wx.getStorageSync('categoryInfo')

    // 从 globalData 中获取保存的分类数据信息
    const categoryInfo = getApp().globalData.category

    // 更新状态数据
    this.setData({
      id: categoryInfo.id,
      name: categoryInfo.name,
    })
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