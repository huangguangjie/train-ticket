// pages/calendar/calendar.js 我的行程
Page({
  data: {
    currentMonth: '',
    currentYear: 0,
    currentMonthNum: 0,
    days: [],
    selectedDate: '',
    selectedDateTrips: []
  },

  onShow: function() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ selected: 2 })
    }
  },

  onLoad: function() {
    const now = new Date()
    const dateStr = this.formatDate(now)
    this.setData({ selectedDate: dateStr })
    this.renderCalendar(now.getFullYear(), now.getMonth())
    this.loadTripsForDate(dateStr)
  },

  formatDate: function(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
  },

  renderCalendar: function(year, month) {
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(firstDay.getDate() - firstDay.getDay())
    const endDate = new Date(lastDay)
    endDate.setDate(lastDay.getDate() + (6 - lastDay.getDay()))

    const orders = wx.getStorageSync('trainOrders') || []
    const tripDates = new Set(orders.map(o => o.date))

    const days = []
    const today = new Date()
    const currentYear = today.getFullYear()
    const currentMonth = today.getMonth()
    const currentDay = today.getDate()

    for (let day = new Date(startDate); day <= endDate; day.setDate(day.getDate() + 1)) {
      const dateStr = this.formatDate(day)
      const isCurrentMonth = day.getMonth() === month
      const isToday = day.getFullYear() === currentYear &&
        day.getMonth() === currentMonth &&
        day.getDate() === currentDay
      days.push({
        date: dateStr,
        day: day.getDate(),
        isCurrentMonth: isCurrentMonth,
        isToday: isToday,
        hasTrip: tripDates.has(dateStr)
      })
    }

    const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月',
      '七月', '八月', '九月', '十月', '十一月', '十二月']
    const currentMonthStr = `${year}年${monthNames[month]}`

    this.setData({
      currentMonth: currentMonthStr,
      days: days,
      currentYear: year,
      currentMonthNum: month
    })
  },

  loadTripsForDate: function(dateStr) {
    const orders = wx.getStorageSync('trainOrders') || []
    const trips = orders.filter(o => o.date === dateStr)
    this.setData({ selectedDateTrips: trips })
  },

  prevMonth: function() {
    const { currentYear, currentMonthNum } = this.data
    const d = new Date(currentYear, currentMonthNum - 1, 1)
    this.renderCalendar(d.getFullYear(), d.getMonth())
  },

  nextMonth: function() {
    const { currentYear, currentMonthNum } = this.data
    const d = new Date(currentYear, currentMonthNum + 1, 1)
    this.renderCalendar(d.getFullYear(), d.getMonth())
  },

  goToToday: function() {
    const now = new Date()
    this.setData({ selectedDate: this.formatDate(now) })
    this.renderCalendar(now.getFullYear(), now.getMonth())
    this.loadTripsForDate(this.formatDate(now))
  },

  selectDay: function(e) {
    const date = e.currentTarget.dataset.date
    if (!date) return
    const orders = wx.getStorageSync('trainOrders') || []
    const trips = orders.filter(o => o.date === date)
    this.setData({ selectedDate: date, selectedDateTrips: trips })
  }
})
