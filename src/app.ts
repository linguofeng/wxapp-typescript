declare function getApp(): SimpleApp;

declare interface SimpleApp extends BaseApp {
  globalData: {
    userInfo: any,
  }
  getUserInfo(cb: (userInfo: Object) => void): void;
}

class SimpleApp {
  globalData = {
    userInfo: null,
  }

  onLaunch() {
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs)
  }

  getUserInfo(cb) {
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
