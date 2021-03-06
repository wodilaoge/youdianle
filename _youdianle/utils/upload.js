var CosAuth = require('./cos-auth.min');

var Bucket = 'kt-1301681474';
var Region = 'ap-shanghai';
var ForcePathStyle = false; // 是否使用后缀式，涉及签名计算和域名白名单配置，后缀式说明看上文

var uploadFile = function (path, wayto, t) {

  // 请求用到的参数
  var prefix = 'https://' + Bucket + '.cos.' + Region + '.myqcloud.com/';
  if (ForcePathStyle) {
    prefix = 'https://cos.' + Region + '.myqcloud.com/' + Bucket + '/';
  }

  var camSafeUrlEncode = function (str) {
    return encodeURIComponent(str)
      .replace(/!/g, '%21')
      .replace(/'/g, '%27')
      .replace(/\(/g, '%28')
      .replace(/\)/g, '%29')
      .replace(/\*/g, '%2A');
  };

  // 获取临时密钥
  var stsCache;
  var getCredentials = function (callback) {
    if (stsCache && Date.now() / 1000 + 30 < stsCache.expiredTime) {
      callback(data.credentials);
      return;
    }
    var user = wx.getStorageSync('userInfo')
    user = 'Bearer ' + user.token;
    console.log(user)
    wx.request({
      method: 'GET',
      //url: 'https://api.udianle.com/kt/config/getCosSignature', // 重要！服务端签名，后续调整正式服务端确定后再修改。
      url: 'http://192.144.169.239/kt/config/getCosSignature',
      header: {
        'Authorization': user,
      },
      dataType: 'json',
      success: function (result) {
        console.log(result)
        var data = result.data.data;
        var credentials = data.credentials;
        if (credentials) {
          stsCache = data
        } else {
          console.log('fail')
          wx.showModal({
            title: '临时密钥获取失败',
            content: JSON.stringify(data),
            showCancel: false
          });
        }
        callback(stsCache && stsCache.credentials);
      },
      error: function (err) {
        console.log('fail2')
        wx.showModal({
          title: '临时密钥获取失败',
          content: JSON.stringify(err),
          showCancel: false
        });
      }
    });
  };

  // 计算签名
  var getAuthorization = function (options, callback) {
    getCredentials(function (credentials) {
      callback({
        XCosSecurityToken: credentials.sessionToken,
        Authorization: CosAuth({
          SecretId: credentials.tmpSecretId,
          SecretKey: credentials.tmpSecretKey,
          Method: options.Method,
          Pathname: options.Pathname,
        })
      });
    });
  };
  var S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  var getuuid = function () {
    return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
  }
  //create uuid
  var wxuuid = function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid
  }
  // 上传文件
  var uploadFile = function (filePath, way) {
    var that = t;
    var uuid = getuuid();
    var Key = 'app/' + way + '/10.' + uuid + filePath.substr(filePath.lastIndexOf('.'));;
    var stoway;
    var tmpway;
    if (way == 'rule') {
      tmpway = 'url1';
      stoway = that.data.url1;
    } else if (way == 'award') {
      tmpway = 'url2';
      stoway = that.data.url2;
    } else if (way == 'logo') {
      tmpway = 'url3';
      stoway = that.data.url3;
    } else if (way == 'rot') {
      tmpway = 'url4';
      stoway = that.data.url4;
    } else if (way == 'spons') {
      tmpway = 'url5';
      stoway = that.data.url5;
    } else if (way == 'other') {
      tmpway = 'other';
      stoway = that.data.other;
    } else if (way == 'video') {
      tmpway = 'video';
      stoway = that.data.video;
    } else if (way == 'photo') {
      tmpway = 'photo';
      stoway = that.data.photo;
    }
    // 重要！指定上传的目录和文件名，注意：1、不同模块的图片上传到相应目录（比如other，具体看对照表）；2、待实现：文件名（filePath.substr(filePath.lastIndexOf('/') + 1)）需要替换成“编码.32位UUID”格式，编码标识移动端类型：10：微信小程序，20：安卓，30：苹果；3、如果一次上传多个图片，需要批量上传，待实现，注意看腾讯相应的demo；4、上传成功后，把完整的图片文件URL作为数据的一部分提交到后端接口（存数据库）。
    var signPathname = '/';
    if (ForcePathStyle) {
      signPathname = '/' + Bucket + '/';
    }
    getAuthorization({
      Method: 'POST',
      Pathname: signPathname
    }, function (AuthData) {
      var requestTask = wx.uploadFile({
        url: prefix,
        name: 'file',
        filePath: filePath,
        formData: {
          'key': Key,
          'success_action_status': 200,
          'Signature': AuthData.Authorization,
          'x-cos-security-token': AuthData.XCosSecurityToken,
          'Content-Type': '',
        },
        success: function (res) {
          var url = prefix + camSafeUrlEncode(Key).replace(/%2F/g, '/');
          console.log('url', url);
          if (/^2\d\d$/.test('' + res.statusCode)) {
            if (tmpway == "url4") {
              var obj = {};
              obj.id = '';
              obj.rotation = url;
              stoway.push(obj);
              that.setData({
                [tmpway]: stoway
              })
            } else if (tmpway == "photo") {
              var test = that.data.photo[that.data.photo.length - 1]
              if (test&&!test.path) {
                test.id = '';
                test.path = url;
                test.status = 10;
                that.setData({
                  [tmpway]: stoway
                })
              } else {
                var obj = {};
                obj.id = '';
                obj.path = url;
                obj.status = 10;
                stoway.push(obj);
                that.setData({
                  [tmpway]: stoway
                })
              }
            } else {
              if (stoway) {
                that.setData({
                  [tmpway]: stoway.concat(url)
                })
              } else {
                that.setData({
                  [tmpway]: url
                })
              }
            }

          } else {
            wx.showModal({
              title: '上传失败',
              content: JSON.stringify(res),
              showCancel: false
            });
          }
        },
        fail: function (res) {
          wx.showModal({
            title: '上传失败',
            content: JSON.stringify(res),
            showCancel: false
          });
        },
        complete: function () {
          that.setData({
            loadModal: false
          })
        }
      });
      requestTask.onProgressUpdate(function (res) {
        console.log('进度:', res);
      });
    });
  };
  // door main
  uploadFile(path, wayto)

};

module.exports = {
  uploadFile: uploadFile
}