const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    option: [],
    id: '',
    comment: [],
    list: [],
    Input: '',
    user: [],
    likecount: 0,
    ifzan: false,
    loading: true,
  },
  emailInput: function(e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },
  comment() { //获取父评论以及回复
    var self = this;
    let url = app.globalData.URL + '/comm/listComm';
    let url2 = app.globalData.URL + '/comm/listCommReply'; //回复列表
    let data = {
      id: self.data.id,
      objtype: 30
    };
    util.gets(url, data).then(function(res) {
      self.setData({
        comment: res.data.data
      });
    });
    data = {
      id: self.data.id,
      objtype: 10
    };
    util.gets(url2, data).then(function(res) {
      var list = res.data.data
      if (list.list.length == 0)
        self.setData({
          list: list,
          loading: false
        });
      for (let i in list.list) {
        let url2 = app.globalData.URL + '/applaud/findApplaud'; //点赞情况
        data = {
          objtype: 10,
          objid: list.list[i].id,
          uid: self.data.user.id,
        };
        util.gets(url2, data).then(function(res) {
          list.list[i].status = res.data.data
        });
        url2 = app.globalData.URL + '/applaud/countByObj'; //点赞数
        data = {
          objid: list.list[i].id,
          objtype: 10
        };
        util.gets(url2, data).then(function(res) {
          list.list[i].praiseCnt = res.data.data
          if (i == list.list.length - 1)
            self.setData({
              list: list,
              loading: false
            });
        });
      }
    });
  },
  ifzan() { //是否点赞
    self = this;
    let url = app.globalData.URL + '/applaud/findApplaud';
    let url2 = app.globalData.URL + '/applaud/countByObj'; //点赞数
    let data = {
      objtype: 30,
      objid: self.data.id,
      uid: self.data.user.id,
    };
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        ifzan: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    data = {
      objid: this.data.id,
      objtype: 30
    };
    app.wxRequest('GET', url2, data, (res) => {
      this.setData({
        likecount: res.data
      });
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  zan() { //父评论点赞或取消
    self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (self.data.ifzan)
      var data = {
        objtype: 30,
        objid: self.data.id,
        objtitle: '',
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 30,
        objid: self.data.id,
        objtitle: '',
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      if (self.data.ifzan)
        self.setData({
          ifzan: false,
          likecount: self.data.likecount - 1
        })
      else
        self.setData({
          ifzan: true,
          likecount: self.data.likecount + 1
        })
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  zan_list(e) { //回复点赞或取消
    self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (e.currentTarget.dataset.ifzan)
      var data = {
        objtype: 10,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 10,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      var list = self.data.list
      console.log(list)
      if (self.data.list.list[e.currentTarget.dataset.index].status) {
        list.list[e.currentTarget.dataset.index].status = false
        list.list[e.currentTarget.dataset.index].praiseCnt = list.list[e.currentTarget.dataset.index].praiseCnt - 1
        console.log(list)
        self.setData({
          list: list,
        })
      } else {
        list.list[e.currentTarget.dataset.index].status = true
        list.list[e.currentTarget.dataset.index].praiseCnt = list.list[e.currentTarget.dataset.index].praiseCnt + 1
        console.log(list)
        self.setData({
          list: list,
        })
      }
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  pd_fasong() {
    if (this.data.Input == "") {
      wx.showToast({
        title: '请输入回复内容', // 标题
        icon: 'none',
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    } else {
      this.fasong()
    }
  },
  fasong() { //发送按钮
    var self = this;
    let url = app.globalData.URL + '/comm/addComment';
    let data = {
      pid: self.data.id,
      objtype: 10,
      objid: self.data.comment.objid,
      objtitle: "",
      comment: self.data.Input,
      creater: self.data.user.id,
      createrAlias: self.data.user.nickname,
      createrHead: self.data.user.head
    };
    app.wxRequest('POST', url, data, (res) => {
      self.onLoad(self.data.option);
      wx.showToast({
        title: '评论成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 1500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    self.setData({
      Input: ''
    })
  },
  TBcontroll() { //同步控制
    var self = this;
    new Promise(function(resolve, reject) {
      setTimeout(function() {
        
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function(option) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    var self = this;
    self.setData({
      option: option,
      id: option.id,
      user: wx.getStorageSync('userInfo'),
      loading: true
    })
    self.ifzan()
    self.comment();
    await self.TBcontroll();
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})