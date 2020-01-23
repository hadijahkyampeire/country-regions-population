import React from 'react';
import enzyme from 'enzyme';

import { RegionWidget } from '../region';
import { people } from 'fixtures/data';

describe('Region widget', () => {
  const widget = props => enzyme.mount(<RegionWidget {...props} />);
  const fetchPeople = jest.fn();
  const region = widget({ people, fetchPeople });
  it('Renders properly', () => {
    expect(region.find('Person')).toHaveLength(10);
  });

  it('renders a person with correct properties', () => {
    const firstPerson = region.find('Person').at(0);
    const name = firstPerson.find('.name');
    const age = firstPerson.find('.age');
    const district = firstPerson.find('.district');
    expect(name.text()).toEqual('Safina Kyamsimire');
    expect(age.text()).toEqual('28 years old');
    expect(district.text()).toEqual('Rukungiri');
  });
});
