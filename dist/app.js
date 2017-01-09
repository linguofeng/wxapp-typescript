"use strict";
// fix rxjs
global.global = global;
global.Object = Object;
global.clearTimeout = clearTimeout;
var Promise = require("./libs/bluebird");
var rxjs_1 = require("./libs/@reactivex/rxjs");
var redux_1 = require("./libs/redux");
rxjs_1.Observable
    .of('hello world')
    .subscribe(function (x) { return console.log(x); });
function counter(state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}
var store = redux_1.createStore(counter);
store.subscribe(function () {
    return console.log(store.getState());
});
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1
var Application = (function () {
    function Application() {
        this.globalData = {
            userInfo: null,
        };
    }
    Application.prototype.onLaunch = function () {
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    };
    Application.prototype.getUserInfo = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.globalData.userInfo) {
                resolve(_this.globalData.userInfo);
            }
            else {
                wx.login({
                    success: function () {
                        wx.getUserInfo({
                            success: function (_a) {
                                var userInfo = _a.userInfo;
                                _this.globalData.userInfo = userInfo;
                                resolve(userInfo);
                            },
                        });
                    },
                });
            }
        });
    };
    return Application;
}());
App(new Application());
