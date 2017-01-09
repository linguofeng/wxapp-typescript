import BasePage from '../base';
import { Actions } from '../../redux/modules/user';

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
    this.props.dispatch(Actions.login());
    app.getUserInfo().then((userInfo) => {
      this.setData({
        userInfo,
      });
    });
  }
}

Page(new IndexPage());
