import React from 'react';
import { NavLink } from 'react-router-dom';

import './__styles__/navbar.scss';
import { SearchContainer } from 'containers/search';

const NavBar = () => {
  return (
    <div className="pp-nav">
      <section className="left-section">
        <NavLink to="/" activeClassName="chosen">Home</NavLink>
      </section>
      <section className="left-section">
        <SearchContainer />
      </section>
      <section className="right-section">
        <NavLink to="/people" activeClassName="chosen">People</NavLink>
        <NavLink to="/district" activeClassName="chosen">Districts</NavLink>
      </section>
    </div>
  );
};


export { NavBar };
