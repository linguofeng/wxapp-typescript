import BasePage from '../base';
import { Actions } from '../../redux/modules/user';

import { connect } from 'wechat-weapp-redux';

const app = getApp();

const mapStateToData = state => ({
  user: state.user,
});

const mapDispatchToPage = dispatch => ({
  login: () => dispatch(Actions.login()),
});

class IndexPage extends BasePage {
  login: () => void
  
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
    this.login();
    app.getUserInfo().then((userInfo) => {
      this.setData({
        userInfo,
      });
    });
  }
}

Page(connect(mapStateToData, mapDispatchToPage)(new IndexPage()));
