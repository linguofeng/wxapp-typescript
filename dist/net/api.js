"use strict";
var Observable_1 = require("../libs/rxjs/Observable");
var Api = (function () {
    function Api(baseUrl) {
        if (baseUrl === void 0) { baseUrl = 'https://httpbin.org'; }
        this.baseUrl = baseUrl;
    }
    Api.prototype.fetch = function (url, method, data) {
        var _this = this;
        return Observable_1.Observable.create(function (subscriber) {
            wx.request({
                url: "" + _this.baseUrl + url,
                method: method,
                data: data,
                success: function (_a) {
                    var statusCode = _a.statusCode, data = _a.data;
                    if (statusCode === 200) {
                        subscriber.next(data);
                        subscriber.complete();
                    }
                    else {
                        subscriber.error(data);
                    }
                },
                fail: function (data) {
                    subscriber.error(data);
                },
            });
        });
    };
    Api.prototype.post = function (url, data) {
        return this.fetch(url, 'POST', data);
    };
    return Api;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new Api();
