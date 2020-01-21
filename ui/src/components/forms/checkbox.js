import React from 'react';

import './checkbox.scss';

export const CheckBox = ({ label = '', isChecked = false, toggleCheckboxChange = () => {} }) => {
  return (
    <div className="checkbox">
      <label>
        <input type="checkbox" value={label} checked={isChecked} onChange={toggleCheckboxChange} />
        {label}
      </label>
    </div>
  );
};
