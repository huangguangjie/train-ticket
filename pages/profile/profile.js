// pages/profile/profile.js 我的订单
Page({
  data: {
    orders: []
  },

  onLoad: function() {
    this.loadOrders()
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 1 })
    }
    this.loadOrders()
  },

  loadOrders: function() {
    const orders = wx.getStorageSync('trainOrders') || []
    this.setData({ orders })
  },

  viewOrderDetail: function(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '订单详情',
      content: '演示版暂不支持查看详情',
      showCancel: false
    })
  },

  goToIndex: function() {
    wx.switchTab({ url: '/pages/index/index' })
  }
})
