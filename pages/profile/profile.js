// pages/profile/profile.js
const app = getApp();

Page({
  data: {
    userInfo: {},
    visitCount: 0,
    dayCount: 0
  },

  onLoad: function(options) {
    // 获取用户信息
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
    
    // 获取访问统计
    this.getVisitStats();
  },

  onShow: function() {
    // 页面显示时重新获取用户信息（以防用户更新了信息）
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo
      });
    }
  },

  getUserProfile: function() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        app.globalData.userInfo = res.userInfo;
        this.setData({
          userInfo: res.userInfo
        });
        
        wx.showToast({
          title: '更新成功',
          icon: 'success'
        });
      },
      fail: () => {
        wx.showToast({
          title: '取消更新',
          icon: 'none'
        });
      }
    });
  },

  getVisitStats: function() {
    // 从本地存储获取访问日志
    const logs = wx.getStorageSync('logs') || [];
    
    // 计算访问次数
    const visitCount = logs.length;
    
    // 计算连续访问天数（简化版：仅计算最近几天是否有访问）
    const today = new Date();
    const todayStr = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    let dayCount = 0;
    
    // 将时间戳转换为日期字符串并去重
    const uniqueDates = [...new Set(
      logs.map(timestamp => {
        const date = new Date(timestamp);
        return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
      })
    )];
    
    // 简单计算连续访问天数（这里只做基本演示）
    if(uniqueDates.includes(todayStr)) {
      dayCount = Math.min(7, uniqueDates.length); // 最多显示7天
    } else {
      // 查找最近连续的天数
      const sortedDates = uniqueDates.sort((a, b) => new Date(b) - new Date(a));
      let currentDate = new Date();
      
      for(let i = 0; i < sortedDates.length; i++) {
        const logDate = new Date(sortedDates[i]);
        const diffTime = Math.abs(currentDate.getTime() - logDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
        
        if(diffDays <= i+1) {
          dayCount++;
        } else {
          break;
        }
      }
    }
    
    this.setData({
      visitCount: visitCount,
      dayCount: dayCount
    });
  }
});