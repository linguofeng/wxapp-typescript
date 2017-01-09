import { connect } from 'wechat-weapp-redux';

import BasePage from '../base';
import { Actions } from '../../redux/modules/user';

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
    user: null,
  }

  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    });
  }

  onLoad() {
    this.login();
  }
}

Page(connect(mapStateToData, mapDispatchToPage)(new IndexPage()));
