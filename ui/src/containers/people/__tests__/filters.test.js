import React from 'react';
import enzyme from 'enzyme';

import { Filters } from '../filters';

describe('Filters', () => {
  const wrapper = props => enzyme.mount(<Filters {...props} />);

  const filters = {
    label: 'abc',
    options: [
      { value: 'all', label: 'All' },
      { value: 'some', label: 'Some' }
    ]
  };

  const selected = 'all';
  const updateFilter = jest.fn();
  const filterSelect = wrapper({ filters, selected, updateFilter });
  it('Renders filters working properly', () => {
    expect(filterSelect.find('FilterSelect')).toHaveLength(1);
    expect(filterSelect.find('.option')).toHaveLength(2);
    const checkBoxLabels = filterSelect.find('.option label').map(l => l.text());
    expect(checkBoxLabels).toEqual(['All', 'Some']);
    const checkedStatus = filterSelect.find('.option CheckBox').map(c => c.prop('checked'));
    expect(checkedStatus).toEqual([true, false]);
  });

  it('Handles onChange when a checkbox is clicked', () => {
    const checkbox = filterSelect.find('span.checkbox').at(1);
    checkbox.simulate('click');
    expect(updateFilter).toBeCalled();
  });
});
