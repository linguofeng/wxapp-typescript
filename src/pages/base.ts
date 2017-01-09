declare interface Base extends BasePage {
}

const app = getApp();

class Base {
  data = {

  }

  props = {
    dispatch: app.store.dispatch,
  }

  pageWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
}

export default Base;
