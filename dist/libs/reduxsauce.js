'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var R = require('ramda');
var R__default = _interopDefault(R);
var RS = _interopDefault(require('ramdasauce'));

/**
  Creates a reducer.
  @param {string} initialState - The initial state for this reducer.
  @param {object} handlers - Keys are action types (strings), values are reducers (functions).
  @return {object} A reducer object.
 */
var cr = (function (initialState, handlers) {
  // initial state is required
  if (R__default.isNil(initialState)) {
    throw new Error('initial state is required');
  }

  // handlers must be an object
  if (R__default.isNil(handlers) || !R__default.is(Object, handlers)) {
    throw new Error('handlers must be an object');
  }

  // create the reducer function
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var action = arguments[1];

    // wrong actions, just return state
    if (R__default.isNil(action)) return state;
    if (!R__default.has('type', action)) return state;

    // look for the handler
    var handler = handlers[action.type];

    // no handler no cry
    if (R__default.isNil(handler)) return state;

    // execute the handler
    return handler(state, action);
  };
})

var defaultOptions = {
  prefix: ''
};

var createTypes$1 = (function (types, options) {
  if (RS.isNilOrEmpty(types)) throw new Error('valid types are required');

  var _R$merge = R__default.merge(defaultOptions, options);

  var prefix = _R$merge.prefix;


  return R__default.pipe(R__default.trim, R__default.split(/\s/), R__default.map(R__default.pipe(R__default.trim)), R__default.without([null, '']), R__default.map(function (x) {
    return [x, prefix + x];
  }), R__default.fromPairs)(types);
})

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var defaultOptions$1 = {
  prefix: ''
};

// matches on capital letters (except at the start & end of the string)
var RX_CAPS = /(?!^)([A-Z])/g;

// converts a camelCaseWord into a SCREAMING_SNAKE_CASE word
var camelToScreamingSnake = R.pipe(R.replace(RX_CAPS, '_$1'), R.toUpper);

// build Action Types out of an object
var convertToTypes = function convertToTypes(config, options) {
  var typesCreator = R.curry(createTypes$1)(R.__, options);

  return R.pipe(R.keys, // just the keys
  R.map(camelToScreamingSnake), // CONVERT_THEM
  R.join(' '), // space separated
  typesCreator // make them into Redux Types
  )(config);
};

// an action creator with additional properties
var createActionCreator = function createActionCreator(name, extraPropNames, options) {
  var _merge = R.merge(defaultOptions$1, options);

  var prefix = _merge.prefix;

  // types are upcase and snakey

  var type = prefix + camelToScreamingSnake(name);

  // do we need extra props for this?
  var noKeys = R.isNil(extraPropNames) || R.isEmpty(extraPropNames);

  // a type-only action creator
  if (noKeys) return function () {
    return { type: type };
  };

  // an action creator with type + properties
  return function () {
    for (var _len = arguments.length, values = Array(_len), _key = 0; _key < _len; _key++) {
      values[_key] = arguments[_key];
    }

    var extraProps = R.zipObj(extraPropNames, values);
    return _extends({ type: type }, extraProps);
  };
};

// build Action Creators out of an objet
var convertToCreators = function convertToCreators(config, options) {
  return R.mapObjIndexed(function (num, key, value) {
    if (typeof value[key] === 'function') {
      // the user brought their own action creator
      return value[key];
    } else {
      // lets make an action creator for them!
      return createActionCreator(key, value[key], options);
    }
  })(config);
};

var ca = (function (config, options) {
  if (R.isNil(config)) {
    throw new Error('an object is required to setup types and creators');
  }
  if (R.isEmpty(config)) {
    throw new Error('empty objects are not supported');
  }

  return {
    Types: convertToTypes(config, options),
    Creators: convertToCreators(config, options)
  };
})

var createReducer = cr;
var createTypes = createTypes$1;
var createActions = ca;

exports.createReducer = createReducer;
exports.createTypes = createTypes;
exports.createActions = createActions;