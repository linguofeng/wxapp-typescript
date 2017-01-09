"use strict";
var redux_1 = require("../libs/redux");
var user_1 = require("./modules/user");
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_1.combineReducers({
    user: user_1.default,
});
