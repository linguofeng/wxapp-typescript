import { createActions, createReducer } from '../createActions';

export const Actions = createActions({
  login: null,
  loginSuccess: ['data'],
  loginFailure: ['error'],
  userInfo: ['info'],
});

const INITIAL_STATE = {
  data: null,
  error: null,
  info: null,
}

export default createReducer(INITIAL_STATE, {
  [Actions.login]: state => state,
  [Actions.userInfo]: (state, { info }) => ({
    ...state,
    info,
  }),
  [Actions.loginSuccess]: (state, { data }) => ({
    ...state,
    data,
  }),
  [Actions.loginFail]: (state, { error }) => ({
    ...state,
    error,
  }),
});
