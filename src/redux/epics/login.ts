import { Observable } from 'rxjs/Observable';
import { Actions } from '../modules/user';
import api from '../../net/api';

export default action$ =>
  action$.ofType(`${Actions.login}`)
    .mergeMap(() =>
      api.post('/post', { code: 'helslslslef' })
        .map(response => Actions.loginSuccess(response))
        .catch(error => Observable.of(Actions.loginFailure(error)))
    );