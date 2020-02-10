import { combineReducers } from 'redux';
import { people } from './people';
import { search } from "./search";

export * from './people';
export * from './search';

export default combineReducers({
  people,
  search
});
