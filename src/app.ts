declare function getApp(): SimpleApp;

class SimpleApp {
  globalData = {
    userInfo: null,
  }

  onLaunch() {
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs)
  }

  getUserInfo(cb: (userInfo: Object) => void) {
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo);
    } else {
      //调用登录接口
      wx.login({
        success: () => {
          wx.getUserInfo({
            success: (res) => {
              this.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(this.globalData.userInfo)
            },
          });
        },
      });
    }
  }
}

App(new SimpleApp());
