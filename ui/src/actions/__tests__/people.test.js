import fetchMock from 'fetch-mock';
import {
  fetchPeople,
  FETCH_PEOPLE_PENDING,
  FETCH_PEOPLE_SUCCESS,
  FETCH_PEOPLE_ERROR
} from '../people';
import { makeStore, alwaysSuccess, alwaysFails } from 'utils/tests';

describe('People Actions', () => {
  it('dispatches FETCH_PEOPLE_SUCCESS after success', async () => {
    const response = { data: { people: [{ id: 1, name: 'so and so' }] } };
    const expectedActions = [
      { type: FETCH_PEOPLE_PENDING },
      { type: FETCH_PEOPLE_SUCCESS, payload: response.data.people }
    ];
    const http = {
      get: alwaysSuccess(response)
    };

    const store = makeStore({ http });
    await store.dispatch(fetchPeople());
    expect(store.getActions()).toEqual(expectedActions);
    expect(http.get).toHaveBeenCalledWith('http://localhost:5000/people');
  });

  it('Fetches fails', async () => {
    const http = { get: alwaysFails({ message: 'something went wrong' }) };
    const store = makeStore({ http });
    const expectedAction = [
      { type: FETCH_PEOPLE_PENDING },
      {
        type: FETCH_PEOPLE_ERROR,
        error: { message: 'something went wrong' }
      }
    ];
    await store.dispatch(fetchPeople());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('Adds region filter to the url if its passed', () => {
    const response = { data: { people: [{ id: 1, name: 'so and so' }] } };
    const http = {
      get: alwaysSuccess(response)
    };
    const store = makeStore({ http });
    const region = 'western';
    store.dispatch(fetchPeople(region));
    expect(http.get).toHaveBeenCalledWith(`http://localhost:5000/people?region=${region}`);
  });
});
