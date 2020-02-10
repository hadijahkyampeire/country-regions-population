import { SEARCH_DISTRICT_PENDING, SEARCH_DISTRICT_SUCCESS, SEARCH_DISTRICT_ERROR } from 'actions';

const initialState = {
    pending: false,
    searchResults: [],
    error: null
  };

export const search = (state = initialState, action) => {
    switch(action.type) {
        case SEARCH_DISTRICT_PENDING:
      return {
        ...state,
        pending: true
      };
    case SEARCH_DISTRICT_SUCCESS:
      return {
        ...state,
        pending: false,
        searchResults: action.payload , 
      };
    case SEARCH_DISTRICT_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
        return state;
    }
};

export const searchDistricts = (state) => {
    return state.search.searchResults;
};

export const searchDistrictPending = state => state.search.pending;
export const searchDistrictError = state => state.search.error;
