import React from 'react';

import { CheckBox } from 'components/forms';

const RegionFilters = {
  label: 'Filter By Region',
  options: [
    { value: 'all', label: 'All' },
    { value: 'western', label: 'Western' },
    { value: 'eastern', label: 'Eastern' },
    { value: 'central', label: 'Central' },
    { value: 'northern', label: 'Northern' },
    { value: 'southern', label: 'Southern' }
  ]
};

class Filters extends React.Component {
  render() {
    return (
      <section className="region-filters">
        <h4>{RegionFilters.label}</h4>
        {RegionFilters.options.map(({ value, label }, i) => (
          <CheckBox label={label} />
        ))}
      </section>
    );
  }
}

export { Filters };
