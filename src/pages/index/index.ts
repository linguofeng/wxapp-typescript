import BasePage from '../base';

const app = getApp();

class IndexPage extends BasePage {
  data = {
    motto: 'Hello World',
    userInfo: {},
  }

  //事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  }
  
  onLoad() {
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    app.getUserInfo((userInfo) => {
      //更新数据
      this.setData({
        userInfo,
      });
    });
  }
}

Page(new IndexPage());
