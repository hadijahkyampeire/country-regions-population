export const FETCH_PEOPLE_PENDING = 'FETCH_PEOPLE_PENDING';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_ERROR = 'FETCH_PEOPLE_ERROR';

const BASE_URL = 'http://localhost:5000';
const fetchPeoplePending = () => {
  return {
    type: FETCH_PEOPLE_PENDING
  };
};

const fetchPeopleSuccess = people => {
  return {
    type: FETCH_PEOPLE_SUCCESS,
    payload: people
  };
};

const fetchPeopleError = error => {
  return {
    type: FETCH_PEOPLE_ERROR,
    error: error
  };
};

const fetchPeople = (region) => {
  return dispatch => {
    dispatch(fetchPeoplePending());
    fetch(region ?`${BASE_URL}/people?region=${region}`:`${BASE_URL}/people`, { method: 'get' })
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchPeopleSuccess(res.data.people));
        return res.data.people;
      })
      .catch(error => {
        dispatch(fetchPeopleError(error));
      });
  };
};

export { fetchPeople };
