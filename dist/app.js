var SimpleApp = (function () {
    function SimpleApp() {
        this.globalData = {
            userInfo: null,
        };
    }
    SimpleApp.prototype.onLaunch = function () {
        var logs = wx.getStorageSync('logs') || [];
        logs.unshift(Date.now());
        wx.setStorageSync('logs', logs);
    };
    SimpleApp.prototype.getUserInfo = function (cb) {
        var _this = this;
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo);
        }
        else {
            //调用登录接口
            wx.login({
                success: function () {
                    wx.getUserInfo({
                        success: function (res) {
                            _this.globalData.userInfo = res.userInfo;
                            typeof cb == "function" && cb(_this.globalData.userInfo);
                        },
                    });
                },
            });
        }
    };
    return SimpleApp;
}());
App(new SimpleApp());
