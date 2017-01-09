import * as sauce from 'reduxsauce';
import { pipe, replace, toUpper } from 'ramda';

const RX_CAPS = /(?!^)([A-Z])/g;

const camelToScreamingSnake = pipe(
  replace(RX_CAPS, '_$1'),
  toUpper
);

export const createReducer = sauce.createReducer;

export const createActions = (actions) => {
  const { Creators: Actions } = sauce.createActions(actions);

  Object.keys(actions).forEach((key) => {
    Actions[key].toString = () => camelToScreamingSnake(key);
  });

  return Actions;
};
