Component({
  data: {
    selected: 0,
    list: [
      { pagePath: '/pages/index/index', text: '购票' },
      { pagePath: '/pages/profile/profile', text: '订单' },
      { pagePath: '/pages/calendar/calendar', text: '行程' },
      { pagePath: '/pages/settings/settings', text: '设置' }
    ]
  },
  attached() {
    const iconBase = 'data:image/svg+xml;base64,'
    const homeIcon = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjN0E3RTgzIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0zIDlsOS03IDkgN3YxMWEyIDIgMCAwMS0yIDJINWEyIDIgMCAwMS0yLTJ6Ii8+PHBvbHlsaW5lIHBvaW50cz0iOSAyMiA5IDEyIDE1IDEyIDE1IDIyIi8+PC9zdmc+'
    const homeActive = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzQxZTNhIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik0zIDlsOS03IDkgN3YxMWEyIDIgMCAwIDEtMiAySDVhMiAyIDAgMCAxLTItMnoiLz48cG9seWxpbmUgcG9pbnRzPSI5IDIyIDkgMTIgMTUgMTIgMTUgMjIiLz48L3N2Zz4='
    const orderIcon = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjN0E3RTgzIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDVINmEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMTJhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJoLTNWM2EyIDIgMCAwMC0yLTJoLTR6Ii8+PC9zdmc+'
    const orderActive = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzQxZTNhIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik05IDVINmEyIDIgMCAwMC0yIDJ2MTRhMiAyIDAgMDAyIDJoMTJhMiAyIDAgMDAyLTJWN2EyIDIgMCAwMC0yLTJoLTNWM2EyIDIgMCAwMC0yLTJoLTR6Ii8+PC9zdmc+'
    const calIcon = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjN0E3RTgzIiBzdHJva2Utd2lkdGg9IjIiPjxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIHJ5PSIyIi8+PGxpbmUgeDE9IjE2IiB4Mj0iMTYiIHkxPSIyIiB5Mj0iNiIvPjxsaW5lIHgxPSI4IiB4Mj0iOCIgeTE9IjIiIHkyPSI2Ii8+PGxpbmUgeDE9IjMiIHgyPSIyMSIgeTE9IjEwIiB5Mj0iMTAiLz48L3N2Zz4='
    const calActive = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzQxZTNhIiBzdHJva2Utd2lkdGg9IjIiPjxyZWN0IHg9IjMiIHk9IjQiIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgcng9IjIiIHJ5PSIyIi8+PGxpbmUgeDE9IjE2IiB4Mj0iMTYiIHkxPSIyIiB5Mj0iNiIvPjxsaW5lIHgxPSI4IiB4Mj0iOCIgeTE9IjIiIHkyPSI2Ii8+PGxpbmUgeDE9IjMiIHgyPSIyMSIgeTE9IjEwIiB5Mj0iMTAiLz48L3N2Zz4='
    const setIcon = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjN0E3RTgzIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiLz48cGF0aCBkPSJNMTkuNCAxNWEyIDIgMCAwMDAuMy0yLjFsLTEuMS0xLjlhMiAyIDAgMDEtLjMtMi41bDEuNS0xLjNhMiAyIDAgMDEyLjMuM2wxLjEgMS45YTIgMiAwIDAxLjUgMi4ybC0xLjUgMS4zYTIgMiAwIDAwLS4zIDIuMWwxLjEgMS45YTIgMiAwIDAxLS4zIDIuOGwtMS42IDEuMmEyIDIgMCAwMS0yLjYtLjJsLTEuMS0xLjlhMiAyIDAgMDAtMi4yLS4zbC0xLjUgMS4zYTIgMiAwIDAxLTIuMy0uM2wtMS4xLTEuOWEyIDIgMCAwMC0yLjEtLjVsLTEuNiAxLjJhMiAyIDAgMDEtMi42LS4ybC0uMy0uNGEyIDIgMCAwMS4yLTIuNWwxLjEtMS45YTIgMiAwIDAwLjMtMi41TDMuNyA1LjNhMiAyIDAgMDEtLjMtMi44TDUgMS4yYTIgMiAwIDAxMi42LjJsMS4xIDEuOWEyIDIgMCAwMTIuMi4zbDEuNS0xLjNhMiAyIDAgMDEyLjMuM2wxLjEgMS45YTIgMiAwIDAxLS41IDIuMmwxLjUgMS4zYTIgMiAwIDAwLjMgMi4xbC0xLjEgMS45YTIgMiAwIDAxLjMgMi44bDEuNiAxLjJhMiAyIDAgMDEyLjYuMmwxLjEtMS45YTIgMiAwIDAwMi4yLjNsMS41LTEuM2EyIDIgMCAwMTIuMy4zeiIvPjwvc3ZnPg=='
    const setActive = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjYzQxZTNhIiBzdHJva2Utd2lkdGg9IjIiPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTIiIHI9IjMiLz48cGF0aCBkPSJNMTkuNCAxNWEyIDIgMCAwMDAuMy0yLjFsLTEuMS0xLjlhMiAyIDAgMDEtLjMtMi41bDEuNS0xLjNhMiAyIDAgMDEyLjMuM2wxLjEgMS45YTIgMiAwIDAxLjUgMi4ybC0xLjUgMS4zYTIgMiAwIDAwLS4zIDIuMWwxLjEgMS45YTIgMiAwIDAxLS4zIDIuOGwtMS42IDEuMmEyIDIgMCAwMS0yLjYtLjJsLTEuMS0xLjlhMiAyIDAgMDAtMi4yLS4zbC0xLjUgMS4zYTIgMiAwIDAxLTIuMy0uM2wtMS4xLTEuOWEyIDIgMCAwMC0yLjEtLjVsLTEuNiAxLjJhMiAyIDAgMDEtMi42LS4ybC0uMy0uNGEyIDIgMCAwMS4yLTIuNWwxLjEtMS45YTIgMiAwIDAwLjMtMi41TDMuNyA1LjNhMiAyIDAgMDEtLjMtMi44TDUgMS4yYTIgMiAwIDAxMi42LjJsMS4xIDEuOWEyIDIgMCAwMTIuMi4zbDEuNS0xLjNhMiAyIDAgMDEyLjMuM2wxLjEgMS45YTIgMiAwIDAxLS41IDIuMmwxLjUgMS4zYTIgMiAwIDAwLjMgMi4xbC0xLjEgMS45YTIgMiAwIDAxLjMgMi44bDEuNiAxLjJhMiAyIDAgMDEyLjYuMmwxLjEtMS45YTIgMiAwIDAwMi4yLjNsMS41LTEuM2EyIDIgMCAwMTIuMy4zeiIvPjwvc3ZnPg=='
    const list = this.data.list.map((item, i) => {
      const icons = [
        [homeIcon, homeActive],
        [orderIcon, orderActive],
        [calIcon, calActive],
        [setIcon, setActive]
      ]
      const [iconPath, selectedIconPath] = icons[i] || icons[0]
      return { ...item, iconPath: iconBase + iconPath, selectedIconPath: iconBase + selectedIconPath }
    })
    this.setData({ list })
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      wx.switchTab({ url: data.path })
      this.setData({ selected: data.index })
    }
  }
})
