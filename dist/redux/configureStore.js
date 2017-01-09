"use strict";
var redux_1 = require("../libs/redux");
var createLogger = require("../libs/redux-logger");
var reducers_1 = require("./reducers");
function configureStore() {
    var store = redux_1.createStore(reducers_1.default, redux_1.applyMiddleware(createLogger()));
    return store;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
