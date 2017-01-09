"use strict";
var redux_observable_1 = require("../../libs/redux-observable");
var login_1 = require("./login");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_observable_1.combineEpics(login_1.default);
