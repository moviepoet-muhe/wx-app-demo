Page({

  /**
   * 页面的初始数据
   */
  data: {
    devicePosition: 'back',
    videoSrc: '',
    date: '',
    show: false,
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
    
  },

  handleTakePhoto() {
    wx.chooseMedia({
      mediaType: ['image'],
      sourceType: ['camera'],
      count: 1,
      // camera: this.data.devicePosition,
      success: res => {
        console.log('拍照结果:', res);
      },
      fail: error => {
        console.error('失败:', error)
      }
    })
  },

  handleTakeRecord() {
    wx.chooseMedia({
      sourceType: ['camera'],
      mediaType: ['video'],
      // count: 1,
      success: res => {
        console.log('录像结果:', res);
        this.setData({
          videoSrc: res.tempFiles[0].tempFilePath
        })
      },
      fail: error => {
        console.error('失败:', error)
      }
    })
  },

  handleScanCode() {
    wx.scanCode({
      success: res => {
        console.log('扫码成功:', res);
      }
    })
  },

  handleChooseLocation() {
    wx.chooseLocation({
      success: res => {
        this.setData({
          address: res
        })
      }
    })
  },

  onDisplay() {
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },
  formatDate(date) {
    date = new Date(date);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  },
  onConfirm(event) {
    this.setData({
      show: false,
      date: this.formatDate(event.detail),
    });
  },
})