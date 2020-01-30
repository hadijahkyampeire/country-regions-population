import React from 'react';
// import classnames from 'classnames';

import './checkbox.scss';

const CheckBox = ({ checked, onChange, ...props }) => {
  return (
  <span {...props} className={`checkbox ${checked ? 'checked': null}`} onClick={() => onChange(!checked)} />
)};

CheckBox.defaultProps = {
  checked: false,
  onChange: () => {}
};

export { CheckBox };
