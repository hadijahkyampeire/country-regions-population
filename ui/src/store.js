import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const middleWare = [];

middleWare.push(thunk);

const loggerMiddleware = createLogger({
  predicate: () => process.env.NODE_ENV === 'development'
});
middleWare.push(loggerMiddleware);

export default function configureStore(initialState = {}) {
  return createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare)));
}
