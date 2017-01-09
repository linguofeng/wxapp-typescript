"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var createActions_1 = require("../createActions");
exports.Actions = createActions_1.createActions({
    login: null,
    loginSuccess: ['data'],
    loginFailure: ['error'],
    userInfo: ['info'],
});
var INITIAL_STATE = {
    data: null,
    error: null,
    info: null,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createActions_1.createReducer(INITIAL_STATE, (_a = {},
    _a[exports.Actions.login] = function (state) { return state; },
    _a[exports.Actions.userInfo] = function (state, _a) {
        var info = _a.info;
        return (__assign({}, state, { info: info }));
    },
    _a[exports.Actions.loginSuccess] = function (state, _a) {
        var data = _a.data;
        return (__assign({}, state, { data: data }));
    },
    _a[exports.Actions.loginFail] = function (state, _a) {
        var error = _a.error;
        return (__assign({}, state, { error: error }));
    },
    _a));
var _a;
