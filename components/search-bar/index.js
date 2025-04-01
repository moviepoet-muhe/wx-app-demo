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
    barHeight: 120,// 总容器高度
    inputHeight: 0,// 输入框高度=胶囊按钮高度
    barWidth: 0,// 容器宽度=胶囊按钮左侧坐标
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  created() {
    console.log('created...', wx.getMenuButtonBoundingClientRect());
    // 获取右上角菜单按钮（右上角胶囊按钮）相关信息
    const { left, bottom, height } = wx.getMenuButtonBoundingClientRect()
    // 设置搜索栏相关状态数据
    this.setData({
      inputHeight: height,// 输入框高度同步胶囊按钮高度
      barWidth: left,// 容器宽度取胶囊左侧坐标
      barHeight: bottom, // 总高度取胶囊底部坐标
    })
  },

  // 自定义组件的标准生命周期声明区
  lifetimes: {
    // attached组件实例被添加到页面节点树时触发（此时DOM未完成渲染）
    // created → attached → ready → moved → detached
    attached() {
      console.log('首页自定义搜索框组件attached...');
    }
  },
})