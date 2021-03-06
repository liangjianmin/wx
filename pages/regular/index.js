var app = getApp();
var ProductionUrl = require('../../api/index.js');
var UtilPackage = require('../../utils/index.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    appindex:{

    },
    titleArr: [{
      id: 0,
      name: '散标列表',
    }, {
      id: 1,
      name: '转让专区'
    }],
    titleDefaultIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    let Codekey = UtilPackage.Util.getRrandomStr();
    let params = UtilPackage.Util.getParams('wechat', '', '');
    params = UtilPackage.Util.encryption(Codekey, params, 'code');


    wx.request({
      url: ProductionUrl.apis.appindex,
      header: {
        "X-Dola-Time": UtilPackage.Util.getSeconds(),
        "X-Dola-ClientID": UtilPackage.Util.getGuid(),
        'X-Dola-Code': Codekey
      },
      data: {
        data: params
      },
      success: function (res) {
        var key = res.header["X-Dola-Edoc"];
        var datas = res.data;
        var str = UtilPackage.Util.decrypt(key, datas, 'code')
        var data = JSON.parse(str);
        console.log(data);

        that.setData({
          appindex: data.data
        });

      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tabClick(e) {
    this.setData({
      titleDefaultIndex: e.currentTarget.id
    });
  }
})