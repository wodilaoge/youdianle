// pages/components/wenyu/wenyu.js
const app = getApp();
var util = require("../../../utils/util.js");
Component({
  options: {
    addGlobalClass: true
  },
  properties: {
    wenyuList: Object,
    wenyuCur: String,
    aihaoxiaolei:Object
  },
  attached: function () {
    console.log(this.properties.wenyuList);
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    yundongxiangqing(e) {
      app.globalData.tabbar = 2;
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=0&tzpd=2&Title=' + e.currentTarget.dataset.wenyu.actname +'&categoryId=' + e.currentTarget.dataset.wenyu.id,
      })
    },
    baomingtiaozhan(e) {
      app.globalData.tabbar = 2;
      wx.navigateTo({
        url: '../../pages/yundongxiangqing/yundongxiangqing?TabCur=1&tzpd=2&Title=' + e.currentTarget.dataset.wenyu.actname +'&categoryId=' + e.currentTarget.dataset.wenyu.id,
      })
    },
    ///////////////////////////////
    gerenziliao(e) {
      wx.navigateTo({
        url: '/pages/ziliao/ziliao?id=' + e.currentTarget.dataset.id,
      })
    },
  ////////////////////////
  }
})
