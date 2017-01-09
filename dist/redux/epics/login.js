"use strict";
var Observable_1 = require("../../libs/rxjs/Observable");
var user_1 = require("../modules/user");
var api_1 = require("../../net/api");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (action$) {
    return action$.ofType("" + user_1.Actions.login)
        .mergeMap(function () { return Observable_1.Observable.create(function (subscriber) {
        wx.login({
            success: function (_a) {
                var code = _a.code;
                wx.getUserInfo({
                    success: function (_a) {
                        var userInfo = _a.userInfo;
                        subscriber.next({ code: code, userInfo: userInfo });
                        subscriber.complete();
                    },
                });
            },
        });
    }); }).mergeMap(function (_a) {
        var code = _a.code, userInfo = _a.userInfo;
        return Observable_1.Observable.merge(Observable_1.Observable.of(user_1.Actions.userInfo(userInfo)), api_1.default.post('/post', { code: code })
            .map(function (response) { return user_1.Actions.loginSuccess(response); })
            .catch(function (error) { return Observable_1.Observable.of(user_1.Actions.loginFailure(error)); }));
    });
};
