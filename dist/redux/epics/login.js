"use strict";
var user_1 = require("../modules/user");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = function (action$) {
    return action$.ofType("" + user_1.Actions.login)
        .map(function () { return user_1.Actions.loginSuccess({
        nickName: 'hello',
    }); });
};
