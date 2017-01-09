"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var wechat_weapp_redux_1 = require("../../libs/wechat-weapp-redux/index");
var base_1 = require("../base");
var user_1 = require("../../redux/modules/user");
var app = getApp();
var mapStateToData = function (state) { return ({
    user: state.user,
}); };
var mapDispatchToPage = function (dispatch) { return ({
    login: function () { return dispatch(user_1.Actions.login()); },
}); };
var IndexPage = (function (_super) {
    __extends(IndexPage, _super);
    function IndexPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.data = {
            motto: 'Hello World',
            user: null,
        };
        return _this;
    }
    IndexPage.prototype.bindViewTap = function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    };
    IndexPage.prototype.onLoad = function () {
        this.login();
    };
    return IndexPage;
}(base_1.default));
Page(wechat_weapp_redux_1.connect(mapStateToData, mapDispatchToPage)(new IndexPage()));
