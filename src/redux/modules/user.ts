import { createActions, createReducer } from '../createActions';

export const Actions = createActions({
  login: null,
  loginSuccess: ['data'],
});

const INITIAL_STATE = {
  data: null,
}

export default createReducer(INITIAL_STATE, {
  [Actions.login]: state => state,
  [Actions.loginSuccess]: (state, { data }) => ({
    ...state,
    data,
  }),
});
