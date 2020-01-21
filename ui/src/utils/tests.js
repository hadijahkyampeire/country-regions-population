import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

export const makeStore = (...args) => {
  return configureStore([thunk.withExtraArgument()])(...args);
};
