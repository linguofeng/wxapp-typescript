// fix rxjs
global.global = global;
global.Object = Object;
global.clearTimeout = clearTimeout;

import * as Promise from 'bluebird';
import { Observable } from '@reactivex/rxjs';
import { createStore } from 'redux';

Observable
  .of('hello world')
  .subscribe((x) => console.log(x));

function counter(state = 0, action) {
  switch (action.type) {
  case 'INCREMENT':
    return state + 1
  case 'DECREMENT':
    return state - 1
  default:
    return state
  }
}

let store = createStore(counter);

store.subscribe(() =>
  console.log(store.getState())
);

store.dispatch({ type: 'INCREMENT' })
// 1
store.dispatch({ type: 'INCREMENT' })
// 2
store.dispatch({ type: 'DECREMENT' })
// 1

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
