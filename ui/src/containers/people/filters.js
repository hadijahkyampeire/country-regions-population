import React from 'react';
// import classnames from 'classnames';

import { CheckBox } from 'components/forms';
import { includes } from 'lodash';

import './__styles__/filters.scss';

const FilterSelect = ({ label, options, selected, onChange }) => {
  return (
    <div className="region-filter">
      <h4>{label}</h4>
      {options.map(({ value, label }, i) => {
        return (
          <div className="option" key={i}>
            <CheckBox
              key={i}
              checked={selected === value || includes(selected, value)}
              onChange={() => onChange(value)}
            />
            <label className={value} htmlFor={value}>
              {label}
            </label>
          </div>
        );
      })}
    </div>
  );
};
class Filters extends React.Component {
  render() {
    const { filters, selected, updateFilter } = this.props;
    return (
      <section className="region-filters">
        <FilterSelect
          label={filters.label}
          options={filters.options}
          selected={selected}
          onChange={value => updateFilter(value)}
        />
      </section>
    );
  }
}

export { Filters };
