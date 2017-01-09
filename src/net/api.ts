import { Observable } from 'rxjs/Observable';

class Api {
  baseUrl: string

  constructor(baseUrl: string = 'https://httpbin.org') {
    this.baseUrl = baseUrl;
  }

  fetch(url: string, method: string, data?: Object) {
    return Observable.create((subscriber) => {
      wx.request({
        url: `${this.baseUrl}${url}`,
        method,
        data,
        success: ({ statusCode, data }) => {
          if (statusCode === 200) {
            subscriber.next(data);
            subscriber.complete();
          } else {
            subscriber.error(data);
          }
        },
        fail: (data) => {
          subscriber.error(data);
        },
      });
    });
  }

  post(url: string, data: Object) {
    return this.fetch(url, 'POST', data);
  }
}

export default new Api();
