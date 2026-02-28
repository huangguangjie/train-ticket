// pages/calendar/calendar.js
Page({
  data: {
    currentMonth: '',
    days: [],
    selectedDate: ''
  },

  onLoad: function(options) {
    const now = new Date();
    this.setData({
      selectedDate: this.formatDate(now)
    });
    this.renderCalendar(now.getFullYear(), now.getMonth());
  },

  formatDate: function(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month}-${day}`;
  },

  renderCalendar: function(year, month) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(firstDay.getDate() - firstDay.getDay());

    const endDate = new Date(lastDay);
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()));

    const days = [];
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDay = today.getDate();
    
    // 获取已保存的日程事件
    const events = wx.getStorageSync('calendarEvents') || {};

    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      const dateStr = this.formatDate(day);
      const isCurrentMonth = day.getMonth() === month;
      const isToday = day.getFullYear() === currentYear && 
                      day.getMonth() === currentMonth && 
                      day.getDate() === currentDay;
                      
      days.push({
        date: dateStr,
        day: day.getDate(),
        isCurrentMonth: isCurrentMonth,
        isToday: isToday,
        hasEvent: events[dateStr] && events[dateStr].length > 0
      });
    }

    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
                        '七月', '八月', '九月', '十月', '十一月', '十二月'];
    const currentMonthStr = `${year}年${monthNames[month]}月`;

    this.setData({
      currentMonth: currentMonthStr,
      days: days
    });
  },

  prevMonth: function() {
    const dateParts = this.data.currentMonth.split(/年|月/);
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 2; // 减2是因为月份是从1开始，但数组索引从0开始
    this.renderCalendar(year, month);
  },

  nextMonth: function() {
    const dateParts = this.data.currentMonth.split(/年|月/);
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]); // 不需要减1，因为我们需要下一个月
    this.renderCalendar(year, month);
  },

  goToToday: function() {
    const now = new Date();
    this.setData({
      selectedDate: this.formatDate(now)
    });
    this.renderCalendar(now.getFullYear(), now.getMonth());
  },

  selectDay: function(e) {
    const date = e.currentTarget.dataset.date;
    this.setData({
      selectedDate: date
    });
    
    wx.showToast({
      title: `已选择 ${date}`,
      icon: 'none'
    });
  },

  addEvent: function() {
    wx.navigateTo({
      url: `/pages/calendar/addEvent?date=${this.data.selectedDate}`
    });
  }
});