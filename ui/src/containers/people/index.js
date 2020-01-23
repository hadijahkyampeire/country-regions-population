import React from 'react';

import { Regions } from './region';
import { Filters } from './filters';
import './__styles__/index.scss';

export * from './region';

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
class People extends React.Component {
  render() {
    return (
      <section className="people">
        <div className="header">
          <h4>
            See all people from various regions, you can filter by region to reduce the view results
          </h4>
        </div>
        <div className="regions-container">
          <Filters filters={RegionFilters}/>
          <Regions />
        </div>
      </section>
    );
  }
}
export { People };
