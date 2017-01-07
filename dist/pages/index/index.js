"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require("../base");
var app = getApp();
var IndexPage = (function (_super) {
    __extends(IndexPage, _super);
    function IndexPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.data = {
            motto: 'Hello World',
            userInfo: {},
        };
        return _this;
    }
    //事件处理函数
    IndexPage.prototype.bindViewTap = function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    };
    IndexPage.prototype.onLoad = function () {
        var _this = this;
        console.log('onLoad');
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            _this.setData({
                userInfo: userInfo,
            });
        });
    };
    return IndexPage;
}(base_1.default));
Page(new IndexPage());
