// fix rxjs
global.global = global;
global.Object = Object;
global.clearTimeout = clearTimeout;

import * as Promise from 'bluebird';
import 'rxjs/Rx';
import configureStore from './redux/configureStore';

const store = configureStore();

class Application {
  globalData = {
    userInfo: null,
  }

  store = store;

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
