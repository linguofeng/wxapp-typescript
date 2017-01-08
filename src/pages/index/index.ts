import BasePage from '../base';

const app = getApp();

class IndexPage extends BasePage {
  data = {
    motto: 'Hello World',
    userInfo: {},
  }

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  }

  onLoad() {
    app.getUserInfo().then((userInfo) => {
      this.setData({
        userInfo,
      });
    });
  }
}

Page(new IndexPage());
