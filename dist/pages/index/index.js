var app = getApp();
var IndexPage = (function () {
    function IndexPage() {
        this.data = {
            motto: 'Hello World',
            userInfo: {},
        };
    }
    //事件处理函数
    IndexPage.prototype.bindViewTap = function () {
        wx.navigateTo({
            url: '../logs/logs',
        });
    };
    IndexPage.prototype.onLoad = function () {
        var _this = this;
        console.log('onLoad');
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            _this.setData({
                userInfo: userInfo,
            });
        });
    };
    return IndexPage;
}());
Page(new IndexPage());
