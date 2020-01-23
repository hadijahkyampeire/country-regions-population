import { people } from '../people';
import { fetchPeoplePending, fetchPeopleSuccess, fetchPeopleError } from 'actions/people';

describe('Get People Reducer', () => {
  it('should not change state if no action passed', () => {
    expect(people(undefined, {})).toEqual({
      pending: false,
      people: [],
      error: null
    });
  });

  it('should handle getting people successfully', () => {
    const state = { people: [] };
    const responseData = [{ id: 1, name: 'me me' }];

    expect(people(state, fetchPeopleSuccess(responseData))).toEqual({
      pending: false,
      people: responseData
    });
  });

  it('should return initial state if request is pending', () => {
    const state = {};
    expect(people(state, fetchPeoplePending())).toEqual({
      pending: true
    });
  });

  it('should handle failure to fetching people', () => {
    const state = {};
    const responseError = {
      message: 'something went wrong'
    };

    expect(people(state, fetchPeopleError(responseError))).toEqual({
      pending: false,
      error: responseError
    });
  });
});
