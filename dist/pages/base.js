"use strict";
var app = getApp();
var Base = (function () {
    function Base() {
        this.data = {};
        this.props = {
            dispatch: app.store.dispatch,
        };
    }
    Base.prototype.pageWillReceiveProps = function (nextProps) {
        console.log(nextProps);
    };
    return Base;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Base;
