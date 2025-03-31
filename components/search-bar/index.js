/**
 * 调用 Component() 函数注册自定义组件
 */
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    placeholder: {
      type: String,
      value: '请输入搜索关键字',
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    barHeight: 120,
    inputHeight: 0,
    barWidth: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  created() {
    console.log('created...', wx.getMenuButtonBoundingClientRect());
    // 获取右上角菜单按钮（右上角胶囊按钮）相关信息
    const {left, bottom, height} = wx.getMenuButtonBoundingClientRect()
    // 设置搜索栏相关状态数据
    this.setData({
      inputHeight: height,
      barWidth: left,
      barHeight: bottom,
    })
  },

  lifetimes: {
    attached() {
      console.log('attached...');
    }
  },
})