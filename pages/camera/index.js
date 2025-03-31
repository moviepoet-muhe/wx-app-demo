Page({
  data: {
    devicePosition: 'back', // 前后置
    src: '', // 拍照的照片路径
    videoSrc: '', // 视频资源路径
  },
  onLoad() {
    // 创建系统相机上下文对象，用于拍照或扫码或录制视频
    this.ctx = wx.createCameraContext()
  },
  changeDevicePosition() {
    this.setData({
      devicePosition: this.data.devicePosition === 'back' ? 'front' : 'back'
    })
  },
  /**
   * 拍照
   */
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath, // 拍照成功后，在 res 对象的 tempImagePath 属性中保存的是照片的临时路径
        })
      }
    })
  },
  /**
   * 开始录像
   */
  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        console.log('startRecord')
      }
    })
  },
  /**
   * 停止录像
   */
  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath, // tempThumbPath 表示视频的临时缩略图图片地址
          videoSrc: res.tempVideoPath // tempVideoPath 表示视频的临时文件地址
        })
      }
    })
  },
  error(e) {
    console.log(e.detail)
  },

  handleScancode(e) {
    console.log('扫码成功:', e)
  },
})