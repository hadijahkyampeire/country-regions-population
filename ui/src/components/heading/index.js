import React from 'react';
import './index.scss';

export const Heading = ({ title }) => {
  return (
    <div className="heading">
      <h3>{title}</h3>
      <div className="horizontal-divider" />
    </div>
  );
};
