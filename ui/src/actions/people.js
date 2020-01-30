export const FETCH_PEOPLE_PENDING = 'FETCH_PEOPLE_PENDING';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_ERROR = 'FETCH_PEOPLE_ERROR';

const BASE_URL = 'http://localhost:5000';
export const fetchPeoplePending = () => {
  return {
    type: FETCH_PEOPLE_PENDING
  };
};

export const fetchPeopleSuccess = (people, region) => {
  return {
    type: FETCH_PEOPLE_SUCCESS,
    payload: people,
    region: region
  };
};

export const fetchPeopleError = error => {
  return {
    type: FETCH_PEOPLE_ERROR,
    error: error
  };
};

const fetchPeople = (region) => (dispatch, getState, { http }) => {
    dispatch(fetchPeoplePending());
    return http
      .get(region?`${BASE_URL}/people?region=${region}`:`${BASE_URL}/people`)
      .then(response => {
        dispatch(fetchPeopleSuccess(response.data.people, region));
      })
      .catch(error => dispatch(fetchPeopleError(error)));
  };


export { fetchPeople };
