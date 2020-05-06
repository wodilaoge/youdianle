// pages/my_activity/my_activity.js
const app = getApp();
var util = require("../../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swip: ['活动审核', '新闻审核', '图片审核', '视频审核'],
    options:1,
    TabCur:0,
    AllActivity:[],
    MyActivity:[],
    scrollLeft: 0
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  select1(){
    this.setData({
      options: 1
    })
  },

  select2() {
    this.setData({
      options: 2
    })
  },
  select3() {
    this.setData({
      options: 3
    })
  },

  onLoad: function (options) {
    var that=this
    let url = app.globalData.URL + '/config/findAllActivityClass1';
    let url2 = app.globalData.URL + '/act/listMyActivity';
    let data = '';
    util.gets(url, {}).then(function (res) {
      that.setData({
        AllActivity: res.data.data
      })
    })

    // util.gets(url2, {}).then(function (res) {
    //   that.setData({
    //     MyActivity: res.data.data
    //   })
    // })
  },

})