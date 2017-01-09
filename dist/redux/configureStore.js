"use strict";
var redux_1 = require("../libs/redux");
var createLogger = require("../libs/redux-logger");
var redux_observable_1 = require("../libs/redux-observable");
var reducers_1 = require("./reducers");
var index_1 = require("./epics/index");
var epicMiddleware = redux_observable_1.createEpicMiddleware(index_1.default);
function configureStore() {
    var store = redux_1.createStore(reducers_1.default, redux_1.compose(redux_1.applyMiddleware(epicMiddleware, createLogger())));
    return store;
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = configureStore;
