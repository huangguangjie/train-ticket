// pages/settings/settings.js
Page({
  data: {
    enableNotification: true,
    darkMode: false
  },

  onLoad: function(options) {
    // 从本地存储加载设置
    const notificationSetting = wx.getStorageSync('notificationSetting');
    const darkModeSetting = wx.getStorageSync('darkModeSetting');
    
    this.setData({
      enableNotification: notificationSetting !== undefined ? notificationSetting : true,
      darkMode: darkModeSetting !== undefined ? darkModeSetting : false
    });
  },

  toggleNotification: function(e) {
    const enabled = e.detail.value;
    this.setData({
      enableNotification: enabled
    });
    
    // 保存设置到本地存储
    wx.setStorageSync('notificationSetting', enabled);
    
    wx.showToast({
      title: enabled ? '通知已开启' : '通知已关闭',
      icon: 'none'
    });
  },

  toggleDarkMode: function(e) {
    const enabled = e.detail.value;
    this.setData({
      darkMode: enabled
    });
    
    // 保存设置到本地存储
    wx.setStorageSync('darkModeSetting', enabled);
    
    wx.showToast({
      title: enabled ? '深色模式已开启' : '深色模式已关闭',
      icon: 'none'
    });
  },

  clearStorage: function() {
    wx.showModal({
      title: '确认清除',
      content: '确定要清除所有缓存数据吗？此操作不可恢复。',
      success: (res) => {
        if (res.confirm) {
          wx.clearStorageSync();
          wx.showToast({
            title: '清除成功',
            icon: 'success'
          });
        }
      }
    });
  },

  changeTheme: function() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  aboutApp: function() {
    wx.showModal({
      title: '关于个性化助手',
      content: '个性化助手 v1.0\n为您提供便捷的生活服务和信息管理功能。',
      showCancel: false
    });
  },

  feedback: function() {
    wx.navigateTo({
      url: '/pages/feedback/feedback'
    });
  },

  logout: function() {
    wx.showModal({
      title: '确认退出',
      content: '确定要退出当前账号吗？',
      success: (res) => {
        if (res.confirm) {
          // 清除用户信息
          const app = getApp();
          app.globalData.userInfo = null;
          
          // 返回首页
          wx.reLaunch({
            url: '/pages/index/index'
          });
        }
      }
    });
  }
});