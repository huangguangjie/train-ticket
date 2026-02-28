//app.js
App({
  onLaunch: function() {
    // 初始化购票记录
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 初始化订单数据（若无则使用示例数据）
    var orders = wx.getStorageSync('trainOrders') || []
    if (orders.length === 0) {
      orders = [
        { id: 1, from: '北京南', to: '上海虹桥', date: '2025-03-15', trainNo: 'G101', seatType: '二等座', status: '已支付', passengers: ['张三'], price: 553 },
        { id: 2, from: '广州南', to: '深圳北', date: '2025-03-20', trainNo: 'G6001', seatType: '一等座', status: '已支付', passengers: ['李四'], price: 74 }
      ]
      wx.setStorageSync('trainOrders', orders)
    }

    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
