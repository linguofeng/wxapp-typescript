import { createStore, applyMiddleware, compose } from 'redux';
import * as createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import reducers from './reducers';
import epics from './epics/index';

const epicMiddleware = createEpicMiddleware(epics);

export default function configureStore() {
  const store = createStore(reducers, compose(applyMiddleware(epicMiddleware, createLogger())));
  return store;
}
