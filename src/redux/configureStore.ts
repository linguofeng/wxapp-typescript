import { createStore, applyMiddleware } from 'redux';
import * as createLogger from 'redux-logger';

import reducers from './reducers';

export default function configureStore() {
  const store = createStore(reducers, applyMiddleware(createLogger()));
  return store;
}
