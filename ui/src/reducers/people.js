import { FETCH_PEOPLE_PENDING, FETCH_PEOPLE_SUCCESS, FETCH_PEOPLE_ERROR } from 'actions';

const initialState = {
  pending: false,
  people: [],
  error: null
};

export const people = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PEOPLE_PENDING:
      return {
        ...state,
        pending: true
      };
    case FETCH_PEOPLE_SUCCESS:
      return {
        ...state,
        pending: false,
        people: [...state.people, ...action.payload]
      };
    case FETCH_PEOPLE_ERROR:
      return {
        ...state,
        pending: false,
        error: action.error
      };
    default:
      return state;
  }
};

export const getPeople = (region, state) => {
  return region ? state.people.people.filter(person => person.region === region): state.people.people
  }

export const getPeoplePending = state => state.people.pending;
export const getPeopleError = state => state.people.error;
