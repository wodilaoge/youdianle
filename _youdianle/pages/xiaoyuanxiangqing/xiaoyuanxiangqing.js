const app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    chooseSize: false,
    shipinChooseSize: false,
    animationData: {},
    isReflesh: false,
    shipinAnimationData: {},
    Input: "",
    options: [],
    biaoti: "",
    yibaomingList: [],
    cansaiset: false,
    guankanset: false,  
    guankanhide: false,
    shiminghide: false,
    iftongyi: true,
    yonghuxinxi: [],
    count: 0,

    tuanduipaiming: [],
    gerenpaiming: [],
    tuanduishuju: [],
    gerenshuju: [],

    TabCur: 0,
    paimingCur: 0,
    baomingCur: 0,
    shujuCur: 0,
    guanliCur: 0,
    shujuhide: true,

    categoryId: '',
    detail: [], //页面详细内容
    comment: [],
    //comment_detail: [],
    //news: [],
    //news_detail: [],
    likecount: 0,
    ifzan: false,
    loading: true,
    signupway: false,
    user: [],
    //报名
    canjiaorguankan: 10,
    huodongfenzu: [],
    fenzuhide: false,
    fenzuindex: 0,
    picker: [],
    isguanzhu: false,
    isbaominggeren: 0,
    isbaomingtuandui: 0,
    tuanduiSelect: [],
    members: [],
    shipin: [],
    video_id: 'video_0', ///用于切换视频
    bofang_if_id: 'video_0', /////用数字来表示匹配
    bofang_pid: '0', ///1表示有一个播放，0表示无播放
    shipinInit: 0,
    shipin_index: 0,
    shipinBorder: '',
    shipinPinglunBorder: '',
    isRefleshshipin: true,
    isRefleshshipinPinglun: true,
    city: '',
    univ: '',
  },
  toagreepage() {
    wx.navigateTo({
      url: '/pages/webview/webview',
    })
  },
  gerenziliao(e) {
    wx.navigateTo({
      url: '/pages/ziliao/ziliao?id=' + e.currentTarget.dataset.id,
    })
  },
  /////////////////////////////////////
  chooseSezi: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export(),
      chooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 100)

    that.setData({
      duixiang: e.currentTarget.dataset.duixiang,
      dxid: e.currentTarget.dataset.dxid,
      dxtitle: e.currentTarget.dataset.dxtitle,
    })
  },
  shipinChooseSezi: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      shipinAnimationData: animation.export(),
      shipinChooseSize: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        shipinAnimationData: animation.export()
      })
    }, 100)
    that.setData({
      shipin_index: e.currentTarget.dataset.index,
    })

    /////
    var shipintmp = this.data.shipin;
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objtype: 50,
      objid: e.currentTarget.dataset.dxid,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      shipintmp.list[e.currentTarget.dataset.index].listComm = res.data.list;
      this.setData({
        shipin: shipintmp,
        shipinPinglunBorder: res.data.border,
        isRefleshshipinPinglun:true
      })
    }, (err) => {
      console.log(err.errMsg)
    });


  },
  getShipinPinglunFenye: function (e) {
    var shipintmp = this.data.shipin;
    let url = app.globalData.URL + '/comm/listCommByObj';
    let data = {
      objtype: 50,
      objid: this.data.shipin.list[this.data.shipin_index].id,
      border: this.data.shipinPinglunBorder,
    };
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefleshshipinPinglun: false
        })
      }
      for (let s of res.data.list) {
        shipintmp.list[this.data.shipin_index].listComm.push(s);
      }
      this.setData({
        shipin: shipintmp,
        shipinPinglunBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 100)
  },
  shipinHideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      shipinAnimationData: animation.export()
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        shipinAnimationData: animation.export(),
        shipinChooseSize: false
      })
    }, 100)
  },
  emailInput: function (e) { //input输入
    this.setData({
      Input: e.detail.value
    });
  },
  paimingInput: function (e) { //input输入
    if (e.target.dataset.flag == 0) {
      var member = this.data.gerenshuju
      member.list[e.target.dataset.index].members[e.target.dataset.index2].mbrRank = e.detail.value
      this.setData({
        gerenshuju: member
      })
    } else {
      var member = this.data.tuanduishuju
      member.list[e.target.dataset.index].members[e.target.dataset.index2].mbrRank = e.detail.value
      this.setData({
        tuanduishuju: member
      })
    }
  },
  defenInput: function (e) { //input输入
    if (e.target.dataset.flag == 0) {
      var member = this.data.gerenshuju
      member.list[e.target.dataset.index].members[e.target.dataset.index2].mbrScore = e.detail.value
      this.setData({
        gerenshuju: member
      })
    } else {
      var member = this.data.tuanduishuju
      member.list[e.target.dataset.index].members[e.target.dataset.index2].mbrScore = e.detail.value
      this.setData({
        tuanduishuju: member
      })
    }
  },
  //评论
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
    this.userPanduan()
    var self = this;
    if (this.data.duixiang == '50') {
      let url = app.globalData.URL + '/comm/addComment';
      let data = {
        pid: null,
        objtype: 50,
        objid: self.data.dxid,
        objtitle: self.data.dxtitle,
        comment: self.data.Input,
        creater: self.data.user.id,
        createrAlias: self.data.user.nickname,
        createrHead: self.data.user.head
      };
      app.wxRequest('POST', url, data, (res) => {
        // self.onLoad(self.data.options);
        self.getShipin(),
          wx.showToast({
            title: '评论成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })
      }, (err) => {
        console.log(err.errMsg)
      });
    } else {
      let url = app.globalData.URL + '/comm/addComment';
      let data = {
        pid: null,
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: "",
        comment: self.data.Input,
        creater: self.data.user.id,
        createrAlias: self.data.user.nickname,
        createrHead: self.data.user.head
      };
      app.wxRequest('POST', url, data, (res) => {
        self.onLoad(self.data.options);
        wx.showToast({
          title: '评论成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
      }, (err) => {
        console.log(err.errMsg)
      });
    }
    self.setData({
      Input: '',
    })
    self.hideModal()
  },
  //报名
  bindPickerChange: function (e) {
    this.setData({
      fenzuindex: e.detail.id
    })
  },
  bindRadioChange: function (e) {
    if (e.currentTarget.dataset.id == 10 || e.currentTarget.dataset.id == 30)
      this.setData({
        canjiaorguankan: e.currentTarget.dataset.id,
        shiminghide: this.data.cansaiset
      })
    else if (e.currentTarget.dataset.id == 20 || e.currentTarget.dataset.id == 40)
      this.setData({
        canjiaorguankan: e.currentTarget.dataset.id,
        shiminghide: this.data.guankanset
      })
    if (self.data.shiminghide == false)
      self.ifshiming()
  },
  iftongyiRadioChange: function (e) {
    this.setData({
      iftongyi: !this.data.iftongyi
    })
  },
  xuanzetuandui() {
    wx.navigateTo({
      url: '/pages/xuanzetuandui1/xuanzetuandui1?lid=' + this.data.user.id,
    })
  },

  //
  tabSelect(e) {
    var self = this
    var op = this.data.options
    op.TabCur = e.currentTarget.dataset.id
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      options: op
    })
    if (e.currentTarget.dataset.id == 1)
      if (self.data.shiminghide == false)
        self.ifshiming()
  },
  guanliSelect(e) {
    this.setData({
      guanliCur: e.currentTarget.dataset.id,
    })
  },
  paimingSelect(e) {
    this.setData({
      paimingCur: e.currentTarget.dataset.id,
    })
  },
  shujuSelect(e) {
    this.setData({
      shujuCur: e.currentTarget.dataset.id,
    })
  },
  baomingSelect(e) {
    if (e.currentTarget.dataset.id == 0)
      this.setData({
        baomingCur: e.currentTarget.dataset.id,
        canjiaorguankan: 10,
        shiminghide: cansaiset
      })
    else
      this.setData({
        baomingCur: e.currentTarget.dataset.id,
        canjiaorguankan: 20,
        shiminghide: cansaiset
      })
    if (self.data.shiminghide == false)
      self.ifshiming()
  },
  pinluntiaozhuan(e) { //评论跳转
    wx.navigateTo({
      url: '/pages/pinlunliebiao/pinlunliebiao?categoryId=' + this.data.categoryId + '&objtitle=' + this.data.detail.actname,
    })
  },
  chakanhuifu: function (e) { //查看回放跳转
    wx.navigateTo({
      url: '/pages/chakanhuifu/chakanhuifu?id=' + e.currentTarget.dataset.id,
    })
  },

  gerenpaiming() {
    let url = app.globalData.URL + '/act/listActSignup';
    let data = {
      actid: this.data.categoryId,
      signupType: 10,
      type: 20
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        gerenpaiming: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    data = {
      actid: this.data.categoryId,
      signupType: 10,
      type: 10
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        gerenshuju: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  tuanduipaiming() {
    let url = app.globalData.URL + '/act/listActSignup';
    let data = {
      actid: this.data.categoryId,
      signupType: 20,
      type: 20
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        tuanduipaiming: res.data,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
    data = {
      actid: this.data.categoryId,
      signupType: 20,
      type: 10
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        tuanduishuju: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  detail() { //页面项目信息
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url = app.globalData.URL + '/act/findCampusActivity';
    let data = {
      id: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        detail: res.data
      })
      this.setData({
        biaoti: res.data.actname
      })
      if (res.data.auth != null)
        if (res.data.auth.rights.indexOf("U") != -1)
          this.setData({
            shujuhide: false
          })
      if (this.data.detail.signupway == "30") {
        self.gerenpaiming()
        self.tuanduipaiming()
        this.setData({
          signupway: false,
          baomingCur: 0
        })
      } else if (this.data.detail.signupway == "10") {
        self.gerenpaiming()
        this.setData({
          signupway: true,
          baomingCur: 0
        })
      } else if (this.data.detail.signupway == "20") {
        self.tuanduipaiming()
        this.setData({
          signupway: true,
          baomingCur: 1,
          paimingCur: 1,
          canjiaorguankan: 20
        })
      }
      self.baomingkongzhi()
      wx.hideLoading()
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  comment() { //评论
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    var self = this
    let url = app.globalData.URL + '/comm/countCommByObj';
    let data = {
      objid: this.data.categoryId,
      objtype: 30
    };
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        count: res.data
      });
    }, (err) => {
      console.log(err.errMsg)
    });
    url = app.globalData.URL + '/comm/listCommByObj';
    app.wxRequest('POST', url, data, (res) => {
      this.setData({
        comment: res.data
      });
      self.setData({
        loading: false,
        isReflesh: true
      });
      /*if (self.data.comment == 0)
        {}
      else {
        var list = self.data.comment.list

        for (let i in list) {
          let url2 = app.globalData.URL + '/applaud/findApplaud'; //点赞情况

          data = {
            objtype: 30,
            objid: list[i].id,
            uid: self.data.user.id,
          };
          util.gets(url2, data).then(function (res) {
            list[i]['ifzan'] = res.data.data
          });
          url2 = app.globalData.URL + '/applaud/countByObj'; //点赞数
          data = {
            objid: list[i].id,
            objtype: 30
          };
          util.gets(url2, data).then(function (res) {
            list[i].praiseCnt = res.data.data

            self.setData({
              comment_detail: list,
              loading: false
            });
          });
        }
      }*/
      wx.hideLoading()
    }, (err) => {
      wx.hideLoading()
      console.log(err.errMsg)
    });
  },
  /*news() { //活动新闻
    let url = app.globalData.URL + '/news/listNews';
    let data = {
      id: this.data.categoryId
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        news: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  news_detail() { //活动新闻
    let url = app.globalData.URL + '/news/findNewsDetail';
    let data = {
      id: this.data.news.id
    };
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        news_detail: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },*/
  gerenziliao(e) { //个人资料
    wx.navigateTo({
      url: '/pages/ziliao/ziliao?id=' + e.currentTarget.dataset.id,
    })
  },
  ifguanzhu() { //是否关注
    self = this;
    let url = app.globalData.URL + '/follow/findFollow';
    let data = {
      objtype: 30,
      objid: self.data.categoryId,
      uid: self.data.user.id,
    };
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        isguanzhu: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  guanzhu() { //活动关注或取消关注
    self = this;
    let url = app.globalData.URL + '/follow/updateFollow';
    if (self.data.isguanzhu)
      var data = {
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: self.data.detail.actname,
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: self.data.detail.actname,
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      if (self.data.isguanzhu)
        self.setData({
          isguanzhu: false
        })
      else
        self.setData({
          isguanzhu: true
        })
      wx.showToast({
        title: '操作成功！', // 标题
        icon: 'success', // 图标类型，默认success
        duration: 500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  ////////////////////////////
  ifzan() { //是否点赞
    self = this;
    let url = app.globalData.URL + '/applaud/findApplaud';
    let url2 = app.globalData.URL + '/applaud/countByObj'; //活动点赞数
    let data = {
      objtype: 30,
      objid: self.data.categoryId,
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
      objid: this.data.categoryId,
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
  zan() { //活动点赞或取消
    self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (self.data.ifzan)
      var data = {
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: self.data.detail.actname,
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 30,
        objid: self.data.categoryId,
        objtitle: self.data.detail.actname,
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
        duration: 500 // 提示窗停留时间，默认1500ms
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  zan_list(e) { //评论点赞或取消
    var self = this;
    let url = app.globalData.URL + '/applaud/updateApplaud';
    if (e.currentTarget.dataset.ifzan)
      var data = {
        objtype: 30,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 0,
      };
    else
      var data = {
        objtype: 30,
        objid: e.currentTarget.dataset.objid,
        objtitle: '',
        creater: self.data.user.id,
        status: 1,
      };
    app.wxRequest('POST', url, data, (res) => {
      var list = self.data.comment_detail
      if (list[e.currentTarget.dataset.index].ifzan) {
        list[e.currentTarget.dataset.index].ifzan = false
        list[e.currentTarget.dataset.index].praiseCnt = list[e.currentTarget.dataset.index].praiseCnt - 1
        self.setData({
          comment_detail: list,
        })
      } else {
        list[e.currentTarget.dataset.index].ifzan = true
        list[e.currentTarget.dataset.index].praiseCnt = list[e.currentTarget.dataset.index].praiseCnt + 1
        self.setData({
          comment_detail: list,
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
  fenzu() { //分组和报名
    var self = this;
    let url = app.globalData.URL + '/act/listActGroup';
    let data = {
      actid: self.data.categoryId,
      signup: true
    }
    util.gets(url, data).then(function (res) {
      self.setData({
        huodongfenzu: res.data.data
      })
    }).then(function () {
      if (self.data.huodongfenzu.length == 0)
        self.setData({
          fenzuhide: true
        })
      else {
        let picker = []
        for (let i in self.data.huodongfenzu) {
          picker[i] = self.data.huodongfenzu[i].groupname
        }
        self.setData({
          picker: picker
        })
      }
    })
  },
  shipintiaozhuan() {
    wx.navigateTo({
      url: '../form_actid_video/form_actid_video?actid=' + this.data.categoryId
    })
  },
  baomingzhuangtai() {
    var self = this
    let url = app.globalData.URL + '/act/findActSignupTeamStatus'
    let data = {
      actid: self.data.categoryId,
      lid: self.data.user.id
    }
    util.gets(url, data).then(function (res) {
      if (res.data.data == null) {} else if (res.data.data.status == 10)
        self.setData({
          isbaomingtuandui: 1
        })
    })
    url = app.globalData.URL + '/act/findActSignupIndStatus'
    data = {
      actid: self.data.categoryId,
      uid: self.data.user.id
    }
    util.gets(url, data).then(function (res) {
      if (res.data.data == null) {} else if (res.data.data.status == 10)
        self.setData({
          isbaominggeren: 1
        })
    })
  },
  yibaoming() {
    let url = app.globalData.URL + '/act/listActSignupTopN';
    let data = {
      actid: this.data.categoryId
    }
    app.wxRequest('GET', url, data, (res) => {
      this.setData({
        yibaomingList: res.data
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  baomingkongzhi() {
    let detail = this.data.detail
    if (detail.entrylimit == 10) {
      this.setData({
        cansaiset: true,
        shiminghide: true
      })
    } else if (detail.entrylimit == 20) {
      this.setData({
        cansaiset: false,
        shiminghide: false
      })
    }
    if (detail.audiencelimit == 10) {
      this.setData({
        guankanhide: true
      })
    } else if (detail.audiencelimit == 20) {
      this.setData({
        guankanset: true,
        guankanhide: false
      })
    } else if (detail.audiencelimit == 30) {
      this.setData({
        guankanset: false,
        guankanhide: false
      })
    }
  },
  quxiaobaoming(e) {
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    var self = this
    var status
    if (e.currentTarget.dataset.obj == 0) {
      let url = app.globalData.URL + '/act/cancelActSignupIndByUser'
      let data = {
        actid: self.data.categoryId,
        uid: self.data.user.id
      }
      util.gets(url, data).then(function (res) {
        wx.hideLoading()
        if (res.data.code == 0) {
          wx.showToast({
            title: '操作成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })
          self.setData({
            isbaominggeren: 0
          })
          self.yibaoming()
        } else
          wx.showToast({
            title: res.data.msg, // 标题
            image: '/img/fail.png', // 图标类型，默认success
            duration: 1000 // 提示窗停留时间，默认1500ms
          })
      })
    }
    if (e.currentTarget.dataset.obj == 1) {
      let url = app.globalData.URL + '/act/findActSignupTeamStatus'
      let data = {
        actid: self.data.categoryId,
        lid: self.data.user.id
      }
      util.gets(url, data).then(function (res) {
        status = res.data.data
      }).then(function () {
        url = app.globalData.URL + '/act/cancelActSignupByTeam'
        data = {
          actid: self.data.categoryId,
          tid: status.tid
        }
        util.gets(url, data).then(function (res) {
          wx.hideLoading()
          if (res.data.code == 0) {
            wx.showToast({
              title: '操作成功！', // 标题
              icon: 'success', // 图标类型，默认success
              duration: 1500 // 提示窗停留时间，默认1500ms
            })
            self.setData({
              isbaomingtuandui: 0
            })
            self.yibaoming()
          } else
            wx.showToast({
              title: res.data.msg, // 标题
              image: '/img/fail.png', // 图标类型，默认success
              duration: 1000 // 提示窗停留时间，默认1500ms
            })
        })
      })
    }
  },
  lijibaoming() {
    if (this.data.iftongyi == false)
      wx.showToast({
        title: '请同意声明！',
        image: '/img/fail.png',
        duration: 1000,
      })
    else {
      if (this.data.shiminghide == false) {
        if (this.data.yonghuxinxi.name == null || this.data.yonghuxinxi.name == '' || this.data.yonghuxinxi.mobile == '' || this.data.yonghuxinxi.mobile == null)
          wx.showToast({
            title: '完善信息/绑定手机号！',
            image: '/img/fail.png',
            duration: 1000,
          })
        else
          this.lijibaoming_do_shiming()
      } else
        this.lijibaoming_do()
      this.gerenpaiming()
    }
  },
  onPullDownRefresh() {
    this.onLoad()
  },

  lijibaoming_do() {
    var self = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url
    let data
    if (self.data.baomingCur == 0) {
      url = app.globalData.URL + '/act/addActSignupInd'
      if (self.data.fenzuhide)
        data = {
          actid: self.data.categoryId,
          groupid: null,
          mbrId: self.data.user.id,
          mbrAlias: self.data.user.nickname,
          mbrHead: self.data.user.head,
          signupType: self.data.canjiaorguankan,
          status: 10,
          creater: self.data.user.id
        }
      else
        data = {
          actid: self.data.categoryId,
          groupid: self.data.huodongfenzu[self.data.fenzuindex].id,
          mbrId: self.data.user.id,
          mbrAlias: self.data.user.nickname,
          mbrHead: self.data.user.head,
          signupType: self.data.canjiaorguankan,
          status: 10,
          creater: self.data.user.id
        }
      util.post_token(url, data).then(function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '报名成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })
          self.setData({
            isbaominggeren: 1
          })
          self.yibaoming()
        } else
          wx.showToast({
            title: '报名失败！',
            image: '/img/fail.png',
            duration: 1000,
          })
        wx.hideLoading()
      })
    } else {
      if (self.data.tuanduiSelect.length == 0)
        wx.showToast({
          title: '请选择团队！',
          image: '/img/fail.png',
          duration: 1000,
        })
      else {
        wx.showLoading({
          title: '加载中...',
          mask: true //显示触摸蒙层  防止事件穿透触发
        });
        url = app.globalData.URL + '/act/addActSignupTeam'
        if (self.data.fenzuhide)
          data = {
            actid: self.data.categoryId,
            groupid: null,
            tid: self.data.tuanduiSelect.id,
            team: self.data.tuanduiSelect.name,
            teamLogo: self.data.tuanduiSelect.logo,
            lid: self.data.user.id,
            signupType: self.data.canjiaorguankan,
            creater: self.data.user.id,
            members: self.data.members,
          }
        else
          data = {
            actid: self.data.categoryId,
            groupid: self.data.huodongfenzu[self.data.fenzuindex].id,
            tid: self.data.tuanduiSelect.id,
            team: self.data.tuanduiSelect.name,
            teamLogo: self.data.tuanduiSelect.logo,
            lid: self.data.user.id,
            signupType: self.data.canjiaorguankan,
            creater: self.data.user.id,
            members: self.data.members,
          }
        util.post_token(url, data).then(function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '报名成功！', // 标题
              icon: 'success', // 图标类型，默认success
              duration: 1500 // 提示窗停留时间，默认1500ms
            })
            self.setData({
              isbaomingtuandui: 1
            })
            self.yibaoming()
          } else
            wx.showToast({
              title: '报名失败！',
              image: '/img/fail.png',
              duration: 1000,
            })
          wx.hideLoading()
        })
      }
    }
  },
  lijibaoming_do_shiming() {
    var self = this
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    let url
    let data
    if (self.data.baomingCur == 0) {
      url = app.globalData.URL + '/act/addActSignupInd'
      if (self.data.fenzuhide)
        data = {
          actid: self.data.categoryId,
          groupid: null,
          mbrId: self.data.user.id,
          mbrAlias: self.data.user.nickname,
          mbrHead: self.data.user.head,
          mbrName: this.data.yonghuxinxi.name,
          signupType: self.data.canjiaorguankan,
          status: 10,
          creater: self.data.user.id
        }
      else
        data = {
          actid: self.data.categoryId,
          groupid: self.data.huodongfenzu[self.data.fenzuindex].id,
          mbrId: self.data.user.id,
          mbrAlias: self.data.user.nickname,
          mbrHead: self.data.user.head,
          mbrName: this.data.yonghuxinxi.name,
          signupType: self.data.canjiaorguankan,
          status: 10,
          creater: self.data.user.id
        }
      util.post_token(url, data).then(function (res) {
        if (res.data.code == 0) {
          wx.showToast({
            title: '报名成功！', // 标题
            icon: 'success', // 图标类型，默认success
            duration: 1500 // 提示窗停留时间，默认1500ms
          })
          self.setData({
            isbaominggeren: 1
          })
          self.yibaoming()
        } else
          wx.showToast({
            title: '报名失败！',
            image: '/img/fail.png',
            duration: 1000,
          })
        wx.hideLoading()
      })
    } else {
      if (self.data.tuanduiSelect.length == 0)
        wx.showToast({
          title: '请选择团队！',
          image: '/img/fail.png',
          duration: 1000,
        })
      else {
        wx.showLoading({
          title: '加载中...',
          mask: true //显示触摸蒙层  防止事件穿透触发
        });
        url = app.globalData.URL + '/act/addActSignupTeam'
        if (self.data.fenzuhide)
          data = {
            actid: self.data.categoryId,
            groupid: null,
            tid: self.data.tuanduiSelect.id,
            team: self.data.tuanduiSelect.name,
            teamLogo: self.data.tuanduiSelect.logo,
            lid: self.data.user.id,
            signupType: self.data.canjiaorguankan,
            creater: self.data.user.id,
            members: self.data.members,
          }
        else
          data = {
            actid: self.data.categoryId,
            groupid: self.data.huodongfenzu[self.data.fenzuindex].id,
            tid: self.data.tuanduiSelect.id,
            team: self.data.tuanduiSelect.name,
            teamLogo: self.data.tuanduiSelect.logo,
            lid: self.data.user.id,
            signupType: self.data.canjiaorguankan,
            creater: self.data.user.id,
            members: self.data.members,
          }
        util.post_token(url, data).then(function (res) {
          if (res.data.code == 0) {
            wx.showToast({
              title: '报名成功！', // 标题
              icon: 'success', // 图标类型，默认success
              duration: 1500 // 提示窗停留时间，默认1500ms
            })
            self.setData({
              isbaomingtuandui: 1
            })
            self.yibaoming()
          } else
            wx.showToast({
              title: '报名失败！',
              image: '/img/fail.png',
              duration: 1000,
            })
          wx.hideLoading()
        })
      }
    }
  },
  ////////////////////////////
  gerenshuju() {
    var self = this
    var url = app.globalData.URL + '/act/updateActIndRank' //更新个人排名
    var mlist = []
    for (let i in self.data.gerenshuju.list) {
      for (let j in self.data.gerenshuju.list[i].members) {
        let mem = {
          mbrId: self.data.gerenshuju.list[i].members[j].mbrId,
          mbrRank: self.data.gerenshuju.list[i].members[j].mbrRank,
          mbrScore: self.data.gerenshuju.list[i].members[j].mbrScore
        }
        mlist.push(mem)
      }
    }
    var data = {
      actid: self.data.categoryId,
      members: mlist
    }
    util.post_token(url, data).then(function (res) {
      if (res.data.code == 0)
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 500 // 提示窗停留时间，默认1500ms
        })
      else
        wx.showToast({
          title: res.data.data.msg,
          image: '/img/fail.png',
          duration: 500,
        })
    })
    self.gerenpaiming()
  },
  tuanduishuju() {
    var self = this
    var url = app.globalData.URL + '/act/updateActTeamRank' //更新团队排名
    var mlist = []
    var tlist = []
    for (let i in self.data.tuanduishuju.list) {
      let team = {
        tid: self.data.tuanduishuju.list[i].tid,
        teamRank: self.data.tuanduishuju.list[i].teamRank,
        teamScore: self.data.tuanduishuju.list[i].teamScore
      }
      tlist.push(team)
      for (let j in self.data.tuanduishuju.list[i].members) {
        let mem = {
          mbrId: self.data.tuanduishuju.list[i].members[j].mbrId,
          mbrRank: self.data.tuanduishuju.list[i].members[j].mbrRank,
          mbrScore: self.data.tuanduishuju.list[i].members[j].mbrScore
        }
        mlist.push(mem)
      }
    }
    var data = {
      actid: self.data.categoryId,
      teams: tlist,
      members: mlist
    }
    util.post_token(url, data).then(function (res) {
      if (res.data.code == 0)
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 500 // 提示窗停留时间，默认1500ms
        })
      else
        wx.showToast({
          title: res.data.data.msg,
          image: '/img/fail.png',
          duration: 500,
        })
    })
    self.tuanduipaiming()
  },
  tijiao() {
    if (this.data.detail.signupway == "30") {
      this.tuanduishuju()
      this.gerenshuju()
    } else if (this.data.detail.signupway == "10")
      this.gerenshuju()
    else
      this.tuanduishuju()
    this.gerenpaiming()
    this.taunduipaiming()
    this.setData({
      TabCur: 4
    })
  },
  jieshu() {
    var self = this
    var url = app.globalData.URL + '/act/stopActivity' //结束活动
    let data = {
      actid: self.data.cate
    }
    app.wxRequest('GET', url, data, (res) => {
      if (res.code == 0)
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 500 // 提示窗停留时间，默认1500ms
        })
      else
        wx.showToast({
          title: res.data.data.msg,
          image: '/img/fail.png',
          duration: 1000,
        })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  tijiaobingjieshu() {
    this.tijiao()
    this.jieshu()
  },
  //////////////////////////////
  yonghuxinxi() {
    var self = this
    let url = app.globalData.URL + '/appuser/findUserByID'
    let data = {
      id: self.data.user.id
    }
    app.wxRequest('GET', url, data, (res) => {
      self.setData({
        yonghuxinxi: res.data
      })
      if (res.data.length == 0)
        wx.showToast({
          title: 获取用户信息失败,
          image: '/img/fail.png',
          duration: 500,
        })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  ifshiming() {
    if (self.data.yonghuxinxi.name == null || self.data.yonghuxinxi.name == '')
      wx.showModal({
        title: '提示',
        content: '该活动需要实名参加/观看，是否前往实名',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.navigateTo({
              url: '/pages/MyPages/my_profile/my_profile',
            })
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
    if (self.data.yonghuxinxi.mobile == null || self.data.yonghuxinxi.mobile == '')
      wx.showModal({
        title: '提示',
        content: '该活动参加/观看需要手机号，是否前往绑定',
        success: function (res) {
          if (res.confirm) { //这里是点击了确定以后
            wx.navigateTo({
              url: '/pages/MyPages/my_security/my_security',
            })
          } else { //这里是点击了取消以后
            console.log('用户点击取消')
          }
        }
      })
  },
  ////////////////////////////
  delete_geren(e) { //管理删除
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    var self = this
    var status
    let url = app.globalData.URL + '/act/cancelActSignupIndByUser'
    let data = {
      actid: self.data.categoryId,
      uid: e.currentTarget.dataset.id
    }
    console.log(e)
    util.gets(url, data).then(function (res) {
      wx.hideLoading()
      if (res.data.code == 0) {
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
        self.setData({
          isbaominggeren: 0
        })
        self.yibaoming()
        self.gerenshuju()
      } else {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg, // 标题
          image: '/img/fail.png', // 图标类型，默认success
          duration: 1000 // 提示窗停留时间，默认1500ms
        })
      }
    })
  },
  //////////////////////////
  gerendianzan(e) {
    wx.showLoading({
      title: '加载中...',
      mask: true //显示触摸蒙层  防止事件穿透触发
    });
    var self = this
    let url = app.globalData.URL + '/applaud/updateApplaud'
    let data = {
      objtype: 80,
      objid: e.currentTarget.dataset.members.id,
      objtitle: e.currentTarget.dataset.members.mbrAlias,
      creater: self.data.user.id,
      status: 1 - e.currentTarget.dataset.members.myApplaud
    }
    util.post_token(url, data).then(function (res) {
      console.log(res.data)
      if (res.data.code == 0) {
        wx.showToast({
          title: '操作成功！', // 标题
          icon: 'success', // 图标类型，默认success
          duration: 1500 // 提示窗停留时间，默认1500ms
        })
        self.gerenpaiming()
      } else {
        console.log(res.data)
        wx.showToast({
          title: res.data.msg, // 标题
          image: '/img/fail.png', // 图标类型，默认success
          duration: 1000 // 提示窗停留时间，默认1500ms
        })
      }
      wx.hideLoading()
    })
  },
  //////////////////////////////
  TBcontroll() { //同步控制
    var self = this;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {

        resolve();
      }, 1000)
    })
  },

  onLoad: async function (options) { //读取活动对应id
    var self = this
    self.setData({
      categoryId: options.categoryId,
      user: wx.getStorageSync('userInfo'),
      TabCur: options.TabCur,
      biaoti: options.Title,
      options: options,
      city: wx.getStorageSync('city').code ? wx.getStorageSync('city').name : null,
      univ: wx.getStorageSync('school').code ? wx.getStorageSync('school').name : null,
    })
    self.yonghuxinxi()
    self.fenzu()
    self.baomingzhuangtai()
    self.detail()
    self.comment()
    self.getShipin()
    self.ifguanzhu()
    self.ifzan()
    //this.news()
    //this.news_detail()
    self.yibaoming()
    setTimeout(function () {
      if (self.data.detail.length == 0)
        wx.showToast({
          title: '暂无活动数据！', // 标题
          image: '/img/fail.png', // 图标类型，默认success
          duration: 1000 // 提示窗停留时间，默认1500ms
        })
    }, 10000)
  },
  /////////////////////////

  //   /////////////为视频初始化
  //   if(e.currentTarget.dataset.id == '2') {
  //   this.initShipin()
  // }
  getShipin() { //视频
    var self = this;
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      actid: this.data.categoryId,
      pageSize: 2,
      // city: this.data.city === '不选' ? null : this.data.city,
      // univ: this.data.univ === '不选' ? null : this.data.univ,
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      let shipintmp = res.data;
      this.setData({
        shipin: shipintmp,
        shipinBorder: res.data.border,
      })
    }, (err) => {
      console.log(err.errMsg)
    });
  },
  getShipinFenye() { //视频
    var self = this;
    let url = app.globalData.URL + '/video/listActVideo';
    let data = {
      actid: this.data.categoryId,
      pageSize: 2,
      border: this.data.shipinBorder,
      // city: this.data.city === '不选' ? null : this.data.city,
      // univ: this.data.univ === '不选' ? null : this.data.univ,
    };
    console.log(data)
    app.wxRequest('POST', url, data, (res) => {
      console.log(res)
      if (res.data.border == null) {
        self.setData({
          isRefleshshipin: false
        })
      }
      let shipintmp = this.data.shipin;
      for (let s of res.data.list)
        shipintmp.list.push(s)
      this.setData({
        shipin: shipintmp,
        shipinBorder: res.data.border,
      })

    }, (err) => {
      console.log(err.errMsg)
    });
  },
  video_change: function (e) { ////视频切换

    var shipintmp = this.data.shipin;
    if (this.data.bofang_if_id != e.currentTarget.id) { ///相等表示点击和播放不匹配
      if (this.data.bofang_pid == '0') {
        this.setData({
          bofang_pid: '1'
        })
      }
      let url = app.globalData.URL + '/video/updatePlayCnt';
      let data = {
        id: this.data.shipin.list[e.currentTarget.dataset.index].id,
      };
      app.wxRequest('GET', url, data, (res) => {})
      shipintmp.list[e.currentTarget.dataset.index].playCnt = shipintmp.list[e.currentTarget.dataset.index].playCnt + 1;
      self.setData({
        shipin: shipintmp
      })

      let now_id = e.currentTarget.id;
      let prev_id = this.data.video_id;
      this.setData({
        video_id: now_id,
        bofang_if_id: now_id
      })
      wx.createVideoContext(prev_id).pause();
      wx.createVideoContext(now_id).play();


    } else { //////////当点击同一个，一次播放一次暂停
      if (this.data.bofang_pid == '1') {
        wx.createVideoContext(e.currentTarget.id).pause();
        this.setData({
          bofang_pid: '0'
        })
      } else {
        wx.createVideoContext(e.currentTarget.id).play();
        this.setData({
          bofang_pid: '1'
        })
        let url = app.globalData.URL + '/video/updatePlayCnt';
        let data = {
          id: this.data.shipin.list[e.currentTarget.dataset.index].id,
        };
        app.wxRequest('GET', url, data, (res) => {})
        shipintmp.list[e.currentTarget.dataset.index].playCnt = shipintmp.list[e.currentTarget.dataset.index].playCnt + 1;
        self.setData({
          shipin: shipintmp
        })
      }
    }
  },
  shipinguanzhu: function (e) {
    this.userPanduan()
    var self = this;
    let shipintmp = this.data.shipin;
    if (shipintmp.list[e.currentTarget.dataset.index].myFollow == 1) {
      shipintmp.list[e.currentTarget.dataset.index].myFollow = 0;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});

    } else {
      shipintmp.list[e.currentTarget.dataset.index].myFollow = 1;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/follow/updateFollow';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {}, (err) => {});
    }
  },
  shipinDianzan: function (e) {
  this.userPanduan()
    var self = this;
    let shipintmp = this.data.shipin;
    if (shipintmp.list[e.currentTarget.dataset.index].myApplaud == 1) {
      shipintmp.list[e.currentTarget.dataset.index].myApplaud = 0;
      shipintmp.list[e.currentTarget.dataset.index].applaudCnt--;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/applaud/updateApplaud';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 0,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});

    } else {
      shipintmp.list[e.currentTarget.dataset.index].myApplaud = 1;
      shipintmp.list[e.currentTarget.dataset.index].applaudCnt++;
      self.setData({
        shipin: shipintmp
      })
      let url = app.globalData.URL + '/applaud/updateApplaud';
      let data = {
        objtype: 50,
        objid: self.data.shipin.list[e.currentTarget.dataset.index].id,
        objtitle: self.data.shipin.list[e.currentTarget.dataset.index].title,
        creater: self.data.user.id,
        status: 1,
      };
      app.wxRequest('POST', url, data, (res) => {
        console.log(res)
      }, (err) => {});
    }
  },

  userPanduan(e) {
    //判断是否登录
    let url = app.globalData.URL + '/appuser/getSpeakPerm';
    util.gets(url, {}).then(function (res) {
      console.log('auth--mypage', res)
      if (res.data.code == 0) {
        console.log("已授权")
        return
      } else if (res.data.code == 126) {
        console.log('no auth')
        wx.showModal({
          title: '友点乐',
          content: '请先进行微信登录',
          cancelText: '取消',
          confirmText: '授权',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
      } else {
        // wx.navigateTo({
        //   url: '/pages/MyPages/my_profile/my_profile',
        // })
        console.log('no auth')
        wx.showModal({
          title: '友点乐',
          content: '请先进行微信登录',
          cancelText: '取消',
          confirmText: '授权',
          success: res => {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/login/login',
              })
            } else {
              wx.navigateBack({
                delta: 1
              })
            }
          }
        })
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
  onShow: function (options) {
    var self = this
    self.yonghuxinxi()
    if (self.data.TabCur == 1)
      setTimeout(function () {
        if (self.data.shiminghide == false)
          self.ifshiming()
      }, 1500)

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
    this.onLoad(this.data.options)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var self = this
    if (self.data.isReflesh) {
      wx.showLoading({
        title: '加载中...',
        mask: true //显示触摸蒙层  防止事件穿透触发
      });
      let data = {
        objid: self.data.categoryId,
        objtype: 30,
        border: self.data.comment.border
      };
      let url = app.globalData.URL + '/comm/listCommByObj';
      app.wxRequest('POST', url, data, (res) => {
        console.log(res.data)
        if (res.data.border == null) {
          self.setData({
            isReflesh: false
          })
        }
        console.log('刷新评论中', res)
        let t = 'comment'
        var tmp = self.data.comment
        tmp.border = res.data.border
        for (let s of res.data.list)
          tmp.list.push(s)
        self.setData({
          [t]: tmp,
        })
        wx.hideLoading()
      }, (err) => {
        console.log(err.errMsg)
      });
    }

    ////////
    if (this.data.isRefleshshipin == true) {

      this.getShipinFenye()
    }
    if (this.data.isRefleshshipinPinglun == true && this.data.shipinChooseSize == true) {

      this.getShipinPinglunFenye()
    }


  },
  onShareAppMessage: function () {
    var that = this;
    return {
      title: '友点乐',
      path: 'pages/xiaoyuanxiangqing/xiaoyuanxiangqing?TabCur=' + that.data.TabCur + '&Title=' + that.data.biaoti + '&categoryId=' + that.data.categoryId,
      success: function (res) {
        console.log("转发成功:" + JSON.stringify(res));
        that.shareClick();
      },
      fail: function (res) {
        console.log("转发失败:" + JSON.stringify(res));
      }
    }
  }
})