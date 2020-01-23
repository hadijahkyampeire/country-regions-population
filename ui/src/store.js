import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import http from 'utils/http';

const thunk = reduxThunk.withExtraArgument({ http });
export default function configureStore() {
  const initialState = {};
  const middlewareByEnv = {
    development: () => [thunk, createLogger()],
    production: () => [thunk]
  };
  const middleware = middlewareByEnv[process.env.NODE_ENV]();
  return createStore(reducers, initialState, applyMiddleware(...middleware));
}
