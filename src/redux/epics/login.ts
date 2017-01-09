import { Actions } from '../modules/user';

export default action$ =>
  action$.ofType(`${Actions.login}`)
    .map(() => Actions.loginSuccess({
      nickName: 'hello',
    }));