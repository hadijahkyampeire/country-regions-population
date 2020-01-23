import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const alwaysSuccess = payload =>
  jest.fn().mockImplementation(() => Promise.resolve(payload));

export const alwaysFails = payload => jest.fn().mockImplementation(() => Promise.reject(payload));

export const makeStore = ({ http }, ...args) => {
  return configureStore([thunk.withExtraArgument({ http })])(...args);
};
