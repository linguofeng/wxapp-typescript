"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var base_1 = require("../base");
var LogsPage = (function (_super) {
    __extends(LogsPage, _super);
    function LogsPage() {
        var _this = _super.apply(this, arguments) || this;
        _this.data = {};
        return _this;
    }
    LogsPage.prototype.onLoad = function () {
    };
    return LogsPage;
}(base_1.default));
Page(new LogsPage());
