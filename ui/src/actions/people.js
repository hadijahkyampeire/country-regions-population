export const FETCH_PEOPLE_PENDING = 'FETCH_PEOPLE_PENDING';
export const FETCH_PEOPLE_SUCCESS = 'FETCH_PEOPLE_SUCCESS';
export const FETCH_PEOPLE_ERROR = 'FETCH_PEOPLE_ERROR';
export const SEARCH_DISTRICT_PENDING = 'SEARCH_DISTRICT_PENDING';
export const SEARCH_DISTRICT_SUCCESS = 'SEARCH_DISTRICT_SUCCESS';
export const SEARCH_DISTRICT_ERROR = 'SEARCH_DISTRICT_ERROR';

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

export const searchDistrictPending = () => {
  return {
    type: SEARCH_DISTRICT_PENDING
  };
};

export const searchDistrictSuccess = (searchResults) => {
  return {
    type: SEARCH_DISTRICT_SUCCESS,
    payload: searchResults
  };
};

export const searchDistrictError = error => {
  return {
    type: SEARCH_DISTRICT_ERROR,
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


const searchDistrict = (district) => (dispatch, getState, { http }) => {
  
  dispatch(searchDistrictPending());
  return http
    .get(district?`${BASE_URL}/people?district=${district}`:`${BASE_URL}/people`)
    .then(response => {
      console.log(response, 'response')
      dispatch(searchDistrictSuccess(response.data.people));
    })
    .catch(error => dispatch(searchDistrictError(error)));
};


export { fetchPeople , searchDistrict};
