import * as Promise from 'bluebird';

class Application {
  globalData = {
    userInfo: null,
  }

  onLaunch() {
    var logs = wx.getStorageSync('logs') || [];
    logs.unshift(Date.now());
    wx.setStorageSync('logs', logs)
  }

  getUserInfo(): Promise<Object> {
    return new Promise((resolve) => {
      if (this.globalData.userInfo) {
        resolve(this.globalData.userInfo);
      } else {
        wx.login({
          success: () => {
            wx.getUserInfo({
              success: ({ userInfo }) => {
                this.globalData.userInfo = userInfo
                resolve(userInfo);
              },
            });
          },
        });
      }
    });
  }
}

App(new Application());
