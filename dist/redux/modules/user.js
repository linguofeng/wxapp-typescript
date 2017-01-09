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
});
var INITIAL_STATE = {
    data: null,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createActions_1.createReducer(INITIAL_STATE, (_a = {},
    _a[exports.Actions.login] = function (state) { return state; },
    _a[exports.Actions.loginSuccess] = function (state, _a) {
        var data = _a.data;
        return (__assign({}, state, { data: data }));
    },
    _a));
var _a;
