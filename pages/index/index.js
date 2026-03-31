//index.js 火车票购票
Page({
  data: {
    fromStation: '北京南',
    toStation: '上海虹桥',
    travelDate: '',
    today: ''
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 0 })
    }
  },

  onLoad: function() {
    const today = new Date()
    const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    this.setData({
      travelDate: todayStr,
      today: todayStr
    })
  },

  swapStations: function() {
    const { fromStation, toStation } = this.data
    this.setData({
      fromStation: toStation,
      toStation: fromStation
    })
  },

  onDateChange: function(e) {
    this.setData({
      travelDate: e.detail.value
    })
  },

  searchTicket: function() {
    const { fromStation, toStation, travelDate } = this.data
    if (!fromStation || !toStation) {
      wx.showToast({ title: '请选择出发站和到达站', icon: 'none' })
      return
    }
    if (!travelDate) {
      wx.showToast({ title: '请选择出发日期', icon: 'none' })
      return
    }
    wx.showToast({ title: '查询中...', icon: 'loading' })
    setTimeout(() => {
      wx.showToast({ title: '演示版暂不支持实时查询', icon: 'none' })
    }, 800)
  },

  goToProfile: function() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },
  goToCalendar: function() {
    wx.switchTab({ url: '/pages/calendar/calendar' })
  },
  goToSettings: function() {
    wx.switchTab({ url: '/pages/settings/settings' })
  }
})
