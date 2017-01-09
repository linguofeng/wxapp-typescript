"use strict";
var sauce = require("../libs/reduxsauce");
var ramda_1 = require("../libs/ramda");
var RX_CAPS = /(?!^)([A-Z])/g;
var camelToScreamingSnake = ramda_1.pipe(ramda_1.replace(RX_CAPS, '_$1'), ramda_1.toUpper);
exports.createReducer = sauce.createReducer;
exports.createActions = function (actions) {
    var Actions = sauce.createActions(actions).Creators;
    Object.keys(actions).forEach(function (key) {
        Actions[key].toString = function () { return camelToScreamingSnake(key); };
    });
    return Actions;
};
