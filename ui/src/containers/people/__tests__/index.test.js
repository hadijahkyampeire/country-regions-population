import React from 'react';
import enzyme from 'enzyme';
import { Provider } from 'react-redux';

import { People } from '../index';
import { makeStore, alwaysSuccess } from 'utils/tests';

describe('People container', () => {
  const state = {
    people: { people: [{ id: 1, name: 'me' }], pending: false, error: 'something wrong' }
  };
  const http = {
    get: alwaysSuccess()
  };
  const store = makeStore({ http }, state);
  const container = props =>
    enzyme.mount(
      <Provider store={store}>
        <People {...props} />
      </Provider>
    );
  const people = container();
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
});
