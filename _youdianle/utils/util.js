const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const post = (url, data) => {
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function(res) { //服务器返回数据
        if (res.data.code == 109) {
          console.log('utils code 109', res.data)
          wx.showToast({
            title: '请重新登录！',
            image: '/img/fail.png',
            duration: 2000,
            success: function() {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
          })
        }
        else if(res.data.code!=0){  //返回错误提示信息
          console.log(url+res.data.msg)
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration: 2000,
          })
        }
        resolve(res);
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
const post_token = (url, data) => {
  var user = wx.getStorageSync('userInfo')
  user = 'Bearer ' + user.token;
  var promise = new Promise((resolve, reject) => {
    //网络请求
    wx.request({
      url: url,
      data: data,
      method: 'POST',
      header: {
        "Content-Type": "application/json",
        'Authorization': user
      },
      success: function(res) { //服务器返回数据
        if (res.data.code == 109) {
          console.log('utils code 109', res.data)
          wx.showToast({
            title: '请重新登录！',
            image: '/img/fail.png',
            duration: 2000,
            success: function() {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }
          })
        }
        else if(res.data.code==135){ //返回错误提示信息
          console.log('code35'+url+res.data.code)
          wx.showToast({ 
            title:res.data.msg,
            icon:'none',
            duration: 2000,
             success: function() { 
              setTimeout(function() { 
                wx.navigateTo({
                  url: '/pages/MyPages/my_profile/my_profile',
                }) 
              }, 1000); 
            }
          })
        }
        else if(res.data.code!=0){  //返回错误提示信息
          console.log(url+res.data.msg)
          wx.showToast({
            title: res.data.msg,
            icon:'none',
            duration: 2000,
          })
        }
        resolve(res);
      },
      error: function(e) {
        reject('网络出错');
      }
    })
  });
  return promise;
}
const gets = (url, data) => {
  var user = wx.getStorageSync('userInfo')
  {
    user = 'Bearer ' + user.token;
    var promise = new Promise((resolve, reject) => {
      //网络请求
      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json',
          'Authorization': user
        },
        success: function(res) { //服务器返回数据
          if (res.data.code == 109) {
            console.log('utils code 109', res.data)
            wx.showToast({
              title: '请重新登录！',
              image: '/img/fail.png',
              duration: 2000,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
          else if(res.data.code==135){ //返回错误提示信息
            console.log('code35'+url+res.data.code)
            wx.showModal({
              title: '补充个人信息',
              content: res.data.msg,
              cancelText: '取消',
              confirmText: '去填写',
              success: res => {
                if (res.confirm) {
                  wx.navigateTo({
                    url: '/pages/MyPages/my_profile/my_profile',
                  })
                }
                else{
                  wx.navigateBack({
                    delta: 1
                  })
                }
              }
            })
          }
          else if(res.data.code!=0){ //返回错误提示信息
            console.log(url+res.data.code)
            wx.showToast({
              title: res.data.msg,
              icon:'none',
              duration: 2000,
            })
          }
          resolve(res);
        },
        error: function(e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  }
}

const gets_notoken = (url, data) => {
  {
    var promise = new Promise((resolve, reject) => {
      //网络请求
      wx.request({
        url: url,
        data: data,
        header: {
          'content-type': 'application/json',
        },
        success: function (res) { //服务器返回数据
          if (res.data.code == 109) {
            console.log('utils code 109', res.data)
            wx.showToast({
              title: '请重新登录！',
              image: '/img/fail.png',
              duration: 2000,
              success: function() {
                wx.redirectTo({
                  url: '/pages/login/login',
                })
              }
            })
          }
          else if(res.data.code!=0){ //返回错误提示信息
            console.log(url+res.data.msg)
            wx.showToast({
              title: url+res.data.msg,
              icon:'none',
              duration: 2000,
            })
          }
          resolve(res);
        },
        error: function (e) {
          reject('网络出错');
        }
      })
    });
    return promise;
  }
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  gets,
  post,
  post_token,
  gets_notoken
}