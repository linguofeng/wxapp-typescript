import { Observable } from 'rxjs/Observable';
import { Actions } from '../modules/user';
import api from '../../net/api';

export default action$ =>
  action$.ofType(`${Actions.login}`)
    .mergeMap(() => Observable.create((subscriber) => {
      wx.login({
        success: ({ code }) => {
          wx.getUserInfo({
            success: ({ userInfo }) => {
              subscriber.next({ code, userInfo });
              subscriber.complete();
            },
          });
        },
      })
    })).mergeMap(({ code, userInfo }) => Observable.merge(
      Observable.of(Actions.userInfo(userInfo)),
      api.post('/post', { code })
        .map(response => Actions.loginSuccess(response))
        .catch(error => Observable.of(Actions.loginFailure(error)))
    ));