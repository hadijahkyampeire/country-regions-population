import React from 'react';
import enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { People } from '../index';
import { makeStore, alwaysSuccess } from 'utils/tests';

describe('People container', () => {
  const state = {
    people: {
      people: { undefined: [{ id: 1, name: 'me' }] },
      pending: false,
      error: 'something wrong'
    }
  };
  const http = {
    get: alwaysSuccess()
  };
  const store = makeStore({ http }, state);
  const stubHistory = () => ({
    push: jest.fn()
  });
  const mocks = () => ({ history: stubHistory(), fetchPeople: jest.fn() });
  const container = props =>
    enzyme.mount(
      <Provider store={store}>
        <MemoryRouter>
          <People {...props} {...mocks()} />
        </MemoryRouter>
      </Provider>
    );

  const location = { pathname: '/people', search: '' };
  const people = container({ location });
  it('Renders properly', () => {
    expect(people.find('.header h4').text()).toEqual(
      'See all people from various regions, you can filter by region to reduce the view results'
    );
  });

  it('renders filter component properly', () => {
    const filters = people.find('Filters');
    expect(filters).toHaveLength(1);
    expect(filters.find('CheckBox')).toHaveLength(filters.props().filters.options.length);
  });

  it('renders people from various regions', () => {
    //render 1 person since state given has one person
    const person = people.find('Person');
    expect(person).toHaveLength(1);
    expect(person.find('.name').text()).toEqual('me');
  });

  it('state changes', () => {
    const setState = jest.fn();
    const useStateSpy = jest.spyOn(React, 'useState');
    useStateSpy.mockImplementation(init => [init, setState]);
    const useEffect = jest.spyOn(React, 'useEffect');
    useEffect.mockImplementationOnce(f => f());
    people
      .find('FilterSelect span.checkbox')
      .at(2)
      .simulate('click');
    // console.log(people.debug());
    expect(setState).toHaveBeenCalledWith('all');
  });
});
