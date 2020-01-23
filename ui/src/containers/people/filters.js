import React from 'react';

import { CheckBox } from 'components/forms';

class Filters extends React.Component {
  render() {
    const { filters } = this.props;
    return (
      <section className="region-filters">
        <h4>{filters.label}</h4>
        {filters.options.map(({ value, label }, i) => (
          <CheckBox label={label} key={i}/>
        ))}
      </section>
    );
  }
}

export { Filters };
