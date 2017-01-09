"use strict";
var Observable_1 = require("../../libs/rxjs/Observable");
var user_1 = require("../modules/user");
var api_1 = require("../../net/api");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (action$) {
    return action$.ofType("" + user_1.Actions.login)
        .mergeMap(function () {
        return api_1.default.post('/post', { code: 'helslslslef' })
            .map(function (response) { return user_1.Actions.loginSuccess(response); })
            .catch(function (error) { return Observable_1.Observable.of(user_1.Actions.loginFailure(error)); });
    });
};
