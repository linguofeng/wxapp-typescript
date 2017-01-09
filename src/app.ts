// fix rxjs
global.global = global;
global.Object = Object;
global.clearTimeout = clearTimeout;

import 'rxjs/Rx';
import { Provider } from 'wechat-weapp-redux';
import configureStore from './redux/configureStore';

const store = configureStore();

class Application {
  onLaunch() {
  }
}

App(Provider(store)(new Application()));
