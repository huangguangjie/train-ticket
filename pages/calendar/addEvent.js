// pages/calendar/addEvent.js
Page({
  data: {
    date: '',
    title: '',
    description: '',
    startTime: '09:00',
    endTime: '10:00'
  },

  onLoad: function(options) {
    this.setData({
      date: options.date || ''
    });
  },

  onTitleInput: function(e) {
    this.setData({
      title: e.detail.value
    });
  },

  onDescriptionInput: function(e) {
    this.setData({
      description: e.detail.value
    });
  },

  onStartTimeChange: function(e) {
    this.setData({
      startTime: e.detail.value
    });
  },

  onEndTimeChange: function(e) {
    this.setData({
      endTime: e.detail.value
    });
  },

  saveEvent: function() {
    if (!this.data.title.trim()) {
      wx.showToast({
        title: '请输入事件标题',
        icon: 'none'
      });
      return;
    }

    // 获取已有的日程事件
    const events = wx.getStorageSync('calendarEvents') || {};
    
    // 创建新事件
    const newEvent = {
      id: Date.now(),
      title: this.data.title,
      description: this.data.description,
      startTime: this.data.startTime,
      endTime: this.data.endTime
    };

    // 将新事件添加到对应日期
    if (!events[this.data.date]) {
      events[this.data.date] = [];
    }
    events[this.data.date].push(newEvent);

    // 保存回本地存储
    wx.setStorageSync('calendarEvents', events);

    wx.showToast({
      title: '保存成功',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  },

  cancel: function() {
    wx.navigateBack();
  }
});