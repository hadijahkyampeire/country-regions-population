import React from 'react';
import { connect } from 'react-redux';

import { Regions } from './region';
import { Filters } from './filters';
import { mapDispatchToProps } from './region';
import { toQueryString, fromQueryString } from 'utils';
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
const People = ({ fetchPeople, history, location }) => {
  const [region, setRegion] = React.useState('all');

  const updateFilter = value => {
    const stateToURL = toQueryString({ region: value });
    if (value !== 'all') {
      history.push(`${location.pathname + '?' + stateToURL}`);
    } else history.push(`${location.pathname}`)
    setRegion(value);
    fetchPeople(value === 'all' ? undefined : value);
  };

  // componentDidMount
  React.useEffect(() => {
    const queryToString = fromQueryString(location.search.replace(/^[?#]*/g, '')).region;   
    updateFilter(queryToString || region);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="people">
      <div className="header">
        <h4>
          See all people from various regions, you can filter by region to reduce the view results
        </h4>
      </div>
      <div className="regions-container">
        <Filters
          filters={RegionFilters}
          selected={region}
          updateFilter={update => updateFilter(update)}
        />
        <Regions region={region === 'all' ? undefined : region} />
      </div>
    </section>
  );
};

const connectedPeople = connect(null, mapDispatchToProps)(People);
export { connectedPeople as People };
