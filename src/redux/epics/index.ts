import { combineEpics } from 'redux-observable';
import login from './login';

export default combineEpics(
  login,
);