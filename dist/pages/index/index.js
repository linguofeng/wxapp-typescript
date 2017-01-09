"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require("../base");
var user_1 = require("../../redux/modules/user");
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
    IndexPage.prototype.bindViewTap = function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    };
    IndexPage.prototype.onLoad = function () {
        var _this = this;
        this.props.dispatch(user_1.Actions.login());
        app.getUserInfo().then(function (userInfo) {
            _this.setData({
                userInfo: userInfo,
            });
        });
    };
    return IndexPage;
}(base_1.default));
Page(new IndexPage());
