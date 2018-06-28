//app.js
App({
  onLaunch: function () {
    var that = this;
    that.goLoginPageTimeOut()
    return
  },
  goLoginPageTimeOut: function () {
    setTimeout(function () {
      wx.navigateTo({
        url: "/pages/index/index"
      })
    }, 1000)
  },
  globalData: {
    userInfo: null,
    version: "1.0",
    shareProfile: '多啦聚财'
  }
})
