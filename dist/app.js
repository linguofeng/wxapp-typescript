"use strict";
// fix rxjs
global.global = global;
global.Object = Object;
global.clearTimeout = clearTimeout;
var Promise = require("./libs/bluebird");
var rxjs_1 = require("./libs/@reactivex/rxjs");
var configureStore_1 = require("./redux/configureStore");
rxjs_1.Observable
    .of('hello world')
    .subscribe(function (x) { return console.log(x); });
var store = configureStore_1.default();
var Application = (function () {
    function Application() {
        this.globalData = {
            userInfo: null,
        };
        this.store = store;
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
