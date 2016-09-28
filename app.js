//app.js
App({
  init: function() {

    this.globalData.userInfo = {
      "nickName": "jason",
      "avatarUrl": "http://wx.qlogo.cn/mmopen/icSHGibMIMB82jDEHibGFA1s6dhwMibWrQAPeRvT2w2y2rpZVM5l3BftVEr3rTgX4fXDlznnMmZY0zYtgkfFw7L3o9r0tTblGTxB/0",
      "gender": 1,
      "province": "广东",
      "city": "深圳",
      "country": "中国",
    };
    
  },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
    this.init();
  },
  getUserInfo:function(cb){
    var that = this;
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo;
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            failure: function(err) {
              console.log('fail');
            }
          })
        },
        fail: function(err) {
          console.log(err);
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})
