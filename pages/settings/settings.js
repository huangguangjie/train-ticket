// pages/settings/settings.js 极简扁平
Page({
  data: {
    enableNotification: true,
    tripReminder: true
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 3 })
    }
  },

  onLoad: function() {
    const notificationSetting = wx.getStorageSync('notificationSetting')
    const tripReminderSetting = wx.getStorageSync('tripReminderSetting')

    this.setData({
      enableNotification: notificationSetting !== undefined ? notificationSetting : true,
      tripReminder: tripReminderSetting !== undefined ? tripReminderSetting : true
    })
  },

  toggleNotification: function(e) {
    const enabled = e.detail.value
    this.setData({ enableNotification: enabled })
    wx.setStorageSync('notificationSetting', enabled)
    wx.showToast({ title: enabled ? '已开启' : '已关闭', icon: 'none' })
  },

  toggleTripReminder: function(e) {
    const enabled = e.detail.value
    this.setData({ tripReminder: enabled })
    wx.setStorageSync('tripReminderSetting', enabled)
    wx.showToast({ title: enabled ? '已开启' : '已关闭', icon: 'none' })
  },

  goToPassengers: function() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  clearStorage: function() {
    wx.showModal({
      title: '清除缓存',
      content: '确定清除所有缓存？购票记录将一并清除。',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync()
          wx.showToast({ title: '已清除', icon: 'success' })
        }
      }
    })
  }
})
