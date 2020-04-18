const app = getApp();
Page({
  data: {
    actid: 1760034971189248,
    group: 0,
    index: 0,
    index2: 0,
    opinion1: 10,
    opinion2: 20,
    opinion3: 10,
    number: 50,
    picker: ['个人报名', '团体报名'],
    picker2: ['匿名参赛', '实名参赛'],
    picker3: ['观看无需报名', '匿名报名观看', '实名报名观看'],
    groups: [],
    time: '12:01',
    date: '2020.4.25 16:00',
    date2: '2020.8.25 16:00',
    imgList: [],
    imgList2: [],
    imgList3: [],
    imgList4: [],
    imgList5: [],
    modalName: null,
    info: {}
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
    this.setData({
      opinion1: (parseInt(this.data.index) + 1) * 10
    })
  },
  PickerChange2(e) {
    console.log(e);
    this.setData({
      index2: e.detail.value
    })
    this.setData({
      opinion2: (parseInt(this.data.index2) + 1) * 10
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  RegionChange: function(e) {
    this.setData({
      region: e.detail.value
    })
  },
  ChooseImage(e) {
    var t = e.currentTarget.dataset.id
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (t == 1) {
          if (this.data.imgList.length != 0) {
            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })
          }
        }
        if (t == 2) {
          if (this.data.imgList2.length != 0) {
            this.setData({
              imgList2: this.data.imgList2.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList2: res.tempFilePaths
            })
          }
        }
        if (t == 3) {
          if (this.data.imgList3.length != 0) {
            this.setData({
              imgList3: this.data.imgList3.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList3: res.tempFilePaths
            })
          }
        }
        if (t == 4) {
          if (this.data.imgList4.length != 0) {
            this.setData({
              imgList4: this.data.imgList4.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList4: res.tempFilePaths
            })
          }
        }
        if (t == 5) {
          if (this.data.imgList5.length != 0) {
            this.setData({
              imgList5: this.data.imgList5.concat(res.tempFilePaths)
            })
          } else {
            this.setData({
              imgList5: res.tempFilePaths
            })
          }
        }
      }
    });
  },
  ViewImage(e) {
    var t = e.currentTarget.dataset.id
    if (t == 1) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 2) {
      wx.previewImage({
        urls: this.data.imgList2,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 3) {
      wx.previewImage({
        urls: this.data.imgList3,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 4) {
      wx.previewImage({
        urls: this.data.imgList4,
        current: e.currentTarget.dataset.url
      });
    }
    if (t == 5) {
      wx.previewImage({
        urls: this.data.imgList5,
        current: e.currentTarget.dataset.url
      });
    }
  },
  DelImg(e) {
    var t = e.currentTarget.dataset.id
    if (t == 1) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 1) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList
            })
          }
        }
      })
    }
    if (t == 2) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 2) {
            this.data.imgList2.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList2: this.data.imgList2
            })
          }
        }
      })
    }
    if (t == 3) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 3) {
            this.data.imgList3.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList3: this.data.imgList3
            })
          }
        }
      })
    }
    if (t == 4) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 4) {
            this.data.imgList4.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList4: this.data.imgList4
            })
          }
        }
      })
    }
    if (t == 5) {
      wx.showModal({
        title: '确定',
        content: '确定要删除这张照片？',
        cancelText: '取消',
        confirmText: '确认删除',
        success: res => {
          if (res.confirm && t == 5) {
            this.data.imgList5.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList5: this.data.imgList5
            })
          }
        }
      })
    }
  },
  textareaAInput(e) {
    this.setData({
      textareaAValue: e.detail.value
    })
  },
  textareaBInput(e) {
    this.setData({
      textareaBValue: e.detail.value
    })
  },
  toForm_modify: function(e) {
    wx.navigateTo({
      url: "../../pages/form_modify/form_modify"
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  addicon: function(e) {
    var t = this.data.group
    if (t > 4) {
      wx.showToast({
        title: '最多添加5个',
      })
    } else {
      t++
      this.setData({
        group: t
      })
    }
  },
  subicon: function(e) {
    var t = this.data.group
    console.log(t)
    this.data.groups.splice(t - 1, 1)
    t--
    this.setData({
      group: t
    })
  },
  prevNum() {
    this.setData({
      number: this.data.number + 1
    });
  },
  nextNum() {
    this.setData({
      number: this.data.number - 1
    });
  },
  num(e) {
    this.setData({
      number: e.detail.value
    })
  },
  onLoad: function(options) {
    var t = wx.getStorageSync('information')
    this.setData({
      info: t
    })
    this.setData({
      opinion3: (parseInt(this.data.info.way) + 1) * 10
    })
  },
  commit: function(e) {
    var urls = app.globalData.URL + '/act/pubActivity';
    wx.request({
      url: urls,
      method: "POST",
      data: {
        id: 5069992122908672,
        actname: this.data.info.actname,
        sid: "076003",
        acid1: "076002001",
        acid2: "076002001002",
        logo: "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg",
        rotations: [{
            "id": 5075988962607104,
            "rotation": "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg"
          },
          {
            "id": 5075988970995712,
            "rotation": "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg"
          },
          {
            "id": 5075988979384320,
            "rotation": "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg"
          }
        ],
        groups: [{
            "id": '',
            "groupname": "分组1",
            "signupmax": 10
          },
          {
            "id": '',
            "groupname": "分组2",
            "signupmax": 10
          }
        ],
        fromtime: this.data.info.fromtime,
        totime: null,
        signupdeadline: this.data.info.signupdeadline,
        signupmax: this.data.info.entrylimit,
        audiencemax: this.data.number,
        slogan: this.data.info.slogan,
        entrylimit: this.data.opinion1,
        audiencelimit: this.data.opinion2,
        rule: null,
        rulepic: "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg",
        award: null,
        awardpic: "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg",
        sponsor: null,
        sponsorpic: "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg",
        signupway: this.data.opinion3,
        chatid: null,
        univid: this.data.info.univid,
        province: this.data.info.province,
        city: this.data.info.city,
        address: "学林街XX号",
        venue: this.data.info.venue,
        creater: 1025873536876568,
        createralias: "昵称啊",
        createrhead: "http://pic39.nipic.com/20140318/12838115_142809370123_2.jpg",
        status: 10,
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res.data);
        wx.showToast({
          title: '提交成功！',
          icon: 'success',
          duration: 2000
        })
      },
    })
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  g1(e) {
    var that = this;
    var obj = {};
    // console.log(this.data.groups.length)
    if (this.data.groups.length == 0) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[0].groupname': e.detail.value
      })
    }

  },
  g2(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 1) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[1].groupname': e.detail.value
      })
    }
  },
  g3(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 2) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[2].groupname': e.detail.value
      })
    }
  },
  g4(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 3) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[3].groupname': e.detail.value
      })
    }
  },
  g5(e) {
    var that = this;
    var obj = {};
    if (this.data.groups.length == 4) {
      obj.id = '';
      obj.groupname = '';
      obj.signupmax = 10;
      let t = that.data.groups;
      t.push(obj);
      that.setData({
        t
      });
    } else {
      that.setData({
        'groups[4].groupname': e.detail.value
      })
    }
  },
  tests: function(e) {
    var urls = app.globalData.URL + '/act/updateActIndRank';
    wx.request({
      url: urls,
      method: "POST",
      data: {
        actid: this.data.actid,
        members: [{
            "mbrId": "1025873536876568",
            "mbrRank": 1,
            "mbrScore": 100
          },
          {
            "mbrId": "1025873536876569",
            "mbrRank": 2,
            "mbrScore": 90
          }
        ]
      },
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) {
        console.log(res.data);
        wx.showToast({
          title: '提交成功！',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(err) {
        errFun(res);
      }
    })
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

})