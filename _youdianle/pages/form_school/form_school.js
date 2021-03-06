const util = require("../../utils/util.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    province: '',
    city: '',
    school: []

  },
  choose(e) {
    console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.id=='00000') {
      console.log('not choose school')
      wx.removeStorageSync('school')
      if (mode == "1") {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else if (mode == "2") {
        wx.navigateTo({
          url: '/pages/form_video/form_video',
        })
      } else {
        wx.navigateBack({
          delta: 2
        })
      }
    } else {
      var t = {
        code: '',
        name: ''
      }
      t.code = e.currentTarget.dataset.id
      t.name = this.data.school[e.currentTarget.dataset.index].name
      wx.setStorageSync('school', t)
      var mode = wx.getStorageSync('addressMode')

      if (mode == "1") {
        wx.switchTab({
          url: '/pages/index/index',
        })
      } else if (mode == "2") {
        wx.navigateTo({
          url: '/pages/form_video/form_video',
        })
      } else {
        wx.navigateBack({
          delta: 2
        })
      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.school(options.id)
    var pro = wx.getStorageSync('province')
    var cit = wx.getStorageSync('city')
    this.setData({
      province: pro.name,
      city: cit.name
    })
  },
  school(pid) {
    let url = app.globalData.URL + '/config/getUniv';
    let data = {
      cid: pid
    };
    app.wxRequest('GET', url, data, (res) => {
      let tmp = res.data
      let obj = {}
      obj.code = '00000'
      obj.name = '不选'
      tmp.unshift(obj)
      this.setData({
        school: tmp
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  }
})